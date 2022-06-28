import { alpha, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { fDate } from "../utills/formatTime";

function RejectionsFile({ fileRejections }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fDate(size)}
            </Typography>
            {errors.map((error) => {
              return (
                <Typography key={error.code} variant="caption" component="p">
                  {" "}
                  - {error.message}
                </Typography>
              );
            })}
          </Box>
        );
      })}
    </Paper>
  );
}

export default RejectionsFile;
