import { apiSlice } from "../../app/api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: ({ postID, userID }) => {
        return {
          url: `/posts/${postID}?userId=${userID}`,
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError;
          },
        };
      },
      providesTags: (result, error, arg) => {
        if (result) return [{ type: "Post", id: result._id }];
        else return ["Post"];
      },
    }),
    getMultiplePosts: builder.query({
      query: ({ page, limit, top = false }) => {
        return {
          url: `/posts?top=${top}&page=${page}&limit=${limit}`,
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError;
          },
        };
      },
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
        } else {
          return [{ type: "Post", id: "LIST" }];
        }
      },
    }),
    getPostComments: builder.query({
      query: ({ postId, page, limit }) => {
        return {
          url: `/posts/${postId}/comments/?page=${page}&limit=${limit}`,
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError;
          },
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.comments?.length) {
          return [
            { type: "Comment", id: "LIST" },
            ...result.comments.map(({ _id }) => ({ type: "Comment", id: _id })),
          ];
        } else {
          return [{ type: "Comment", id: "LIST" }];
        }
      },
    }),
    addNewPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...postData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg._id }],
    }),
    updatePost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "PATCH",
        body: {
          ...postData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg._id }],
    }),
    updatePostLike: builder.mutation({
      query: ({ postID, userID, increment }) => ({
        url: `/posts/${postID}/like`,
        method: "PATCH",
        body: {
          userID,
          increment,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg._id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: "/posts",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg._id }],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetMultiplePostsQuery,
  useGetPostCommentsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useUpdatePostLikeMutation,
  useDeletePostMutation,
} = postsApiSlice;

//The below is probably unneccessary for a single user.

//Will return single user query results
// export const selectMultiplePostsResult =
//   postsApiSlice.endpoints.getMultiplePosts.select();

// //Creates a memoized selector for all users
// const selectMultiplePostData = createSelector(
//   selectMultiplePostsResult,
//   (userResult) => userResult.data
// );

// //Allow to get specific data from the memoized selector
// export const {
//   selectAll: selectMultiplePosts,
//   selectById: selectPostById,
//   selectIds: selectPostIds,
// } = postsAdapter.getSelectors(
//   (state) => selectMultiplePostData(state) ?? initialState
// );
