import { LoadingButton } from "@mui/lab";
import {
  alpha,
  Avatar,
  Card,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FormTextField, FUploadImage } from "../../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { fDate } from "../../utills/formatTime";
import { putPost } from "./PostSlice";

const PutStyle = styled("div")(({ theme }) => ({
  width: "500px",
  margin: "0 auto",
  marginTop: "30px",
}));

const yupSchema = yup.object().shape({
  content: yup.string().required("Content is required"),
});

function PutForm({ postId, post, setOpen }) {
  const { user } = useAuth();
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
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      let { content, image } = data;
      image = image ? image : post.image;
      dispatch(putPost({ postId, content, image, userID: user._id }));
      setOpen(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

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
    <PutStyle>
      <Card sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: 600, textAlign: "center" }} variant="h5">
          Edit Post
        </Typography>
        <Divider sx={{ mt: 1, mb: 3 }} />
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar src={user.avatarUrl} alt={user.name} sx={{ mr: 1 }} />
          <Box>
            <Typography variant="body1" color="text.primary">
              {user.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "primary.main", display: "block" }}
            >
              {fDate(user.createdAt)}
            </Typography>
          </Box>
        </Box>
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
            <Box sx={{}}>
              <LoadingButton
                variant="contained"
                type="submit"
                size="small"
                fullWidth
                loading={isSubmitting || isloading}
              >
                SAVE
              </LoadingButton>
            </Box>
          </Stack>
        </FormProvider>
      </Card>
    </PutStyle>
  );
}

export default PutForm;
