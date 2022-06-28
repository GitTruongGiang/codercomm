import {
  Avatar,
  Button,
  Card,
  CardHeader,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as routerLink } from "react-router-dom";
import { fDate } from "../../utills/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { deletePost } from "./PostSlice";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import EditIcon from "@mui/icons-material/Edit";
import ReportIcon from "@mui/icons-material/Report";

function PostCard({ post, setPost, setOpen, setId }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(deletePost({ id, userID: user._id }));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = async (postId, post) => {
    setId(postId);
    setPost(post);
    setOpen(true);
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            component={routerLink}
            to={`/user/${post?.author?._id}`}
            sx={{ fontWeight: 600 }}
            variant="subtitle2"
            color="text.primary"
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ color: "primary.main", display: "block" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <>
            <IconButton
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{ top: "35px", left: "-110px" }}
            >
              <MenuItem onClick={handleClose}>
                <TurnedInIcon sx={{ mr: 1 }} /> Save Post
              </MenuItem>
              <MenuItem onClick={() => handleEdit(post._id, post)}>
                <EditIcon sx={{ mr: 1 }} /> Edit Post
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ReportIcon sx={{ mr: 1 }} /> Report Post
              </MenuItem>
            </Menu>
          </>
        }
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img ": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />

        {user._id === post.author._id && (
          <Button variant="contained" onClick={() => handleDelete(post._id)}>
            Delete
          </Button>
        )}
      </Stack>
    </Card>
  );
}

export default PostCard;
