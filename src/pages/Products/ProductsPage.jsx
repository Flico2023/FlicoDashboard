import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { center, flexBetween, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";

export default function ProductsPage() {


  return (
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

        <Typography mt={1}>
          You can see and edit products in this page
        </Typography>


      </Box>
    </Box>
  );
}
