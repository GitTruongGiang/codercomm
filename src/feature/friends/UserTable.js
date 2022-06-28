import {
  Avatar,
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link as routerLink } from "react-router-dom";
import React from "react";
import useAuth from "../../hooks/useAuth";
import FriendStatus from "./FriendStatus";
import ActionButton from "./ActionButton";

function UserTable({ users }) {
  const { user } = useAuth();
  const currentId = user._id;

  const getStatusUsers = (targetUsers) => {
    const props = {
      targetId: targetUsers._id,
      currentId: currentId,
      friendship: targetUsers.friendship,
    };
    return {
      status: <FriendStatus {...props} />,
      action: <ActionButton {...props} />,
    };
  };
  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                Name
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Email
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Job Title
              </TableCell>
              <TableCell
                sx={{ display: { xs: "none", sm: "table-cell" }, width: "20%" }}
              >
                Status
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const { status, action } = getStatusUsers(user);
              return (
                <TableRow key={user._id}>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      src={user?.avatarUrl}
                      alt={user?.name}
                      sx={{ mr: 2 }}
                    />
                    <Link
                      component={routerLink}
                      to={`/user/${user._id}`}
                      sx={{ fontWeight: 600 }}
                      variant="subtitle2"
                    >
                      {user?.name}
                    </Link>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user?.email}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user?.jobTitle}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {status}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {action}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserTable;
