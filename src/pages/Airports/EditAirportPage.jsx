import { Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { center } from "../../utils/muiStyles";
import { AirportForm } from "./components/AirportForm";


export default function NewAirportPage() {
  const [formValues, setFormValues] = useState();

  const { id } = useParams();

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
        <Typography variant="h4">Edit Airport</Typography>
        <Typography mt={1}>
          You can edit an existing airport's information by filling the form
          below
        </Typography>
        <Box sx={{ ...center, width: "100%" }}>
          <AirportForm />
        </Box>
      </Box>
    </Box>
  );
}
