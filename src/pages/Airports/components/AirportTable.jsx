import React from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import { center } from "../../../utils/muiStyles";
import { useAirportFilter } from "../../../context/AirportFilterContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLogin } from "../../../context/LoginContect";

export default function AirportTable() {
  const { filter } = useAirportFilter();
  const queryClient = useQueryClient();

  const { token } = useLogin();

  //#region React query
  const {
    mutate: deleteAirport,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useMutation(
    async (id) => {
      const response = await axios.delete(
        `http://localhost:5059/api/airport/${id}`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("Airport deleted successfully");
        queryClient.invalidateQueries(["airports"]);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting airport");
      },
    }
  );

  const {
    data: airports,
    isLoading: airportIsLoading,
    error: airportError,
  } = useQuery(["airports"], async () => {
    console.log("token", token)
    const response = await axios.get(`http://localhost:5059/api/airport`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );

    return response.data.data;
  });
  //#endregion

  console.log("data");
  console.log(airports);

  const deleteHandler = (id) => {
    deleteAirport(id);
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>Action</b>
              </TableCell>
              <TableCell align="left">
                <b>Airport Name</b>
              </TableCell>
              <TableCell align="left">
                <b>City</b>
              </TableCell>
              {/* <TableCell align="left">
                <b>Closet amount</b>
              </TableCell> */}
              {/* <TableCell>Principal</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {airports?.map((airport) => (
              <TableRow key={airport.airportID}>
                <TableCell align="left">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: {
                        xs: "space-between",
                        sm: "flex-start",
                      },
                      alignItems: "center",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                    }}
                  >
                    <Link to={`/airports/edit/${airport.airportID}`}>
                      <IconButton>
                        {" "}
                        <EditIcon color="primary" />
                      </IconButton>
                    </Link>
                    <IconButton
                      onClick={() => deleteHandler(airport.airportID)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="left">{airport.airportName}</TableCell>

                <TableCell align="left">{airport.city}</TableCell>
                {/* <TableCell align="left">{airport.numOfClosets}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
