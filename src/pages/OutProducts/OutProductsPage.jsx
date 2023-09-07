import React from 'react'
import { Box, Button, Grid, Typography } from "@mui/material";
import { center, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";


export default function OutProducts() {
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
              <Typography variant="h4">Outsources Product</Typography>
              <Link to="/outproducts/new">
                <Button color="secondary"  sx={{ ml: 2 }}
                startIcon={<AddCircleIcon />}
                >
                  Add new
                </Button>
              </Link>
            </Box>
    
            <Typography mt={1}>You can see and edit products go to outsource services by filters in this page</Typography>
    
            <Grid container spacing={1}>
                <Grid item xs={12} lg={2} >
                    
                </Grid>
    
                <Grid item xs={12} lg={10}>
                    
                </Grid>
                
    
            </Grid>
    
          </Box>
        </Box>
      );
}
