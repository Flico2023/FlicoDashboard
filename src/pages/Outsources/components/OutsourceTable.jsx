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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OutsourceTable() {
  const queryClient = useQueryClient();

  //#region React query
  const {
    mutate: deleteOutsource,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useMutation(
    async (id) => {
      const response = await axios.delete(
        `http://localhost:5059/api/outsource/${id}`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("Outsource deleted successfully");
        queryClient.invalidateQueries(["outsources"]);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting Outsource");
      },
    }
  );

  const {
    data: outsources,
    isLoading: outsourceIsLoading,
    error: outsourceError,
  } = useQuery(["outsources"], async () => {
    const response = await axios.get(`http://localhost:5059/api/outsource`);

    return response.data.data;
  });
  //#endregion

  console.log("data");
  console.log(outsources);

  const deleteHandler = (id) => {
    deleteOutsource(id);
  };

  /*
  
{outsourceId: 1, companyName: 'string', city: 'string', address: 'string', email: 'string'}
  */
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
                <b>Company Name</b>
              </TableCell>
              <TableCell align="left">
                <b>City</b>
              </TableCell>
              <TableCell align="left">
                <b>Email</b>
              </TableCell>
              <TableCell align="left">
                <b>Contact Person</b>
              </TableCell>
              <TableCell align="left">
                <b>Phone</b>
              </TableCell>
              <TableCell align="left">
                <b>Address</b>
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {outsources?.map((outsource) => (
              <TableRow key={outsource.outsourceId}>
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
                    <Link to={`/Outsources/edit/${outsource.outsourceId}`}>
                      <IconButton>
                        {" "}
                        <EditIcon color="primary" />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => deleteHandler(outsource.outsourceId)}>
                      <DeleteIcon
                        color="error"
                        
                      />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="left">{outsource.companyName}</TableCell>
                <TableCell align="left">{outsource.city}</TableCell>
                <TableCell align="left">{outsource.email}</TableCell>
                <TableCell align="left">{outsource.contactPerson}</TableCell>
                <TableCell align="left">{outsource.phone}</TableCell>
                <TableCell align="left">{outsource.address}</TableCell>

                {/* 
                              <TableCell align="left">
                <b>Company Name</b>
              </TableCell>
              <TableCell align="left">
                <b>City</b>
              </TableCell>
              <TableCell align="left">
                <b>Email</b>
              </TableCell>
              <TableCell align="left">
                <b>Contact Person</b>
              </TableCell>
              <TableCell align="left">
                <b>Phone</b>
              </TableCell>
              <TableCell align="left">
                <b>Address</b>
              </TableCell> */}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
