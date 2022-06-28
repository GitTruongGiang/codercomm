import { Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components.js/LoadingScreen";
import CommentCard from "./CommentCard";
import { getComment } from "./commentSlice";

function CommentList({ postId }) {
  const {
    commentsById,
    commentsPostId,
    commentsTotalPage,
    commentsCount,
    isloading,
  } = useSelector(
    (state) => ({
      commentsById: state.comment.commentsById,
      commentsPostId: state.comment.commentsPostId[postId],
      commentsTotalPage: state.comment.commentsTotalPage[postId] || 1,
      commentsCount: state.comment.commentsCount[postId],
      isloading: state.comment.isloading,
    }),
    shallowEqual
  );

  const totalPages = Math.ceil(commentsCount / 3);
  const dispatch = useDispatch();
  useEffect(() => {
    if (postId) {
      dispatch(getComment({ postId }));
    }
  }, [dispatch, postId]);

  let renderComment;

  if (commentsPostId) {
    const comments = commentsPostId.map((commentId) => commentsById[commentId]);
    renderComment = (
      <Stack spacing={1}>
        {comments &&
          comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
      </Stack>
    );
  } else if (isloading) {
    renderComment = <LoadingScreen />;
  }

  return (
    <div>
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ color: "text.secondary" }}>
            {commentsCount > 1
              ? `${commentsCount} comments`
              : commentsCount === 1
              ? `${commentsCount} comment`
              : "No comment"}
          </Typography>
          {commentsCount > 3 && (
            <Pagination
              count={totalPages}
              page={commentsTotalPage}
              onChange={(e, page) => dispatch(getComment({ postId, page }))}
            />
          )}
        </Stack>
        {renderComment}
      </Stack>
    </div>
  );
}

export default CommentList;
