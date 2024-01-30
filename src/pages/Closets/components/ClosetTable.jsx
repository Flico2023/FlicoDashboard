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
  Alert,
  CircularProgress,
} from "@mui/material";
import { center } from "../../../utils/muiStyles";
import { useAirportFilter } from "../../../context/AirportFilterContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const apiUrl = "http://localhost:5059/api";

export default function AirportTable({filter}) {
  const queryClient = useQueryClient();

  //#region React query
  const {
    mutate: deleteCloset,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useMutation(
    async (id) => {
      const response = await axios.delete(`${apiUrl}/closet/${id}`);
      return response.data.data;
    },
    {
      onSuccess: () => {
        toast.success("Airport deleted successfully");
        queryClient.invalidateQueries(["airports"]);
      },
      onError: (error) => {
        console.log(error);
        //error.response.data.message da olabilir burası dikkat et
        toast.error("Error deleting closet: " + error.data.message);
      },
    }
  );

  const {
    data: closets,
    isLoading: closetsIsLoading,
    error: closetsError,
  } = useQuery(["closets"], async () => {
    const response = await axios.get(`${apiUrl}/closet`);

    return response.data.data;
  });

  console.log("data");
  console.log(closets);

  const filteredClosets =
    filter === ""
      ? closets
      : closets?.filter((closet) => closet.airportID === filter);

    //#endregion

    console.log("filteredClosets");
    console.log(filteredClosets);
    console.log("filter", filter)

  const deleteHandler = (id) => {
    deleteCloset(id);
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <TableContainer style={{height:"75vh", overflowY:"auto"}}>
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
                <b>Closet No</b>
              </TableCell>
              <TableCell align="left">
                <b>Status</b>
              </TableCell>
              <TableCell align="left">
                <b>Order No</b>
              </TableCell>
              <TableCell align="left">
                <b>Password</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClosets?.map((closet) => (
              <TableRow key={closet.closetID}>
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
                    <Link to={`/closets/edit/${closet.closetID}`}>
                      <IconButton>
                        {" "}
                        <EditIcon color="primary" />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => deleteHandler(closet.closetID)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="left">{closet.airportName}</TableCell>

                <TableCell align="left">{closet.closetNo}</TableCell>

                <TableCell align="left">
                  {closet.isEmpty ? "Empty" : "In Use"}
                </TableCell>

                <TableCell align="left">
                  <Link to={`orders/detail/${closet.orderNo}`}>
                    {closet.orderNo}
                  </Link>
                </TableCell>

                <TableCell align="left">{closet.password}</TableCell>
              </TableRow>
            ))}
            {closets?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Alert severity="warning">No closets found</Alert>
                </TableCell>
              </TableRow>
            )}
            {closetsIsLoading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {closetsError && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Alert severity="error">Error loading closets</Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
