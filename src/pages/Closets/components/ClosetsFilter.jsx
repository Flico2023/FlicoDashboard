import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ClosetsFilter({ updateFilter, filter }) {

  const {
    data: airports,
    isLoading: airportsIsLoading,
    error: airportsError,
  } = useQuery(["airports"], async () => {
    const response = await axios.get("http://localhost:5059/api/airport");

    return response.data.data;
  });

  return (
    <Paper sx={{ p: 4 }}>
      <FormControl fullWidth error={!!airportsError}>
        <InputLabel id="airport">Airport</InputLabel>
        <Select
          labelId="airport"
          label="airport"
          disabled={airportsIsLoading || airportsError}
          value={filter}
          onChange={(e) => updateFilter(e.target.value)}
        >
          <MenuItem value="">Select an airport</MenuItem>
          {airports?.map((airport) => (
            <MenuItem key={airport.airportID} value={airport.airportID}>
              {airport.airportName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{airportsError&&"Airports can not fetched"}</FormHelperText>
      </FormControl>
    </Paper>
  );
}
