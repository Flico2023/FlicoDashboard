import {
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";

import { center } from "../../utils/muiStyles";
import ProductForm from "./components/ProductForm";


export default function EditProductPage() {

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
        <Typography variant="h4">Edit Product</Typography>
        <Typography mt={1}>
          You can edit by filling the form below
        </Typography>
        <Box sx={{  width: "100%" }}>
          <ProductForm/>

        </Box>
      </Box>
    </Box>
  );
}




