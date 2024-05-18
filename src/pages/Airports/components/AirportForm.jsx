import { Paper, Box, TextField, Stack, Button, Alert } from "@mui/material";
import React, { useEffect } from "react";
import { center } from "../../../utils/muiStyles";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLogin } from "../../../context/LoginContect";


export function AirportForm() {
  const queryClient = useQueryClient();
  const params = useParams();

  const {token} = useLogin();

  const {
    data: airport,
    isLoading: formDataIsLoading,
    error,
  } = useQuery({
    queryKey: ["airport", params.id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5059/api/airport${"/"+params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    },
    enabled: !!params.id,
  });

  useEffect(() => {
    if (airport) {
      setValue("airportName", airport.airportName);
      setValue("city", airport.city);
    }
  }, [airport]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      airportName: "",
      city: "",
    },
  });

  const { mutate: submitAirport, isLoading, error:submitError } = useMutation({
    mutationFn: async ({ body }) => {
      const parameter = params.id ? params.id : "";
      const method = params.id ? "PUT" : "POST";
      const response = await axios({
        url: `http://localhost:5059/api/airport${"/"+parameter}`,
        method,
        data: { ...body },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Airport created successfully");
      queryClient.invalidateQueries({ queryKey: ["airports"] });
      if (!params.id) {
        reset();
      }
    },
    onError: (error) => {
      console.log(error);

    },
  });

  const onSubmitHandler = (data) => {
    const body = { ...data };

    submitAirport({ body });
  };

  return (
    <Box sx={{ p: 3, mt: 3, width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={2}>
          <TextField
            error={!!errors.airportName}
            fullWidth
            id="airport-name"
            label="Airport Name"
            defaultValue=""
            helperText={errors.airportName?.message}
            {...register("airportName", {
              required: "Airport name is required",
              validate: {
                empty: (value) =>
                  value.trim() !== "" || "Airport name is required",
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
            InputLabelProps={{ shrink: params.id ? true : undefined }}
          />
          {/** DAHA SONRA DOLAP SAYISI DEĞİŞİNCE ARKA TARAFTA SADECE BOŞ OLAN DOLAPLAR FİLAN DEĞİŞMESİ LAZIM
           * AKTİFDOLAP SAYISI DA GÖSTERİLEBİLİR İELRİDE. BACKENDLE Bİ KONUŞMAK LAZIM
           */}
           {submitError && <Alert severity="error">{submitError.response.data.message}</Alert>}

          <Button
            sx={{ p: 1,width:"75px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </Box>
  );
}
