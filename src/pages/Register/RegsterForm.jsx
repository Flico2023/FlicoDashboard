import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { registerDefault, registerSchema } from "./registerFormDefaults";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LoginContect";

export function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {setToken} = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: registerDefault,
  });

  const onSubmit = async (data) => {
    try {
        setErrorMessage("");
      const response = await axios.post(
        "http://localhost:5059/api/user/SignUp",
        data
      );

      setToken(response.data.token);
      navigate("/products");

    } catch (error) {
      setErrorMessage("An error occurred while registering.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" color={"primary"}>
          Flico
        </Typography>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Surname"
            {...register("surname")}
            error={!!errors.surname}
            helperText={errors.surname?.message}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            variant="outlined"
          />

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Box sx={{ mt: 0 }}>
            <Typography>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
