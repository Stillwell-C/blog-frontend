import { apiSlice } from "../../app/api/apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComment: builder.query({
      query: (commentId) => `/comments/${commentId}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: (result, error, arg) => {
        if (result) return [{ type: "Comment", id: result._id }];
        else return ["Comment"];
      },
    }),
    getComments: builder.query({
      query: ({ page, limit }) => `/comments?page=${page}&limit=${limit}`,
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
    addNewComment: builder.mutation({
      query: (commentData) => ({
        url: "/comments",
        method: "POST",
        body: {
          ...commentData,
        },
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg._id },
      ],
    }),
    updateComment: builder.mutation({
      query: (commentData) => ({
        url: "/comments",
        method: "PATCH",
        body: {
          ...commentData,
        },
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg._id },
      ],
    }),
    deleteComment: builder.mutation({
      query: ({ id }) => ({
        url: "/comments",
        method: "DELETE",
        body: {
          id,
        },
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg._id },
      ],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetCommentsQuery,
  useAddNewCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApiSlice;
