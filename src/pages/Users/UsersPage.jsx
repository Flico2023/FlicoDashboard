import React from 'react'
import { Box, Button, Grid, Typography } from "@mui/material";
import { center, flexBetween, flexStart } from "../../utils/muiStyles";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import UsersTable from './components/UsersTable';
import UserFilter from './components/UserFilter';
import UserFilterProvider from './context/UserFilterContext';

export default function OutsourcesPage() {
    return (
      <UserFilterProvider>
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
              <Typography variant="h4">Users</Typography>
              <Link to="/users/new">
                <Button color="secondary"  sx={{ ml: 2 }}
                startIcon={<AddCircleIcon />}
                >
                  Add new
                </Button>
              </Link>
            </Box>
    
            <Typography mt={1} sx={{mb:4}} >You can see and edit users in this page</Typography>
    
            
            <Grid container spacing={4}>
                <Grid item xs={12} >
                    <UserFilter></UserFilter>
                </Grid>

                <Grid item xs={12}>
                    <UsersTable></UsersTable>
                </Grid>           
            </Grid>
           
    
          </Box>

        
        </Box>
        </UserFilterProvider>
      );
}
