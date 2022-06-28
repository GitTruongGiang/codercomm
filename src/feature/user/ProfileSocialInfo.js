import { Card, Link, Stack, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";
import { Link as routerLink } from "react-router-dom";

function ProfileSocialInfo({ profile }) {
  const { linkedinLink, twitterLink, facebookLink, instagramLink } = profile;
  return (
    <Card sx={{ p: 3 }}>
      <Stack sx={{ p: 1 }}>
        <Typography variant="h6">Social</Typography>
        <Stack sx={{ mt: 3 }}>
          <Stack direction="row" sx={{ mb: 2 }}>
            <LinkedInIcon sx={{ mr: 1, color: "secondary.dark" }} />
            <Link component={routerLink} to={linkedinLink} color="text.primary">
              {linkedinLink.length > 35
                ? `${linkedinLink.slice(0, 30)}...`
                : linkedinLink}
            </Link>
          </Stack>
          <Stack direction="row" sx={{ mb: 2 }}>
            <TwitterIcon sx={{ mr: 1, color: "secondary.main" }} />
            <Link component={routerLink} to={twitterLink} color="text.primary">
              {twitterLink.length > 35
                ? `${twitterLink.slice(0, 35)}...`
                : twitterLink}
            </Link>
          </Stack>
          <Stack direction="row" sx={{ mb: 2 }}>
            <FacebookIcon sx={{ mr: 1, color: "secondary.main" }} />
            <Link component={routerLink} to={facebookLink} color="text.primary">
              {facebookLink.length > 35
                ? `${facebookLink.slice(0, 35)}...`
                : facebookLink}
            </Link>
          </Stack>
          <Stack direction="row" sx={{ mb: 2 }}>
            <InstagramIcon sx={{ mr: 1, color: "red" }} />
            <Link
              component={routerLink}
              to={instagramLink}
              color="text.primary"
            >
              {instagramLink.length > 35
                ? `${instagramLink.slice(0, 35)}...`
                : instagramLink}
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileSocialInfo;
