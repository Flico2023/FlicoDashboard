import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { center, flexBetween, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import OrderFilterProvider from "./OrderFilterContext";
import OrderFilter from "./components/OrderFilter";
import OrderTable from "./components/OrderTable";


export default function OrdersPage() {
  console.log("ProductsPage Çalıştı")
  return (
    <OrderFilterProvider>
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
            <Typography variant="h4">Orders</Typography>
            {/* <Link to="/products/new">
              <Button
                color="secondary"
                sx={{ ml: 2 }}
                startIcon={<AddCircleIcon />}
              >
                Add new
              </Button>
            </Link> */}
          </Box>

          <Typography mt={1} sx={{ mb: 4 }}>
            You can see and edit orders in this page
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <OrderFilter></OrderFilter>
            </Grid>

            <Grid item xs={12}>
              <OrderTable></OrderTable>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </OrderFilterProvider>
  );
}
