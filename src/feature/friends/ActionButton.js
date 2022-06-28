import { Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  acceptFriends,
  cancelRequest,
  declinedFriends,
  sendfriends,
  removeFriends,
} from "./FriendSlice";

function ActionButton({ currentId, targetId, friendship, sx }) {
  const dispatch = useDispatch();
  if (currentId === targetId) return null;

  const btnSendRequest = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() => dispatch(sendfriends({ targetId }))}
    >
      Send Request
    </Button>
  );
  if (!friendship) return btnSendRequest;

  const btnCancelRequest = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      color="error"
      onClick={() => dispatch(cancelRequest({ targetId }))}
    >
      Cancel Request
    </Button>
  );

  const btnGroupReact = (
    <Stack spacing={0.5} direction="row">
      <Button
        sx={{ fontSize: "0.6rem", ...sx }}
        size="small"
        variant="contained"
        onClick={() => dispatch(acceptFriends({ targetId }))}
      >
        Accept
      </Button>
      <Button
        sx={{ fontSize: "0.6rem", ...sx }}
        size="small"
        variant="outlined"
        color="error"
        onClick={() => dispatch(declinedFriends({ targetId }))}
      >
        Decline
      </Button>
    </Stack>
  );

  const unFriends = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      color="error"
      onClick={() => dispatch(removeFriends({ targetId }))}
    >
      unFriend
    </Button>
  );

  const Resend = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() => dispatch(sendfriends({ targetId }))}
    >
      {friendship.from === currentId ? "Resend" : "Send"} Request
    </Button>
  );

  if (friendship.status === "pending") {
    const { from, to } = friendship;
    if (currentId === from && targetId === to) {
      return btnCancelRequest;
    } else if (targetId === from && currentId === to) {
      return btnGroupReact;
    }
  }

  if (friendship.status === "accepted") {
    return unFriends;
  }

  if (friendship.status === "declined") {
    return Resend;
  }
}

export default ActionButton;
