import {
  Card,
  Container,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components.js/SearchInput";
import { getUsers } from "./FriendSlice";
import UserTable from "./UserTable";

function AddFriend() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  const { countUsers, usersById, currentPageUsers } = useSelector(
    (state) => state.friends
  );
  const users = currentPageUsers.map((id) => usersById[id]);
  useEffect(() => {
    dispatch(getUsers({ filterName, page: page + 1, limit: rowsPerPage }));
  }, [dispatch, filterName, page, rowsPerPage]);

  function handleFilterName(searchQuery) {
    setFilterName(searchQuery);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add Friends
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleFilterName={handleFilterName} />
            <Typography sx={{ color: "text.secondary", ml: 1 }}>
              {countUsers > 1
                ? `${countUsers} Users found`
                : countUsers === 1
                ? `${countUsers} User found`
                : "No User Found"}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <TablePagination
              component="div"
              count={countUsers ? countUsers : 0}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
          <UserTable users={users} />
        </Stack>
      </Card>
    </Container>
  );
}

export default AddFriend;
