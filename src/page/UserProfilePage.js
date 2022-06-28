import { Card } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components.js/LoadingScreen";
import Profile from "../feature/user/Profile";
import ProfileCover from "../feature/user/ProfileCover";
import { getUser } from "../feature/user/userSlice";

function UserProfilePage() {
  const params = useParams();
  const userId = params.userId;
  console.log(params);

  const { isloading, selectUser } = useSelector(
    (state) => state.user,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <Container>
      {isloading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card sx={{ height: 280, mb: 3, position: "relative" }}>
            {selectUser && <ProfileCover profile={selectUser} />}
          </Card>
          {selectUser && <Profile profile={selectUser} />}
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;
