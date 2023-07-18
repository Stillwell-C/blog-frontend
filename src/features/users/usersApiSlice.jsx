import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: ({ page, limit }) => ({
        url: `/users?page=${page}&limit=${limit}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
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
      query: ({ id, adminPassword }) => ({
        url: "/users",
        method: "DELETE",
        body: { id, adminPassword },
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
        } else {
          return [{ type: "Post", id: "LIST" }];
        }
      },
    }),
    getUserComments: builder.query({
      query: ({ userId, page, limit }) =>
        `/users/${userId}/comments/?page=${page}&limit=${limit}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
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
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetUserPostsQuery,
  useGetUserCommentsQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
