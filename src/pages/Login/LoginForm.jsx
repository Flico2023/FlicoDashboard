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
import { loginSchema, loginDefault } from "./formDefaults";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLogin } from "../../context/LoginContect";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: loginDefault,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { setToken, setUserId, setExpireTime } = useLogin();

  const loginHandler = (tokenStr) => {
    const token = tokenStr;
    const decodedPayload = jwtDecode(token);

    const role =
      decodedPayload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    if (role !== "Admin") {
      setErrorMessage("You are not admin");
      return;
    }

    localStorage.setItem("jwtToken", token);

    const expireTime = new Date(
      decodedPayload.exp * 1000
    );
    setExpireTime(expireTime);
    console.log("expire time in login" + expireTime);
    localStorage.setItem("expireTime", expireTime.toISOString());

    const decodeUserId =
      decodedPayload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    setUserId(decodeUserId);
    localStorage.setItem("userId", decodeUserId);

    setToken(token);
  };

  const onSubmit = async (data) => {
    try {
      setErrorMessage("");
      const response = await axios.post(
        "http://localhost:5059/api/user/SignIn",
        data
      );
      console.log(response);

      const token = response.data.token;
      loginHandler(token);

      navigate("/products");
    } catch (error) {
      console.log(error);
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
          Login
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
            label="Email"
            {...register("mail")}
            error={!!errors.mail}
            helperText={errors.mail?.message}
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
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Box sx={{ mt: 0 }}>
            <Typography>
              Do not have an account? <Link to="/register">Register</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
