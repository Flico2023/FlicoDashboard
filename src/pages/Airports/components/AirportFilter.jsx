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

export default function AirportFilter() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      country: "",
      city: "",
    },
  });

  const {
    data: countries,
    isLoading: countryIsLoading,
    error: countryError,
  } = useQuery(["airports"], async () => {
    const response = await axios.get("http://localhost:3000/countries");

    return response.data;
  });
  
  const {updateFilter} = useAirportFilter();

  const country = watch("country");

  const {
    data: cities,
    isLoading: cityIsLoading,
    error: cityError,
  } = useQuery(
    ["airports", country],
    async () => {
      const response = await axios.get(
        `http://localhost:3000/countries/${country}`
      );

      return response.data.cities;
    },
    {
      enabled: !!country, // Ülke seçilmeden isteği engelle
    }
  );

  const onSubmitHandler = (data) => {
    updateFilter(data);
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2}>
          <Grid item lg={12} sx={{ display: { xs: "none" } }}>
            <Typography variant="h6">Filters</Typography>
          </Grid>

          <Grid item xs={5} lg={12}>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              //rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.country || !!countryError}>
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
                    {errors.country?.message }
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={5} lg={12}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.city || !!cityError}>
                  <InputLabel id="city">City</InputLabel>
                  <Select
                    labelId="city"
                    label="City"
                    {...field}
                    disabled={cityIsLoading }
                  >
                    <MenuItem value="">Select a city</MenuItem>
                    {cities?.map((city, i) => (
                      <MenuItem key={i} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.city?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={2} lg={12}>
            {/* FIX: bu iyi yazılmı bi kod değilButo boyutunu ilerde ayarlamamız gerekebilir */}
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
      <DevTool control={control}></DevTool>
    </Paper>
  );
}
