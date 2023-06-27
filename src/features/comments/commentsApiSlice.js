import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const commentsAdapter = createEntityAdapter({});

const initialState = commentsAdapter.getInitialState();

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComment: builder.query({
      query: (commentId) => `/comments/${commentId}`,
      providesTags: (result, error, arg) => {
        //Not sure if this is preferable to just returning "Comment"
        if (result) return [{ type: "Comment", id: result._id }];
        else return ["Comment"];
      },
    }),
    getComments: builder.query({
      query: "/comments",
      providesTags: (result, error, arg) => {
        if (result?.comments?.length) {
          return [
            { type: "Comment", id: "LIST" },
            ...result.comments.map(({ _id }) => ({ type: "Comment", id: _id })),
          ];
        } else [{ type: "Comment", id: "LIST" }];
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
