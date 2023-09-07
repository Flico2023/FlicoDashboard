import React from 'react'
import { Box, Button, Grid, Typography } from "@mui/material";
import { center, flexBetween, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import StuffFilter from './components/StuffFilter';

export default function FlicoStuff() {
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
              <Typography variant="h4">Flico Stuff</Typography>
              <Link to="/flicostuff/new">
                <Button color="secondary"  sx={{ ml: 2 }}
                startIcon={<AddCircleIcon />}
                >
                  Add new
                </Button>
              </Link>
            </Box>
    
            <Typography mt={1}>You can see and edit our stuff by filters in this page</Typography>
    
            <Grid container spacing={1}>
                <Grid item xs={12} lg={2} >
                    <StuffFilter/>
                </Grid>
    
                <Grid item xs={12} lg={10}>
                    
                </Grid>
                
    
            </Grid>
    
          </Box>
        </Box>
      );
}
