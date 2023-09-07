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
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAirportFilter } from "../../../context/AirportFilterContext";

//FIXME: BACKENDTEN GELEN CEVAPLARA GÖRE REACT QUERY KISMINI DÜZENLE

export default function StuffFilter() {
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    airport: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    role: "",
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
                label="Name"
                name="name"
                value={filters.name}
                onChange={onChangeHandler}
            />
        </Grid>
        <Grid item xs={6} lg={12}>
            <TextField
                fullWidth
                label="Surname"
                name="surname"
                value={filters.surname}
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
            <FormControl fullWidth>
                <InputLabel id="role">Role</InputLabel>
                <Select
                    labelId="role"
                    label="Role"
                    name="role"
                    value={filters.role}
                    onChange={onChangeHandler}
                >
                    <MenuItem value="">Select role</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Stuff">Stuff</MenuItem>
                </Select>
            </FormControl>
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

/*
export default function StuffFilter() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      country: "",
      city: "",
      airport: "",
    },
  });

  const {
    data: countries,
    isLoading: countryIsLoading,
    error: countryError,
  } = useQuery(["countries"], async () => {
    
    const response = await axios.get("http://localhost:3000/countries");
    setValue("city", "");
    setValue("airport", "");
    return response.data;
  });

  //const {updateFilter} = useAirportFilter();

  const country = watch("country");
  const city = watch("city");

  const {
    data: cities,
    isLoading: cityIsLoading,
    error: cityError,
  } = useQuery(
    ["fetchCities", country],
    async () => {
      const response = await axios.get(
        `http://localhost:3000/countries/${country}`
      );
      setValue("airport", "");

      return response.data.cities;
    },
    {
      enabled: !!country, // Ülke seçilmeden isteği engelle
    }
  );

  const {
    data: airports,
    isLoading: airportIsLoading,
    error: airportError,
  } = useQuery(
    ["fetchAirports", city],
    async () => {
      const response = await axios.get(
        `http://localhost:3000/airports?city=${city}`
      );

      return response.data.map((airport) => airport.airportName);
    },
    {
      enabled: !!city, // Ülke seçilmeden isteği engelle
    }
  );

  const onSubmitHandler = (data) => {
    console.log(data)
    //updateFilter(data);
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2}>
          <Grid item lg={12} sx={{ display: { xs: "none" } }}>
            <Typography variant="h6">Filters</Typography>
          </Grid>

          <Grid item xs={6} lg={12}>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              //rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.country || !!countryError}
                >
                  <InputLabel id="country">Country</InputLabel>
                  <Select
                    labelId="country"
                    label="Country"
                    {...field}
                    disabled={countryIsLoading}

                    //TODO: AÇILAN DROPDOWNUN UZUNLUĞUNU SABİTLE
                  >
                    <MenuItem value="">Select a country</MenuItem>
                    {countries?.map((country) => (
                      //FIXME: BACKENDTEN GELEN CEVAPLARA GÖRE BURAYI
                      <MenuItem key={country.id} value={country.id}>
                        {country.id}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.country?.message || countryError?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={6} lg={12}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              //rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.city || !!cityError}>
                  <InputLabel id="city">City</InputLabel>
                  <Select
                    labelId="city"
                    label="City"
                    {...field}
                    disabled={cityIsLoading}
                  >
                    <MenuItem value="">Select a city</MenuItem>
                    {cities?.map((city, i) => (
                      <MenuItem key={i} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.city?.message || cityError?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={6} lg={12}>
            <Controller
              name="airport"
              control={control}
              defaultValue=""
              //rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.airport}>
                  <InputLabel id="airport">Airport</InputLabel>
                  <Select
                    labelId="airport"
                    label="Airport"
                    {...field}
                    disabled={airportIsLoading}
                  >
                    <MenuItem value="">Select airport</MenuItem>
                    {airports &&
                      airports?.map((airport, i) => (
                        <MenuItem key={i} value={airport}>
                          {airport}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>
                    {errors.airport?.message || airportError?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={2} lg={12}>
            {/* FIX: bu iyi yazılmı bi kod değilButo boyutunu ilerde ayarlamamız gerekebilir 
            <Box sx={{ height: "66px", ...center, alignItems: "stretch" }}>
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
}*/
