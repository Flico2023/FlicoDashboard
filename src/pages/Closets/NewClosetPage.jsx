import {
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { center } from "../../utils/muiStyles";
import ClosetForm from "./components/ClosetForm";


export default function NewClosetPage() {


  return (
    <Box sx={{ ...center, p: 2 }}>
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "90%",
            md: "80%",
          },
        }}
      >
        <Typography variant="h4">New Closet</Typography>
        <Typography mt={1}>
          You can add closet  by filling the form below
        </Typography>
        <Box sx={{ ...center, width: "100%" }}>
          <ClosetForm/>
        </Box>
      </Box>
    </Box>
  );
}



