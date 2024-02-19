import React, { useContext, useState } from "react";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";

import { CartFilterContext } from "../context/CartsFilterContextProvider";

const defaultFilters = {
userId:"",
productId:""
    };

function ContactMessageFilter() {
  const { updateFilters, updatePageConfig, queryString } = useContext(
    CartFilterContext
  );
  const [filters, setFilters] = useState(defaultFilters);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filters);
    updateFilters(filters);
    updatePageConfig({ pageIndex: 1, pageSize: 10 });
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
    updatePageConfig({ pageIndex: 1, pageSize: 10 });
  };

  return (
    <Paper sx={{ p: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name="userId"
              label="User Id"
              variant="outlined"
              fullWidth
              value={filters.userId}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="productId"
              label="Product Id"
              variant="outlined"
              fullWidth
              value={filters.productId}
              onChange={handleInputChange}
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

export default ContactMessageFilter;
