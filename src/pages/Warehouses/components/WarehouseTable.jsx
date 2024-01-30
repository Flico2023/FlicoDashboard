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

export default function WarehouseTable() {
  const queryClient = useQueryClient();

  //#region React query
  const {
    mutate: deleteWarehouse,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useMutation(
    async (id) => {
      const response = await axios.delete(
        `http://localhost:5059/api/warehouse/${id}`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("Warehouse deleted successfully");
        queryClient.invalidateQueries(["warehouse"]);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting warehouse");
      },
    }
  );

  const {
    data: warehouses,
    isLoading: warehouseIsLoading,
    error: warehouseError,
  } = useQuery(["warehouse"], async () => {
    const response = await axios.get(`http://localhost:5059/api/warehouse`);

    return response.data.data;
  });
  //#endregion

  console.log("data");
  console.log(warehouses);

  const deleteHandler = (id) => {
    deleteWarehouse(id);
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
                <b>Warehouse Name</b>
              </TableCell>
              <TableCell align="left">
                <b>City</b>
              </TableCell>
              {/* <TableCell>Principal</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouses?.map((warehouse) => (
              <TableRow key={warehouse.warehouseID}>
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
                    <Link to={`/warehouses/edit/${warehouse.warehouseID}`}>
                      <IconButton>
                        {" "}
                        <EditIcon color="primary" />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => deleteHandler(warehouse.warehouseID)}>
                      <DeleteIcon
                        color="error"
                        
                      />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="left">{warehouse.warehouseName}</TableCell>

                <TableCell align="left">{warehouse.city}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
