import React from 'react'
import ContactUsForm from './components/ContactUsForm'
import { Box, Typography } from '@mui/material'
import { center } from "../../utils/muiStyles";

export default function EditContactUs() {
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
      {/* <Typography variant="h4">Edit User</Typography>
      <Typography mt={1}>
        You can edit an existing user information by filling the form below
      </Typography>
      <Box sx={{ ...center, width: "100%" }}>
        
      </Box> */}

      <ContactUsForm></ContactUsForm>
    </Box>
  </Box>
  )
}
