import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isloading: false,
  error: null,
  commentsById: {},
  commentsPostId: {},
  commentsTotalPage: {},
  commentsCount: {},
};

export const createComment = createAsyncThunk(
  "create/comment",
  async ({ content, postId }) => {
    try {
      const response = await apiService.post("/comments", { content, postId });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getComment = createAsyncThunk(
  "get/comment",
  async ({ postId, page = 1, limit = 3 }) => {
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/${postId}/comments`, {
        params,
      });
      return { ...response.data, postId, page };
    } catch (error) {
      console.log(error);
    }
  }
);

export const reactionsComments = createAsyncThunk(
  "reactions/comment",
  async ({ targetId, emoji }) => {
    try {
      const response = await apiService.post("/reactions", {
        targetType: "Comment",
        targetId,
        emoji,
      });
      return { ...response.data, targetId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "delete/comment",
  async ({ id, postId }, { dispatch }) => {
    try {
      const response = await apiService.delete(`/comments/${id}`);
      dispatch(getComment({ postId, page: 1 }));
    } catch (error) {
      console.log(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isloading = false;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(getComment.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.isloading = false;
        const { postId, page, comments, count } = action.payload;
        comments.forEach((comment) => {
          state.commentsById[comment._id] = comment;
        });
        state.commentsPostId[postId] = comments
          .map((comment) => comment._id)
          .reverse();
        state.commentsTotalPage[postId] = page;
        state.commentsCount[postId] = count;
      })
      .addCase(getComment.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(reactionsComments.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(reactionsComments.fulfilled, (state, action) => {
        state.isloading = false;
        const { targetId } = action.payload;
        state.commentsById[targetId].reactions = action.payload;
      })
      .addCase(reactionsComments.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(deleteComment.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isloading = false;
        toast.success("Delete successfully");
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;
