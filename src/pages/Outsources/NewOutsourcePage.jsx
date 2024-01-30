import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { center } from "../../utils/muiStyles";
import OutsourceForm from "./components/OutsourceForm";
import {
  Typography,
  Box,
} from "@mui/material";

export default function NewOutsourcePage() {
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
        <Typography variant="h4">New Outsource</Typography>
        <Typography mt={1}>

          You can add new Outsource by filling the form below
        </Typography>
        <Box sx={{ ...center, width: "100%" }}>
          <OutsourceForm></OutsourceForm>
        </Box>
      </Box>
    </Box>
  );
}
