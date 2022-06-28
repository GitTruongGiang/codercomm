import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function ProfileCover({ profile }) {
  function handleError(e) {
    const imgindex = Math.floor(Math.random() * 5) + 1;
    e.target.src = `/covers/cover-${imgindex}.jpg`;
    e.target.onError = null;
  }
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            zIndex: 9,
            display: "flex",
            alignItems: "center",
            top: 130,
            left: 25,
          }}
        >
          <Avatar
            src={profile.avatarUrl}
            alt={profile.name}
            sx={{
              width: { xs: 80, md: 128 },
              height: { xs: 80, md: 128 },
              mx: "auto",
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "common.white",
              mr: 3,
            }}
          />
          <Box>
            <Typography variant="h5" color="white">
              {profile.name}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <img
          src={profile.coverUrl}
          alt="profile cover"
          width="100%"
          height="100%"
          onError={handleError}
          style={{ opacity: 0.6, objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
}

export default ProfileCover;
