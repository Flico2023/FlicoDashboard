import {
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { center } from "../../utils/muiStyles";
import { ProductForm } from "./components/ProductForm";
import StockDetailForm from "./components/StockDetailForm";


export default function NewAirportPage() {


  const { id } = useParams();

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
        <Typography variant="h4">New Product</Typography>
        <Typography mt={1}>
          You can add new product by filling the form below
        </Typography>
        <Box sx={{  width: "100%" }}>
          <ProductForm/>
          <StockDetailForm/>
        </Box>
      </Box>
    </Box>
  );
}



