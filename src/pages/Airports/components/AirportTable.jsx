import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { center } from "../../../utils/muiStyles";
import { useAirportFilter } from "../../../context/AirportFilterContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AirportTable() {
  const { filter } = useAirportFilter();
  const queryClient = useQueryClient();

  const {mutate: deleteAirport, isLoading: deleteIsLoading, error: deleteError} = useMutation(async (id) => {
    const response = await axios.delete(`http://localhost:3000/airports/${id}`);
    return response.data;
  }, {
    onSuccess: () => {
      toast.success("Airport deleted successfully");
      queryClient.invalidateQueries("airports");
    },
    onError: (error) => {
      console.log(error)
      toast.error("Error deleting airport");
    }
  })


  const {
    data: airports,
    isLoading: airportIsLoading,
    error: airportError,
  } = useQuery(
    ["airports", filter],
    async () => {
      const response = await axios.get(
        `http://localhost:3000/airports?city=${filter.city}&country=${filter.country}`
      );

      return response.data;
    },
    {
      enabled: filter.city !== "" && filter.country !== "",
    }
  );

  console.log("data");
  console.log(airports);

  const deleteHandler = (id) => {
    deleteAirport(id);
  }

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left"><b>Edit</b></TableCell>
              <TableCell align="left"><b>Delete</b></TableCell>
              <TableCell align="left"><b>Airport Name</b></TableCell>
              <TableCell align="left"><b>Country</b></TableCell>
              <TableCell align="left"><b>City</b></TableCell>
              <TableCell align="left"><b>Closet amount</b></TableCell>
              {/* <TableCell>Principal</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {airports?.map((airport) => (
              <TableRow key={airport.id}>
                <TableCell align="left">
                  <Link to={`/airports/edit/${airport.id}`}>
                    <Button color="primary" >Edit</Button>
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Button onClick={() => deleteHandler(airport.id)} color="error">Delete</Button>
                </TableCell>
                <TableCell align="left">{airport.airportName}</TableCell>
                <TableCell align="left">{airport.country}</TableCell>
                <TableCell align="left">{airport.city}</TableCell>
                <TableCell align="left">{airport.numOfClosets}</TableCell>
                {/* <TableCell>{airport.principal}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
