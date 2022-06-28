import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../logo/logo192.png";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ height: 40, width: 40, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );
  if (disabledLink) {
    return <>{logo}</>;
  }
  return <Link to="/">{logo}</Link>;
}

export default Logo;
