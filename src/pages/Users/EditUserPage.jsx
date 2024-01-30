import { Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { center } from "../../utils/muiStyles";
import UserForm from "./components/UserForm";

export default function EditUserPage() {

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
        <Typography variant="h4">Edit User</Typography>
        <Typography mt={1}>
          You can edit an existing user information by filling the form below
        </Typography>
        <Box sx={{ ...center, width: "100%" }}>
          <UserForm></UserForm>
        </Box>
      </Box>
    </Box>
  );
}

