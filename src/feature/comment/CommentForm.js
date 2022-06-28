import { LoadingButton } from "@mui/lab";
import { Avatar, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FormTextField } from "../../form";
import useAuth from "../../hooks/useAuth";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { createComment, getComment } from "./commentSlice";

function CommentForm({ postId }) {
  const { user } = useAuth();
  const defaultValues = {
    content: "",
  };

  const methods = useForm({ defaultValues });

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const { content } = data;
      dispatch(createComment({ content, postId })).then(() => reset());
      dispatch(getComment({ postId }));
    } catch (error) {
      setError(error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Avatar src={user.avatarUrl} alt={user.name} />
        <FormTextField
          name="content"
          label="write a comment"
          size="small"
          autoComplete="off"
          control={control}
          sx={{
            "& fieldset": {
              borderRadius: "5px",
            },
          }}
        />
        <LoadingButton type="submit" variant="outlined" loading={isSubmitting}>
          <SendIcon />
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

export default CommentForm;
