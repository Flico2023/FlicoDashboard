import React from 'react'
import { Box, Button, Grid, Typography } from "@mui/material";
import { center, flexBetween, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import CartFilterProvider from './context/CartsFilterContextProvider';
import CartFilter from './components/CartFilter';
import CartTable from './components/CartTable';

export default function AllCartsPage() {
    return (
      <CartFilterProvider>
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
              <Typography variant="h4">Carts</Typography>
              <Link to="/carts/new">
                <Button color="secondary"  sx={{ ml: 2 }}
                startIcon={<AddCircleIcon />}
                >
                  Add new
                </Button>
              </Link> 
            </Box>
    
            <Typography mt={1} sx={{mb:4}} >You can see cart informations in this page</Typography>
    
            
            <Grid container spacing={4}>
                <Grid item xs={12} >
                    <CartFilter></CartFilter>
                </Grid>

                <Grid item xs={12}>
                    <CartTable></CartTable>
                </Grid>           
            </Grid>
           
    
          </Box>

        
        </Box>
        </CartFilterProvider>
      );
}
