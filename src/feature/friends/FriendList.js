import { Card, Container, Pagination, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components.js/SearchInput";
import FriendsCard from "./FriendsCard";
import { getFriends } from "./FriendSlice";

function FriendList() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);

  const { usersById, currentPageUsers, countFriends, totalPages } = useSelector(
    (state) => state.friends
  );

  const friends = currentPageUsers.map((id) => usersById[id]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends({ filterName, page }));
  }, [dispatch, filterName, page]);

  const handleFilterName = (searchQuery) => {
    setFilterName(searchQuery);
  };

  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends
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
        <FriendsCard friends={friends} />
      </Card>
    </Container>
  );
}

export default FriendList;
