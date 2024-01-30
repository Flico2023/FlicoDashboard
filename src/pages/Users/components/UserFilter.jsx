import React, { useContext, useState } from "react";

import { UserFilterContext } from "../context/UserFilterContext";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";

function UserFilter() {
  const { updateFilters, updatePageConfig, queryString } = useContext(UserFilterContext);
  const [filters, setFilters] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFilters(filters);
    updatePageConfig({pageIndex:1, pageSize:10});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      surname: "",
      phone: "",
      email: "",
    });
    updateFilters({
      name: "",
      surname: "",
      phone: "",
      email: "",
    });
    updatePageConfig({pageIndex:1, pageSize:10});
  }


  return (
    <Paper sx={{p:4}} >
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {" "}
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={filters.name}
            onChange={handleInputChange}
          />{" "}
        </Grid>
        <Grid item xs={12} md={6}>
          {" "}
          <TextField
            name="surname"
            label="Surname"
            variant="outlined"
            fullWidth
            value={filters.surname}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {" "}
          <TextField
            name="phone"
            label="Phone"
            variant="outlined"
            fullWidth
            value={filters.phone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {" "}
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={filters.email}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth >
            Filter
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button type="button" variant="outlined" color="primary" fullWidth 
          onClick={resetFilters
          }
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
</Paper>
  );
}

export default UserFilter;
