import React from 'react'
import { Box, Button, Grid, Typography } from "@mui/material";
import { center, flexBetween, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import UserFilterProvider from '../Users/context/UserFilterContext';
import ContactUsFilter from './components/ContactUsFilter';
import ContactUsTable from './components/ContactUsTable';
import ContactMessageFilter from './components/ContactUsFilter';
import ContactUsFilterProvider from './context/ContactUsFilterContext';


export default function AllContactUsPage() {
    return (
      <ContactUsFilterProvider>
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
              <Typography variant="h4">Contact Us Messages</Typography>
              {/* <Link to="/users/new">
                <Button color="secondary"  sx={{ ml: 2 }}
                startIcon={<AddCircleIcon />}
                >
                  Add new
                </Button>
              </Link> */}
            </Box>
    
            <Typography mt={1} sx={{mb:4}} >You can see and answer contact us messages in this page</Typography>
    
            
            <Grid container spacing={4}>
                <Grid item xs={12} >
                    <ContactMessageFilter></ContactMessageFilter>
                </Grid>

                <Grid item xs={12}>
                    <ContactUsTable></ContactUsTable>
                </Grid>           
            </Grid>
           
    
          </Box>

        
        </Box>
        </ContactUsFilterProvider>
      );
}
