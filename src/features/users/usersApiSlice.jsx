import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
      //May be unnecessary. Backend should send a non-200 status, but will also send isError
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //Map over data and provide the id property that createEntity adapter will look for
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        //If no issues and get ids, make a tag for each user as well as the entire list
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...userData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg._id }],
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...userData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg._id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg._id }],
    }),
    getUserPosts: builder.query({
      query: ({ userId, page, limit }) =>
        `/users/${userId}/posts/?page=${page}&limit=${limit}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: (result, error, arg) => {
        if (result?.posts?.length) {
          return [
            { type: "Post", id: "LIST" },
            ...result.posts.map(({ _id }) => ({ type: "Post", id: _id })),
          ];
        } else [{ type: "Post", id: "LIST" }];
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetUserPostsQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

//The below is probably unneccessary for a single user.

//Will return single user query results
export const selectAllUsersResult =
  usersApiSlice.endpoints.getAllUsers.select();

//Creates a memoized selector for all users
const selectAllUserData = createSelector(
  selectAllUsersResult,
  (userResult) => userResult.data
);

//Allow to get specific data from the memoized selector
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state) => selectAllUserData(state) ?? initialState
);
