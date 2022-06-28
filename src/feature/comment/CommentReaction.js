import { IconButton, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import React from "react";
import { useDispatch } from "react-redux";
import { reactionsComments } from "./commentSlice";

function CommentReaction({ comment }) {
  const dispatch = useDispatch();
  function handleClick(emoji) {
    dispatch(reactionsComments({ targetId: comment._id, emoji }));
  }
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpIcon sx={{ fontSize: 15, color: "primary.main" }} />
      </IconButton>
      <Typography variant="p" mr={1}>
        {comment?.reactions?.like}
      </Typography>
      <IconButton onClick={() => handleClick("dislike")}>
        <ThumbDownIcon sx={{ fontSize: 15, color: "error.main" }} />
      </IconButton>
      <Typography variant="p" mr={1}>
        {comment?.reactions?.dislike}
      </Typography>
    </Stack>
  );
}

export default CommentReaction;
