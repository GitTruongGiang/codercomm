import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch } from "react-redux";
import { reactionPost } from "./PostSlice";

function PostReaction({ post }) {
  const dispatch = useDispatch();
  function handleClick(emoji) {
    dispatch(reactionPost({ targetId: post._id, emoji }));
  }
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpIcon sx={{ fontSize: 20, color: "primary.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {post?.reactions?.like}
      </Typography>
      <IconButton onClick={() => handleClick("dislike")}>
        <ThumbDownIcon sx={{ fontSize: 20, color: "error.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {post?.reactions?.dislike}
      </Typography>
    </Stack>
  );
}

export default PostReaction;
