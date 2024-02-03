import { Typography, Box } from "@mui/material";
import React from "react";
import { center } from "../../utils/muiStyles";
import FaqForm from "./components/FaqForm";

export default function NewFaqPage() {
  return (
    <Box sx={{ ...center, p: 2 }}>
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "90%",
            md: "80%",
          },
        }}
      >
        <Typography variant="h4">New FAQ</Typography>
        <Typography mt={1}>
          You can add FAQ by filling the form below
        </Typography>
        <Box sx={{ ...center, width: "100%" }}>
          <FaqForm />
        </Box>
      </Box>
    </Box>
  );
}
