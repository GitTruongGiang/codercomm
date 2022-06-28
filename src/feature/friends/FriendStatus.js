import { Chip } from "@mui/material";
import React from "react";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";

function FriendStatus({ currentId, targetId, friendship, sx }) {
  if (currentId === targetId) return null;
  if (!friendship) return null;

  if (friendship.status === "pending") {
    const { from, to } = friendship;
    if (currentId === from && targetId === to) {
      return (
        <Chip
          sx={{ ...sx }}
          label="Request sent"
          icon={<MarkEmailReadIcon />}
          color="warning"
        />
      );
    } else if (targetId === from && currentId === to) {
      return (
        <Chip
          sx={{ ...sx }}
          label="Waiting for repsonse"
          icon={<PauseCircleOutlineIcon />}
          color="warning"
        />
      );
    }
  }

  if (friendship.status === "accepted") {
    return (
      <Chip
        sx={{ ...sx }}
        label="Friend"
        icon={<CheckCircleOutlineIcon />}
        color="success"
      />
    );
  }

  if (friendship.status === "declined") {
    return (
      <Chip
        sx={{ ...sx }}
        label="Declined"
        icon={<BlockIcon />}
        color="error"
      />
    );
  }
}

export default FriendStatus;
