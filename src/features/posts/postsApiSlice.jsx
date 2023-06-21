import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const postsAdapter = createEntityAdapter({});

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      //May be unnecessary. Backend should send a non-200 status, but will also send isError
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Post"],
    }),
    getMultiplePosts: builder.query({
      query: ({ page, limit, top = false }) =>
        `/posts?top=${top}&page=${page}&limit=${limit}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //Map over data and provide the id property that createEntity adapter will look for
      //This works, but not sure of its true utility.
      //Will require use of filter or similar and make page more complex
      //   transformResponse: (responseData) => {
      //     let posts = responseData.posts.map((post) => {
      //       post.id = post._id;
      //       return post;
      //     });
      //     if (responseData?.top) {
      //       const topPosts = responseData.top.map((post) => {
      //         post.id = post._id;
      //         post.top = true;
      //         return post;
      //       });
      //       posts = posts.concat(topPosts);
      //     }
      //     return postsAdapter.setAll(initialState, posts);
      //   },
      //Provide tag for each post return as well as entire list
      providesTags: (result, error, arg) => {
        if (result?.top) {
          return [
            { type: "Post", id: "LIST" },
            ...result.posts.map(({ _id }) => ({ type: "Post", id: _id })),
            ...result.top.map(({ _id }) => ({ type: "Post", id: _id })),
          ];
        } else if (result?.posts) {
          return [
            { type: "Post", id: "LIST" },
            ...result.posts.map(({ _id }) => ({ type: "Post", id: _id })),
          ];
        } else [{ type: "Post", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetPostQuery, useGetMultiplePostsQuery } = postsApiSlice;

//The below is probably unneccessary for a single user.

//Will return single user query results
export const selectMultiplePostsResult =
  postsApiSlice.endpoints.getMultiplePosts.select();

//Creates a memoized selector for all users
const selectMultiplePostData = createSelector(
  selectMultiplePostsResult,
  (userResult) => userResult.data
);

//Allow to get specific data from the memoized selector
export const {
  selectAll: selectMultiplePosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state) => selectMultiplePostData(state) ?? initialState
);
