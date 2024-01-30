import React from "react";
import { stockDetailsDefault } from "../data/stockDetailsDefault";
import { stockDetailsSchema } from "../data/stockDetailsSchema";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  TextField,
  Stack,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  FormHelperText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { productConfig } from "../data/productConfig";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function StockDetailForm() {
  const {
    data: warehouses,
    isLoading: warehouseIsLoading,
    error: warehouseError,
  } = useQuery(["warehouse"], async () => {
    const response = await axios.get(`http://localhost:5059/api/warehouse`);

    return response.data.data;
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: stockDetailsDefault,
    resolver: yupResolver(stockDetailsSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stockDetail", //arrayi burda belirledik
  });

  const appendVariation = () => {
    append({
      size: "",
      variationAmount: "",
      variationActiveAmount: "",
      warehouseID: "",
    });
  };

  const removeVariation = (index) => {
    remove(index);
  };

  console.log(fields);

  const onSubmitHandler = (data) => {
    console.log(data);
  };
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Box sx={{ p: 3, mt: 1, width: "100%" }}>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5" mb={1}>
          Variations
          <IconButton onClick={appendVariation}>
            
            <AddCircleOutlineIcon color="primary" />
          </IconButton>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmitHandler, onError)}>
          <Stack spacing={1}>
            {fields.map((_, index) => {
              return (
                <Grid container key={_.id} fullWidth spacing={1}>
                  <Grid item xs={12} lg={0.5}>
                    <IconButton onClick={() => removeVariation(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={2}>
                    <Controller
                      name={`stockDetail.${index}.size`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.stockDetail?.[index]?.size}
                          size="small"
                        >
                          <InputLabel id={`stockDetail-${index}-size`}>
                            Size
                          </InputLabel>
                          <Select
                            labelId={`stockDetail-${index}-size`}
                            label="Size"
                            {...field}
                            disabled={false}
                            name={`stockDetail.${index}.size`}
                          >
                            <MenuItem value="">Select a size</MenuItem>
                            {productConfig?.sizes.map((size, i) => (
                              <MenuItem key={i} value={size.value}>
                                {size.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {errors.stockDetail?.[index]?.size?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={2}>
                    <TextField
                      error={!!errors.stockDetail?.[index]?.variationAmount}
                      helperText={
                        errors.stockDetail?.[index]?.variationAmount?.message
                      }
                      fullWidth
                      id={`stockDetail-${index}-variationAmount`}
                      label="Amount"
                      defaultValue=""
                      type="number"
                      size="small"
                      {...register(`stockDetail.${index}.variationAmount`, {
                        valueAsNumber: true,
                      })}
                      // InputLabelProps={{shrink: params.id ? true : undefined}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={2}>
                    <TextField
                      error={
                        !!errors.stockDetail?.[index]?.variationActiveAmount
                      }
                      fullWidth
                      type="number"
                      id={`stockDetail-${index}-currentAmount`}
                      label="Current Amount"
                      defaultValue=""
                      helperText={
                        errors.stockDetail?.[index]?.variationActiveAmount
                          ?.message
                      }
                      size="small"
                      name={`stockDetail.${index}.variationActiveAmount`}
                      {...register(
                        `stockDetail.${index}.variationActiveAmount`,
                        {
                          valueAsNumber: true,
                        }
                      )}
                      // InputLabelProps={{shrink: params.id ? true : undefined}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <Controller
                      name={`stockDetail.${index}.warehouseID`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.stockDetail?.[index]?.warehouseID}
                          size="small"
                        >
                          <InputLabel id={`stockDetail-${index}-warehouseID`}>
                            Warehouse
                          </InputLabel>
                          <Select
                            labelId={`stockDetail-${index}-warehouseID`}
                            label="Warehouse"
                            {...field}
                            disabled={false}
                            name={`stockDetail.${index}.warehouseID`}
                          >
                            <MenuItem value="">Select a warehouse</MenuItem>
                            {warehouses?.map((warehouse) => (
                              <MenuItem
                                key={warehouse.warehouseID}
                                value={warehouse.warehouseID}
                              >
                                {warehouse.warehouseName}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {errors.stockDetail?.[index]?.warehouseID?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
              );
            })}
          </Stack>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                sx={{ mt: 4 }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
    </Box>
  );
}
