import { Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { center } from "../../utils/muiStyles";
import UserForm from "./components/UserForm";


export default function NewUserPage() {

  return (
    <Box sx={{ ...center, p: 2 }}>
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "90%",
            md: "60%",
          },
        }}
      >
        <Typography variant="h4">New User</Typography>
        <Typography mt={1}>
          You can add user information by filling the form below
        </Typography>
        <Box sx={{ ...center, width: "100%" }}>
        <UserForm></UserForm>
        </Box>
      </Box>
    </Box>
  );
}

