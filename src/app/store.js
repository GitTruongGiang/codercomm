import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "../feature/comment/commentSlice";
import FriendSlice from "../feature/friends/FriendSlice";
import PostSlice from "../feature/post/PostSlice";
import userSlice from "../feature/user/userSlice";

const store = configureStore({
  reducer: {
    posts: PostSlice,
    comment: commentSlice,
    friends: FriendSlice,
    user: userSlice,
  },
});

export default store;
