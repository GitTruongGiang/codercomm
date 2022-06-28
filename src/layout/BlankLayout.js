import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function BlankLayout() {
  return (
    <Stack sx={{ minHeight: "100vh", justifyContent: "center" }}>
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
