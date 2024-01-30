import {
  Paper,
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
import React, { Fragment, useEffect } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { flexStart } from "../../../utils/muiStyles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { yupResolver } from "@hookform/resolvers/yup";
import { closetDefault } from "../data/closetDefault";
import { closetSchema } from "../data/closetSchema";

export default function ClosetForm() {
  const queryClient = useQueryClient();
  const params = useParams();

  const {
    data: closet,
    isLoading: formDataIsLoading,
    error: closetError,
  } = useQuery({
    queryKey: ["closet", params.id],
    queryFn: async () => {
      const response = await axios.get(
        //!FIXME: burası da değişecek
        `http://localhost:5059/closets/${params.id}`
      );
      return response.data;
    },
    enabled: !!params.id,
  });

  useEffect(() => {
    if (closet) {
        resetToInitialData();
    }
  }, [closet]);

  const { mutate: submitCloset, submitIsLoading } = useMutation({
    mutationFn: async ({ body }) => {
      const parameter = params.id ? params.id : "";
      const method = params.id ? "PUT" : "POST";
      const response = await axios({
        url: `http://localhost:5059/closets/${parameter}`,
        method,
        data: body,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Closet created successfully");
      queryClient.invalidateQueries({ queryKey: ["airports"] });
    },

    onError: (error) => {
      //!Burayı değiştiricez err.resp.data filan olabilir
      console.log(error);
      toast.error(error);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: closetDefault,
    resolver: yupResolver(closetSchema),
  });

  const {
    data: airports,
    isLoading: airportIsLoading,
    error: airportError,
  } = useQuery(["airports"], async () => {
    const response = await axios.get(`http://localhost:5059/airports`);
    return response.data;
  });

  const clearForm = () => {
    reset();
  };

  const resetToInitialData = () => {
    console.log(closet)
    setValue("airportID", closet.airportID);
    setValue("closetNo", closet.closetNo);
    setValue("isEmpty", closet.isEmpty);
    setValue("orderID", closet.orderID);
    setValue("password", closet.password);
  };

  const onReset = () => {
    if (closet) {
      resetToInitialData();
    } else {
      clearForm();
    }
  };

  const onSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ p: 3, mt: 1, width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={2}>
          <Controller
            name="closetNo"
            control={control}
            render={({ field }) => (
              <TextField
                label="Closet No"
                fullWidth
                {...field}
                error={!!errors.closetNo}
                helperText={errors?.closetNo?.message}
              />
            )}
          />

          <Controller
            name="airportID"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={!!errors.airportID}
                helperText={errors.airportID?.message }
              >
                <InputLabel>Airport</InputLabel>
                <Select label="Airport" fullWidth {...field}>
                  <MenuItem value={""}>Select an airport</MenuItem>
                  {airports?.map((airport) => (
                    <MenuItem key={airport.airportID} value={airport.airportID}>
                      {airport.airportName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.airportID?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="orderID"
            control={control}
            render={({ field }) => (
              <TextField
                label="Order Id"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.orderID}
                helperText={errors?.orderID?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <InputLabel>Status</InputLabel>
                <Select label="Status" fullWidth {...field}>
                  <MenuItem value={"empty"}>Empty</MenuItem>
                  <MenuItem value={"in use"}>In Use</MenuItem>
                  <MenuItem value={"waiting"}>Waiting</MenuItem>
                </Select>
                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
            )}
          />

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    //fullWidth
                    type="submit"
                    disabled={submitIsLoading || !!closetError}
                    sx={{width: "50%"}}
                >
                    {submitIsLoading ? "Loading..." : "Submit"}
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    //fullWidth
                    type="button"
                    onClick={onReset}
                    sx={{width: "50%"}}
                >
                    Reset
                </Button>
            </Stack>

        </Stack>
      </form>
      <DevTool control={control} />
    </Box>
  );
}
