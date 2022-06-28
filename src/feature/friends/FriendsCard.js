import { Avatar, Box, Card, Grid, Link, Typography } from "@mui/material";
import React from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link as routerLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ActionButton from "./ActionButton";

function FriendsCard({ friends }) {
  const { user } = useAuth();
  const currentId = user._id;

  const getActionFriend = (friend) => {
    const props = {
      currentId: currentId,
      targetId: friend._id,
      friendship: friend.friendship,
    };
    return { action: <ActionButton {...props} /> };
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      style={{ marginTop: "20px" }}
    >
      {friends.map((friend) => {
        const { action } = getActionFriend(friend);
        if (currentId === friend._id) {
          return null;
        } else {
          return (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={friend._id}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Card sx={{ p: 2, paddingLeft: "4px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={friend.avatarUrl}
                    alt={friend.name}
                    sx={{ mr: 1 }}
                  />
                  <Box>
                    <Link
                      component={routerLink}
                      to={`/user/${friend._id}`}
                      sx={{ fontSize: "15px" }}
                    >
                      {friend.name}
                    </Link>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HowToRegIcon sx={{ mr: 1 }} />
                      <Typography>
                        {friend.email.length > 12
                          ? `${friend.email.slice(0, 12)}...`
                          : friend.email}
                      </Typography>
                    </Box>
                  </Box>
                  {action}
                </Box>
              </Card>
            </Grid>
          );
        }
      })}
    </Grid>
  );
}

export default FriendsCard;
