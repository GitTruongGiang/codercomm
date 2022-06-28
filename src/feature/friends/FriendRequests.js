import {
  Box,
  Card,
  Container,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components.js/SearchInput";
import FriendsCard from "./FriendsCard";
import { getFriendsRequests } from "./FriendSlice";

function FriendRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);

  const { countFriends, totalPages, usersById, currentPageUsers } = useSelector(
    (state) => state.friends
  );
  const FriendsRequest = currentPageUsers.map((id) => usersById[id]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendsRequests({ filterName, page }));
  }, [dispatch, filterName, page]);

  const handleFilterName = (searchQuery) => {
    setFilterName(searchQuery);
  };
  function handleChange(e, value) {
    setPage(value);
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends Requests
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleFilterName={handleFilterName} />
            <Box flexGrow={1} />
            <Typography>
              {countFriends > 1
                ? `${countFriends} friends found`
                : countFriends === 1
                ? `${countFriends} friend found`
                : " No friend found"}
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
        <FriendsCard friends={FriendsRequest} />
      </Card>
    </Container>
  );
}

export default FriendRequests;
