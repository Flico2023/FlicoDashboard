import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { center, flexBetween, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import ProductFilter from "./components/ProductFilter";
import ProductTable from "./components/ProductTable";
import ProductFilterProvider from "./context/ProductFilterContext";

export default function ProductsPage() {
  return (
    <ProductFilterProvider>
      <Box sx={{ ...center, p: 2 }}>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "90%",
            },
          }}
        >
          <Box sx={{ ...flexStart }}>
            <Typography variant="h4">Products</Typography>
            <Link to="/products/new">
              <Button
                color="secondary"
                sx={{ ml: 2 }}
                startIcon={<AddCircleIcon />}
              >
                Add new
              </Button>
            </Link>
          </Box>

          <Typography mt={1} sx={{ mb: 4 }}>
            You can see and edit products in this page
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <ProductFilter></ProductFilter>
            </Grid>

            <Grid item xs={12}>
              <ProductTable></ProductTable>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ProductFilterProvider>
  );
}
