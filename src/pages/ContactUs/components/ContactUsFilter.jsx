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
import { ContactUsFilterContext } from "../context/ContactUsFilterContext";

const defaultFilters = {
    name: "",
    subject: "",
    date: "All",
    email: "",
    status: "All",
    id: "",
    };

function ContactMessageFilter() {
  const { updateFilters, updatePageConfig, queryString } = useContext(
    ContactUsFilterContext
  );
  const [filters, setFilters] = useState(defaultFilters);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filters)
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
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={filters.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="subject"
              label="Subject"
              variant="outlined"
              fullWidth
              value={filters.subject}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="id"
              label="Id"
              variant="outlined"
              fullWidth
              value={filters.id}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={filters.email}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="date"
              label="Date"
              variant="outlined"
              fullWidth
              value={filters.date}
              onChange={handleInputChange}
              select
            >
                <MenuItem value="All">All</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            
            <TextField
              name="status"
              label="Status"
              variant="outlined"
              fullWidth
              value={filters.status}
              onChange={handleInputChange}
              select
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </TextField>
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
