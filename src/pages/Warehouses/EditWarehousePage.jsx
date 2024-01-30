import { Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { center } from "../../utils/muiStyles";
import WarehouseForm from "./components/WarehouseForm";

export default function EditWarehousePage() {

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
        <Typography variant="h4">Edit Warehouse</Typography>
        <Typography mt={1}>
          You can edit an existing warehouse information by filling the form below
        </Typography>
        <Box sx={{ ...center, width: "100%" }}>
        <WarehouseForm></WarehouseForm>
        </Box>
      </Box>
    </Box>
  );
}
