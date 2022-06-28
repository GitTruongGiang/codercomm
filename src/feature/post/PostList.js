import { LoadingButton } from "@mui/lab";
import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { getPost } from "./PostSlice";
import PutForm from "./PutForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [post, setPost] = useState({});

  const userID = userId._id;

  const { currentPagePosts, postsById, totalPosts, isloading } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const data = { userID, page };
    dispatch(getPost(data));
  }, [userID, page, dispatch]);

  const posts = currentPagePosts.map((postId) => postsById[postId]);

  const handleClose = () => setOpen(false);

  console.log(post);

  return (
    <>
      {posts.map((p) => (
        <PostCard
          key={p._id}
          post={p}
          setOpen={setOpen}
          setId={setId}
          setPost={setPost}
        />
      ))}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isloading}
            onClick={() => setPage((page) => page + 1)}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography>End</Typography>
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PutForm postId={id} setOpen={setOpen} post={post} />
        </Box>
      </Modal>
    </>
  );
}

export default PostList;
