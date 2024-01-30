import React from "react";

import { Typography, Box } from "@mui/material";

import { center } from "../../utils/muiStyles";

import ClosetForm from "./components/ClosetForm";

export default function EditClosetPage() {
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
        <Typography variant="h4">Edit Closet</Typography>
        <Typography mt={1}>
          You can edit an existing closet's information by filling the form
          below
        </Typography>
        <Box sx={{ ...center, width: "100%" }}>
          <ClosetForm />
        </Box>
      </Box>
    </Box>
  );
}
