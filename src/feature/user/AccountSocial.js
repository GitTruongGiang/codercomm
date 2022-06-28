import { Card, InputAdornment, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import FormTextField from "../../form/FormTextField";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "./userSlice";
import { FormProvider } from "../../form";

function AccountSocial() {
  const { user } = useAuth();
  const { isloading } = useSelector((state) => state.user);

  const defaultValues = {
    facebookLink: user?.facebookLink || "",
    instagramLink: user?.instagramLink || "",
    linkedinLink: user?.linkedinLink || "",
    twitterLink: user?.twitterLink || "",
  };

  const methods = useForm({ defaultValues });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(updateUserProfile({ id: user._id, ...data }));
  };

  const SOCIAL_LINKS = [
    { value: "facebookLink", icon: <FacebookIcon /> },
    { value: "instagramLink", icon: <InstagramIcon /> },
    { value: "linkedinLink", icon: <LinkedInIcon /> },
    { value: "twitterLink", icon: <TwitterIcon /> },
  ];

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <FormTextField
              control={control}
              name={link.value}
              autoComplete="off"
              key={link.value}
              label=""
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                ),
              }}
            />
          ))}

          <LoadingButton
            variant="contained"
            type="submit"
            loading={isSubmitting || isloading}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default AccountSocial;
