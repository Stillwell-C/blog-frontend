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
  }),
});

export const { useGetUserQuery, useGetAllUsersQuery } = usersApiSlice;

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
