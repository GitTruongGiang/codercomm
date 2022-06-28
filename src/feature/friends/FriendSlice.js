import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isloading: false,
  error: null,
  usersById: {},
  currentPageUsers: [],
};

export const getUsers = createAsyncThunk(
  "get/users",
  async ({ filterName, page = 1, limit }) => {
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/users", { params });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendfriends = createAsyncThunk(
  "post/friends",
  async ({ targetId }) => {
    try {
      const response = await apiService.post(`/friends/requests`, {
        to: targetId,
      });
      return { ...response.data, targetId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const cancelRequest = createAsyncThunk(
  "cancel/friends",
  async ({ targetId }) => {
    try {
      const response = await apiService.delete(`/friends/requests/${targetId}`);
      return { ...response.data, targetId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const acceptFriends = createAsyncThunk(
  "accept/friends",
  async ({ targetId }) => {
    try {
      const response = await apiService.put(`/friends/requests/${targetId}`, {
        status: "accepted",
      });
      return { ...response.data, targetId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const declinedFriends = createAsyncThunk(
  "declined/friends",
  async ({ targetId }) => {
    try {
      const response = await apiService.put(`/friends/requests/${targetId}`, {
        status: "declined",
      });
      return { ...response.data, targetId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeFriends = createAsyncThunk(
  "unfriends/friends",
  async ({ targetId }) => {
    try {
      const response = await apiService.delete(`/friends/${targetId}`);
      return { ...response.data, targetId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFriends = createAsyncThunk(
  "get/friends",
  async ({ filterName, page = 1, limit = 10 }) => {
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/friends", { params });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFriendsRequests = createAsyncThunk(
  "get/friendsRequests",
  async ({ filterName, page = 1, limit = 10 }) => {
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/friends/requests/incoming", {
        params,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFriendsSend = createAsyncThunk(
  "get/friendsSend",
  async ({ filterName, page = 1, limit = 10 }) => {
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/friends/requests/outgoing", {
        params,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const FriendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isloading = false;
        const { count, totalPages, users } = action.payload;
        state.countUsers = count;
        state.totalPageUsers = totalPages;
        users.forEach((user) => {
          state.usersById[user._id] = user;
        });
        state.currentPageUsers = users.map((user) => user._id);
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder
      .addCase(sendfriends.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(sendfriends.fulfilled, (state, action) => {
        state.isloading = false;
        toast.success("submitted successfully");
        const { targetId } = action.payload;
        state.usersById[targetId].friendship = action.payload;
      })
      .addCase(sendfriends.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder
      .addCase(cancelRequest.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.isloading = false;
        toast.success("cancel successfully");
        const { targetId } = action.payload;
        state.usersById[targetId].friendship = null;
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder
      .addCase(acceptFriends.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(acceptFriends.fulfilled, (state, action) => {
        state.isloading = false;
        toast.success("accept successfully");
        const { targetId } = action.payload;
        state.usersById[targetId].friendship = action.payload;
      })
      .addCase(acceptFriends.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(removeFriends.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(removeFriends.fulfilled, (state, action) => {
        state.isloading = false;
        toast.success("unfriend successfully");
        const { targetId } = action.payload;
        state.usersById[targetId].friendship = null;
      })
      .addCase(removeFriends.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder
      .addCase(declinedFriends.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(declinedFriends.fulfilled, (state, action) => {
        state.isloading = false;
        toast.success("declined successfully");
        const { targetId } = action.payload;
        state.usersById[targetId].friendship = action.payload;
      })
      .addCase(declinedFriends.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder
      .addCase(getFriends.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.isloading = false;
        const { count, totalPages, users } = action.payload;
        state.countFriends = count;
        state.totalPages = totalPages;
        users.forEach((user) => {
          state.usersById[user._id] = user;
        });
        state.currentPageUsers = users.map((user) => user._id);
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder
      .addCase(getFriendsRequests.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(getFriendsRequests.fulfilled, (state, action) => {
        state.isloading = false;
        const { count, totalPages, users } = action.payload;
        state.countFriends = count;
        state.totalPages = totalPages;
        users.forEach((user) => {
          state.usersById[user._id] = user;
        });
        state.currentPageUsers = users.map((user) => user._id);
      })
      .addCase(getFriendsRequests.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(getFriendsSend.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(getFriendsSend.fulfilled, (state, action) => {
        state.isloading = false;
        const { count, totalPages, users } = action.payload;
        state.countFriends = count;
        state.totalPages = totalPages;
        users.forEach((user) => {
          state.usersById[user._id] = user;
        });
        state.currentPageUsers = users.map((user) => user._id);
      })
      .addCase(getFriendsSend.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default FriendSlice.reducer;
