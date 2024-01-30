import { Paper, Box, TextField, Stack, Button, Alert } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function WarehouseForm() {
  const queryClient = useQueryClient();
  const params = useParams();

  const {
    data: warehouse,
    isLoading: formDataIsLoading,
    error: getError,//BURDA NE YAPICAM BİLMİYORUM
  } = useQuery({
    queryKey: ["warehouse", params.id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5059/api/warehouse/${params.id}`
      );
      return response.data.data;
    },
    enabled: !!params.id,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      warehouseName: "",
      city: "",
    },
  });

  useEffect(() => {
    if (warehouse) {
      setValue("warehouseName", warehouse.warehouseName);
      setValue("city", warehouse.city);
    }
  }, [warehouse]);

  const {
    mutate: submitWarehouse,
    isLoading,
    error: submitError,
  } = useMutation({
    mutationFn: async ({ body }) => {
      const parameter = params.id ? params.id : "";
      const method = params.id ? "PUT" : "POST";
      const response = await axios({
        url: `http://localhost:5059/api/warehouse/${parameter}`,
        method,
        data: body,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("warehouse created successfully");
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      if (!params.id) {
        reset();
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  const onSubmitHandler = (data) => {
    const body = { ...data };

    submitWarehouse({ body });
  };

  return (
    <Paper sx={{ p: 3, mt: 3, width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={2}>
          <TextField
            error={!!errors.warehouseName}
            fullWidth
            id="warehouse-name"
            label="Warehouse Name"
            defaultValue=""
            helperText={errors.warehouseName?.message}
            {...register("warehouseName", {
              required: "warehouse name is required",
              validate: {
                empty: (value) =>
                  value.trim() !== "" || "warehouse name is required",
              },
            })}
            InputLabelProps={{ shrink: params.id ? true : undefined }}
          />

          <TextField
            error={!!errors.city}
            fullWidth
            id="city"
            label="City"
            defaultValue=""
            helperText={errors.city?.message}
            {...register("city", {
              validate: {
                empty: (value) => value.trim() !== "" || "City is required",
              },
            })}
            InputLabelProps={params.id ? { shrink: true } : null}
          />

          {submitError && (
            // FIXME: submitError?.response?.data?.message
            <Alert severity="error">{submitError?.response?.data?.message}</Alert>
          )}

          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
