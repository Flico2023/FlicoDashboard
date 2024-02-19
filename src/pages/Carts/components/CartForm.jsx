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
import { yupResolver } from "@hookform/resolvers/yup";
import { cartDefault } from "../data/cartDefault";
import { cartSchema } from "../data/cartSchema";

//!Front veya backendte verilen size için bir product var mı bilmiyoruz. Bu  validasyonu muhtemelen taaa sipariş aşamasında yapıcaz
export default function ClosetForm() {
  const queryClient = useQueryClient();
  const params = useParams();

  const {
    data: cart,
    isLoading: cartDataIsLoading,
    error: cartError,
  } = useQuery({
    queryKey: ["cart", params.id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5059/api/cart/${params.id}`
      );

      return response.data.data;
    },
    enabled: !!params.id,
  });

  useEffect(() => {
    if (cart) {
      resetToInitialData();
    }
  }, [cart]);

  const { mutate: submitCart, submitIsLoading } = useMutation({
    mutationFn: async ({ body }) => {
      const parameter = params.id ? params.id : "";
      const method = params.id ? "PUT" : "POST";
      const response = await axios({
        url: `http://localhost:5059/api/cart/${parameter}`,
        method,
        data: body,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Cart submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message || "An error occured");
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
    defaultValues: cartDefault,
    resolver: yupResolver(cartSchema),
  });

  const clearForm = () => {
    reset();
  };

  const resetToInitialData = () => {
    console.log(cart);
    setValue("productID", cart.productID);
    setValue("size", cart.size);
    setValue("amount", cart.amount);
    setValue("userID", cart.userID);
  };

  const onReset = () => {
    if (cart) {
      resetToInitialData();
    } else {
      clearForm();
    }
  };

  const onSubmitHandler = (data) => {
    console.log(data);
    submitCart({ body: data });
  };

  return (
    <Box sx={{ p: 3, mt: 1, width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={2}>
          <Controller
            name="userID"
            control={control}
            render={({ field }) => (
              <TextField
                label="User Id"
                fullWidth
                {...field}
                type="number"
                error={!!errors.userID}
                helperText={errors?.userID?.message}
              />
            )}
          />

          <Controller
            name="productID"
            control={control}
            render={({ field }) => (
              <TextField
                label="Product Id"
                fullWidth
                {...field}
                type="number"
                error={!!errors.productID}
                helperText={errors?.productID?.message}
              />
            )}
          />

          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={!!errors.size}
                helperText={errors.size?.message}
              >
                <InputLabel>Size</InputLabel>
                <Select label="Size" fullWidth {...field}>
                  {["XS", "S", "M", "L", "XL", "XXL"].map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.size?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                label="Amount"
                fullWidth
                {...field}
                type="number"
                error={!!errors.amount}
                helperText={errors?.amount?.message}
              />
            )}
          />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              //fullWidth
              type="submit"
              disabled={submitIsLoading || !!cartError}
              sx={{ width: "50%" }}
            >
              {submitIsLoading ? "Gönderiliyor..." : "Kaydet"}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              type="button"
              onClick={onReset}
              sx={{ width: "50%" }}
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
