import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { center, flexBetween, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import AirportFilter from "./components/AirportFilter";
import AirportTable from "./components/AirportTable";

export default function Airports() {
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
          <Typography variant="h4">Airports</Typography>
          <Link to="/airports/new">
            <Button color="secondary"  sx={{ ml: 2 }}
            startIcon={<AddCircleIcon />}
            >
              Add new
            </Button>
          </Link>
        </Box>

        <Typography mt={1}>You can see and edit airport by filters in this page</Typography>

        <Grid container spacing={1}>
            <Grid item xs={12} lg={2} >
                <AirportFilter />
            </Grid>

            <Grid item xs={12} lg={10}>
                <AirportTable/>
            </Grid>
            

        </Grid>

      </Box>
    </Box>
  );
}
