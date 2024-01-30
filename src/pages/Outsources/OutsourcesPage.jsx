import React from 'react'
import { Box, Button, Grid, Typography } from "@mui/material";
import { center, flexBetween, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import OutsourceTable from './components/OutsourceTable';

export default function OutsourcesPage() {
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
              <Typography variant="h4">Outsources</Typography>
              <Link to="/outsources/new">
                <Button color="secondary"  sx={{ ml: 2 }}
                startIcon={<AddCircleIcon />}
                >
                  Add new
                </Button>
              </Link>
            </Box>
    
            <Typography mt={1}>You can see and edit 3rd party sevices by filters in this page</Typography>
    
            <Grid container spacing={1}>
    
                <Grid item xs={12} lg={10}>
                    <OutsourceTable></OutsourceTable>
                </Grid>
                
    
            </Grid>
    
          </Box>
        </Box>
      );
}
