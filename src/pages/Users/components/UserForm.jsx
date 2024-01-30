import { Paper, Box, TextField, Stack, Button, Alert } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { userDefault } from "../data/userDefault";
import {userSchema} from "../data/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function UserForm() {
  const queryClient = useQueryClient();
  const params = useParams();

  const {
    data: user,
    isLoading: formDataIsLoading,
    error: getError, //BURDA NE YAPICAM BİLMİYORUM
  } = useQuery({
    queryKey: ["user", params.id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5059/api/user/${params.id}`
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
    defaultValues: userDefault,
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("surname", user.surname);
      setValue("email", user.email);
      setValue("password", user.password);
      setValue("phone", user.phone);
    }
  }, [user]);

  const {
    mutate: submitUser,
    isLoading,
    error: submitError,
  } = useMutation({
    mutationFn: async ({ body }) => {
        const parameter = params.id ? params.id : "";
        const method = params.id ? "PUT" : "POST";
        console.log(parameter, method, body)
      const response = await axios({
        url: `http://localhost:5059/api/user/${parameter}`,
        method,
        data: body,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("User submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
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

    submitUser({ body });
  };

  return (
    <Paper sx={{ p: 3, mt: 3, width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={2}>

            <TextField
                fullWidth
                id="name"
                label="Name"
                defaultValue=""
                {...register(`name`)}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputLabelProps={{ shrink: params.id ? true : undefined }}
            />

            <TextField
                fullWidth
                id="surname"
                label="Surname"
                defaultValue=""
                {...register(`surname`)}
                error={!!errors.surname}
                helperText={errors.surname?.message}
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
                id="password"
                label="Password"
                defaultValue=""
                {...register(`password`)}
                error={!!errors.password}
                helperText={errors.password?.message}    
                InputLabelProps={{ shrink: params.id ? true : undefined }}
            />




          {submitError && (
            // FIXME: submitError?.response?.data?.message
            <Alert severity="error">
              {submitError?.response?.data?.message || submitError.message || "bir hata oluştu"}
            </Alert>
          )}

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
