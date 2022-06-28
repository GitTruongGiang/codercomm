import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { fDate } from "../../utills/formatTime";
import CommentReaction from "./CommentReaction";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment }) {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      dispatch(deleteComment({ id, postId: comment.post }));
    } catch (error) {
      throw error;
    }
  };
  return (
    <Stack spacing={2} direction="row">
      <Avatar src={comment.author?.avatarUrl} alt={comment.author?.name} />
      <Paper sx={{ p: 1.5, bgcolor: "background.neutral", flexGrow: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={{ sm: "center" }}
          sx={{ mb: 0.5 }}
        >
          <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
            {comment.author?.name}
          </Typography>
          <Typography sx={{ color: "text.disabled" }} variant="caption">
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography>{comment.content}</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleDelete(comment._id)}
          >
            delete
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
