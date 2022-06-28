import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import postImageUrl from "./postImageUrl";

const initialState = {
  isloading: false,
  error: null,
  postsById: {},
  currentPagePosts: [],
};

export const createPost = createAsyncThunk(
  "user/post",
  async ({ content, image }) => {
    try {
      const ImageUrl = await postImageUrl(image);
      const response = await apiService.post("/posts", {
        content,
        image: ImageUrl,
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "delete/post",
  async ({ id, userID }, { dispatch }) => {
    try {
      const response = await apiService.delete(`/posts/${id}`);
      dispatch(getPost({ userID, page: 1 }));
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPost = createAsyncThunk(
  "user/gets",
  async ({ userID, page, limit = 3 }) => {
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/user/${userID}`, {
        params,
      });
      return { ...response.data, page };
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const reactionPost = createAsyncThunk(
  "reaction/post",
  async ({ targetId, emoji }) => {
    try {
      const response = await apiService.post("/reactions", {
        targetType: "Post",
        targetId,
        emoji,
      });
      return { ...response.data, targetId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const putPost = createAsyncThunk(
  "put/post",
  async ({ postId, content, image, userID }, { dispatch }) => {
    try {
      console.log(postId);
      const ImageUrl = await postImageUrl(image);
      const response = await apiService.put(`/posts/${postId}`, {
        content,
        image: ImageUrl,
      });
      dispatch(getPost({ userID, page: 1 }));
    } catch (error) {
      console.log(error);
    }
  }
);

const postslice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isloading = false;
        const newPost = action.payload;
        if (state.currentPagePosts.length % POST_PER_PAGE === 0) {
          state.currentPagePosts.pop();
        }
        state.postsById[newPost._id] = newPost;
        state.currentPagePosts.unshift(newPost._id);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(deletePost.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isloading = false;
        toast.success("Delete successfully");
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(getPost.pending, (state, aciton) => {
        state.isloading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isloading = false;
        const { count, posts, page } = action.payload;
        if (page === 1) {
          state.postsById = {};
          state.currentPagePosts = [];
        }
        posts.forEach((post) => {
          state.postsById[post._id] = post;
          if (!state.currentPagePosts.includes(post._id)) {
            state.currentPagePosts.push(post._id);
          }
        });
        state.totalPosts = count;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(reactionPost.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(reactionPost.fulfilled, (state, action) => {
        state.isloading = false;
        const { targetId } = action.payload;
        state.postsById[targetId].reactions = action.payload;
      })
      .addCase(reactionPost.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(putPost.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(putPost.fulfilled, (state, action) => {
        state.isloading = false;
        toast.success("Put Successfully");
      })
      .addCase(putPost.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default postslice.reducer;
