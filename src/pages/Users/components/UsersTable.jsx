import React, { useContext, useEffect, useState } from "react";
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
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { center } from "../../../utils/muiStyles";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserFilterContext } from "../context/UserFilterContext";

export default function UserTable() {
  const [options, setOptions] = useState([]);
  const { queryString, updatePageConfig, pageConfig } =
    useContext(UserFilterContext);
  const queryClient = useQueryClient();

  //#region React query
  const {
    mutate: deleteUser,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useMutation(
    async (id) => {
      const response = await axios.delete(
        `http://localhost:5059/api/user/${id}`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("user deleted successfully");
        queryClient.invalidateQueries(["users"]);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting user");
      },
    }
  );

  const {
    data: results,
    isLoading: userIsLoading,
    error: userError,
  } = useQuery(["users", queryString], async () => {
    const response = await axios.get(
      `http://localhost:5059/api/user${queryString}`
    );
    return response.data.data;
  });
  //#endregion

  console.log("query");
  console.log(queryString);
  console.log("data");
  console.log(results);

  const deleteHandler = (id) => {
    deleteUser(id);
  };

  useEffect(() => {
    if (!results) return;

    const options = [];
    const pageCount = Math.ceil(results.totalCount / results.pageSize);
    if (
      results &&
      results.totalCount &&
      typeof results.totalCount === "number"
    ) {
      for (let i = 1; i <= pageCount; i++) {
        options.push(
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        );
      }
    }

    setOptions(options);
  }, [results]);

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Users</Typography>

        {results && results.totalCount && (
          <Typography variant="h6">{results.totalCount} results</Typography>
        )}

        {results && results.pageIndex && (
          <Box sx={{ ...center }}>
            <FormControl fullWidth>
              <InputLabel id="pageIndex">Page</InputLabel>
              <Select
                labelId="pageIndex"
                id="pageIndex"
                value={pageConfig.pageIndex}
                label="Page"
                onChange={(e) =>
                  updatePageConfig({ pageIndex: e.target.value })
                }
                sx={{ minWidth: 75 }}
              >
                {options}
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>
      {results && <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>Action</b>
              </TableCell>
              {/* <TableCell align="left">
                <b>Details</b>
              </TableCell> */}
              <TableCell align="left">
                <b>Id</b>
              </TableCell>
              <TableCell align="left">
                <b>Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Surname</b>
              </TableCell>
              <TableCell align="left">
                <b>Email</b>
              </TableCell>
              <TableCell align="left">
                <b>Phone</b>
              </TableCell>
              <TableCell align="left">
                <b>Password</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.users?.map((user) => (
              <TableRow key={user.userID}>
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
                    <Link to={`/users/edit/${user.userID}`}>
                      <IconButton>
                        {" "}
                        <EditIcon color="primary" />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => deleteHandler(user.userID)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="left">{user.userID}</TableCell>

                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.surname}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.phone}</TableCell>
                <TableCell align="left">{user.password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      {userIsLoading && <CircularProgress size="lg"></CircularProgress>}
      {userError && <Alert severity="error">Bir hata oluştu !</Alert>}
    </Paper>

  );
}
