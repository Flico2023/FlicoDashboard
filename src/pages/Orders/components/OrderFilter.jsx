import React, { useContext, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";

import { OrderFilterContext } from "../OrderFilterContext";

const defaultFilters = {
  id: "",
  status: "",
  fullname: "",
  startDate: "",
  endDate: "",
  userID: "",
};

function ProductFilter() {
  const { updateFilters, updatePageConfig, queryString } =
    useContext(OrderFilterContext);
  const [filters, setFilters] = useState(defaultFilters);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filters);

    updateFilters(filters);
    //updatePageConfig({ pageIndex: 1, pageSize: 10 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    updateFilters(defaultFilters);
    //updatePageConfig({ pageIndex: 1, pageSize: 10 });
  };

  return (
    <Paper sx={{ p: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Order ID"
              name="id"
              value={filters.id}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullname"
              value={filters.fullname}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="User ID"
              name="userID"
              value={filters.userID}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid> */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={filters.status}
                onChange={handleInputChange}
                input={<OutlinedInput />}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Progress">Progress</MenuItem>
                <MenuItem value="Closet">Closet</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              value={filters.startDate}
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />          

          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="End Date"
              name="endDate"
              type="date"
              value={filters.endDate}
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>


          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Filter
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              fullWidth
              onClick={resetFilters}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default ProductFilter;
