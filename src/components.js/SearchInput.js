import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";

function SearchInput({ handleFilterName }) {
  const [searchQuery, setSearchQuery] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    handleFilterName(searchQuery);
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <TextField
        value={searchQuery}
        placeholder="Search By Name"
        sx={{ width: 300 }}
        size="small"
        autoComplete="off"
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label="seacrch by name"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;
