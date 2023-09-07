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
import { center } from "../../../utils/muiStyles";


//FIXME: BACKENDTEN GELEN CEVAPLARA GÖRE REACT QUERY KISMINI DÜZENLE

export default function StuffFilter() {
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    airport: "",
    //adress:"", gerek yok gibi adresi vererek aramak çok saçma
    email: "",
    phone: "",
    companyName: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(filters);
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
    <form onSubmit={onSubmitHandler}>
      <Grid container spacing={2}>
        <Grid item lg={12} sx={{ display: { xs: "none" } }}>
          <Typography variant="h6">Filters</Typography>
        </Grid>

        <Grid item xs={6} lg={12}>
            <FormControl fullWidth>
                <InputLabel id="country">Country</InputLabel>
                <Select
                    labelId="country"
                    label="Country"
                    name="country"
                    value={filters.country}
                    onChange={onChangeHandler}
                >
                    <MenuItem value="">Select a country</MenuItem>
                    <MenuItem value="Turkey">Turkey</MenuItem>
                    <MenuItem value="Germany">Germany</MenuItem>
                    <MenuItem value="France">France</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6} lg={12}>
            <FormControl fullWidth>
                <InputLabel id="city">City</InputLabel>
                <Select
                    labelId="city"
                    label="City"
                    name="city"
                    value={filters.city}
                    onChange={onChangeHandler}
                >
                    <MenuItem value="">Select a city</MenuItem>
                    <MenuItem value="Istanbul">Istanbul</MenuItem>
                    <MenuItem value="Berlin">Berlin</MenuItem>
                    <MenuItem value="Paris">Paris</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6} lg={12}>
            <FormControl fullWidth>
                <InputLabel id="airport">Airport</InputLabel>
                <Select
                    labelId="airport"
                    label="Airport"
                    name="airport"
                    value={filters.airport}
                    onChange={onChangeHandler}
                >
                    <MenuItem value="">Select airport</MenuItem>
                    <MenuItem value="Sabiha Gokcen Airport">Sabiha Gokcen Airport</MenuItem>
                    <MenuItem value="Ataturk Airport">Ataturk Airport</MenuItem>
                    <MenuItem value="Tegel Airport">Tegel Airport</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6} lg={12}>
            <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={filters.companyName}
                onChange={onChangeHandler}
            />
        </Grid>
        <Grid item xs={6} lg={12}>
            <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={filters.phone}
                onChange={onChangeHandler}
            />
        </Grid>
        <Grid item xs={6} lg={12}>
            <TextField
                fullWidth
                label="Email"
                name="email"
                value={filters.email}
                onChange={onChangeHandler}
            />
        </Grid>

        <Grid item xs={12} >
            <Box sx={{ height: "55px", ...center, alignItems: "stretch" }}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Seacrh
                </Button>
            </Box>
        </Grid>
        </Grid>
    </form>
    </Paper>
  );
}
