import { LoadingButton } from "@mui/lab";
import { alpha, Card, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FormTextField, FUploadImage } from "../../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "./PostSlice";

const yupSchema = yup.object().shape({
  content: yup.string().required("Content is required"),
});

function PostForm() {
  const { isloading } = useSelector((state) => state.posts);
  const defaultValues = {
    content: "",
    image: "",
  };

  const methods = useForm({ defaultValues, resolver: yupResolver(yupSchema) });
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      dispatch(createPost(data)).then(() => reset());
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(acceptedFiles);
      if (file) {
        setValue(
          "image",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormTextField
            control={control}
            multiline
            name="content"
            label="Share what you are thinking here..."
            rows={4}
            sx={{
              "& fieldset": {
                borderWidth: "1px !important",
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          {/* <FormTextField name="image" label="Image" autoComplete="off" /> */}
          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <LoadingButton
              variant="contained"
              type="submit"
              size="small"
              loading={isSubmitting || isloading}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
