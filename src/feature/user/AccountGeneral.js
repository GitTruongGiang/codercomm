import { LoadingButton } from "@mui/lab";
import { Card, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FAccountImage, FormProvider, FormTextField } from "../../form";
import useAuth from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "./userSlice";

const updateUserSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
});

function AccountGeneral() {
  const { user } = useAuth();
  console.log(user);
  const { isloading } = useSelector((state) => state.user);
  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    jobTitle: user?.jobTitle || "",
    company: user?.company || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    coverUrl: user?.coverUrl || "",
    aboutMe: user?.aboutMe || "",
    avatarUrl: user?.avatarUrl || "",
  };
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(updateUserSchema),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(updateUserProfile({ id: user._id, ...data }));
    console.log(data);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(acceptedFiles);
      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            <FAccountImage
              name="avatarUrl"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperTexl={<Typography>Allowed </Typography>}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <FormTextField
                name="name"
                label="Name"
                control={control}
                autoComplete="off"
              />
              <FormTextField
                name="email"
                label="Email"
                control={control}
                autoComplete="off"
              />
              <FormTextField
                name="jobTitle"
                label="Job Title"
                autoComplete="off"
                control={control}
              />
              <FormTextField
                name="company"
                label="Company"
                control={control}
                autoComplete="off"
              />
              <FormTextField
                name="phoneNumber"
                label="Phone Number"
                autoComplete="off"
                control={control}
              />
              <FormTextField
                name="address"
                label="Address"
                control={control}
                autoComplete="off"
              />
              <FormTextField
                name="city"
                label="City"
                control={control}
                autoComplete="off"
              />
              <FormTextField
                name="country"
                label="Country"
                control={control}
                autoComplete="off"
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <FormTextField
                name="CoverUrl"
                label="Home Profile Cover Image"
                autoComplete="off"
                control={control}
              />
              <FormTextField
                name="aboutMe"
                label="About Me"
                autoComplete="off"
                multiline
                control={control}
                rows={4}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isloading}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default AccountGeneral;
