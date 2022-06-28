import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

function ProfileAbout({ profile }) {
  const { city, email, jobTitle } = profile;
  return (
    <Card sx={{ p: 3 }}>
      <Stack sx={{ p: 1 }}>
        <Typography variant="h6">About</Typography>
        <Stack sx={{ mt: 3 }}>
          <Stack direction="row" sx={{ mb: 2 }}>
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography>{city}</Typography>
          </Stack>
          <Stack direction="row" sx={{ mb: 2 }}>
            <MailIcon sx={{ mr: 1 }} />
            <Typography>
              {email.length > 35 ? `${email.slice(0, 35)}...` : email}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ mb: 2 }}>
            <WorkHistoryIcon sx={{ mr: 1 }} />
            <Typography>{jobTitle}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileAbout;
