import { FormHelperText } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import UploadSingleFile from "../components.js/UploadSingleFile";

function FUploadImage({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <UploadSingleFile
            accept="image/*"
            error={checkError}
            file={field.value}
            helperTexl={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    >
      <UploadSingleFile />
    </Controller>
  );
}

export default FUploadImage;
