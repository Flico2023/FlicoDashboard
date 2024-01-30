import {
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { center } from "../../utils/muiStyles";
import WarehouseForm from "./components/WarehouseForm";


export default function NewWarehousePage() {

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
        <Typography variant="h4">New Warehouse</Typography>
        <Typography mt={1}>

          You can add new warehouse by filling the form below
        </Typography>
        <Box sx={{ ...center, width: "100%" }}>
          <WarehouseForm></WarehouseForm>
        </Box>
      </Box>
    </Box>
  );
}


