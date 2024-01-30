import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { center, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import WarehouseTable from "./components/WarehouseTable";

export default function Warehouses() {
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
          <Typography variant="h4">Warehouses</Typography>
          <Link to="/warehouses/new">
            <Button color="secondary"  sx={{ ml: 2 }}
            startIcon={<AddCircleIcon />}
            >
              Add new
            </Button>
          </Link>
        </Box>

        <Typography mt={1}>You can see and edit warehouses by filters in this page</Typography>

        <Grid container spacing={1}>

            <Grid item xs={12} lg={10}>
                <WarehouseTable/>
            </Grid>
            
        </Grid>

       

      </Box>
    </Box>
  );
}
