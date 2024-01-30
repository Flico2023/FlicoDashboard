import { Paper, Box, TextField, Stack, Button, Alert } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { outsourceDefault } from "../data/outsourceDefault";
import outsourceSchema from "../data/outsourceSchema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function OutsourceeForm() {
  const queryClient = useQueryClient();
  const params = useParams();

  const {
    data: outsource,
    isLoading: formDataIsLoading,
    error: getError, //BURDA NE YAPICAM BİLMİYORUM
  } = useQuery({
    queryKey: ["outsource", params.id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5059/api/outsource/${params.id}`
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
    defaultValues: outsourceDefault,
    resolver: yupResolver(outsourceSchema),
  });

  useEffect(() => {
    if (outsource) {
      setValue("companyName", outsource.companyName);
      setValue("city", outsource.city);
      setValue("email", outsource.email);
      setValue("contactPerson", outsource.contactPerson);
      setValue("phone", outsource.phone);
      setValue("address", outsource.address);
    }
  }, [outsource]);

  const {
    mutate: submitOutsource,
    isLoading,
    error: submitError,
  } = useMutation({
    mutationFn: async ({ body }) => {
      const parameter = params.id ? params.id : "";
      const method = params.id ? "PUT" : "POST";
      const response = await axios({
        url: `http://localhost:5059/api/outsource/${parameter}`,
        method,
        data: body,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Outsource submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["outsources"] });
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

    submitOutsource({ body });
  };

  return (
    <Paper sx={{ p: 3, mt: 3, width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={2}>

            <TextField
                fullWidth
                id="companyName"
                label="Company Name"
                defaultValue=""
                {...register(`companyName`)}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
                InputLabelProps={{ shrink: params.id ? true : undefined }}
            />

            <TextField
                fullWidth
                id="city"
                label="City"
                defaultValue=""
                {...register(`city`)}
                error={!!errors.city}
                helperText={errors.city?.message}
                InputLabelProps={{ shrink: params.id ? true : undefined }}
            />

            <TextField
                fullWidth
                id="email"
                label="Email"
                defaultValue=""
                {...register(`email`)}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputLabelProps={{ shrink: params.id ? true : undefined }}
            />

            <TextField
                fullWidth
                id="contactPerson"
                label="Contact Person"
                defaultValue=""
                {...register(`contactPerson`)}
                error={!!errors.contactPerson}
                helperText={errors.contactPerson?.message}
                InputLabelProps={{ shrink: params.id ? true : undefined }}
            />

            <TextField
                fullWidth
                id="phone"
                label="Phone"
                defaultValue=""
                {...register(`phone`)}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                InputLabelProps={{ shrink: params.id ? true : undefined }}

            />

            <TextField
                fullWidth
                id="address"
                label="Address"
                defaultValue=""
                {...register(`address`)}
                error={!!errors.address}
                helperText={errors.address?.message}    
                InputLabelProps={{ shrink: params.id ? true : undefined }}
            />




          {submitError && (
            // FIXME: submitError?.response?.data?.message
            <Alert severity="error">
              {submitError?.response?.data?.message}
            </Alert>
          )}

          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
