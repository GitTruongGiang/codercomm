import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import postImageUrl from "../post/postImageUrl";

const initialState = {
  isloading: false,
  error: null,
  selectUser: null,
  updateProfile: null,
};

export const getUser = createAsyncThunk("get/user", async (id) => {
  try {
    const response = await apiService.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUserProfile = createAsyncThunk(
  "update/profile",
  async ({
    id,
    name,
    avatarUrl,
    coverUrl,
    aboutMe,
    city,
    country,
    company,
    jobTitle,
    facebookLink,
    instagramLink,
    linkedinLink,
    twitterLink,
  }) => {
    try {
      const data = {
        name,
        coverUrl,
        aboutMe,
        city,
        country,
        company,
        jobTitle,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
      };
      console.log(avatarUrl);
      if (avatarUrl instanceof File) {
        const ImageUrl = await postImageUrl(avatarUrl);
        data.avatarUrl = ImageUrl;
      }
      const response = await apiService.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isloading = false;
        state.selectUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(updateUserProfile.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isloading = false;
        console.log(action.payload);
        state.updateProfile = action.payload;
        toast.success("Update Profile successfully ");
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
