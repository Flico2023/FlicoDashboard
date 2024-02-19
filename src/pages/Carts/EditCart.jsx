import React from 'react'

import { Box, Typography } from '@mui/material'
import { center } from "../../utils/muiStyles";
import CartForm from './components/CartForm';

export default function EditCart() {
  return (
    <Box sx={{ ...center, p: 2 }}>
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "90%",
          md: "60%",
        },
      }}
    >
      <Typography variant="h4">Edit Cart</Typography>
      <Typography mt={1}>
        You can edit cart information by filling the form below
      </Typography>
      <Box sx={{ ...center, width: "100%" }}>
        
      </Box> 

      <CartForm></CartForm>
    </Box>
  </Box>
  )
}
