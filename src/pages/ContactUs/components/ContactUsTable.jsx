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
  Chip,
} from "@mui/material";
import { center } from "../../../utils/muiStyles";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContactUsFilterContext } from "../context/ContactUsFilterContext";
import { formatDateTime } from "../../../utils/formatDateTime";

export default function MessagesTable() {
  const [options, setOptions] = useState([]);
  const { queryString, updatePageConfig, pageConfig } = useContext(
    ContactUsFilterContext
  );
  const queryClient = useQueryClient();

  //#region React query
  const {
    mutate: deleteMessage,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useMutation(
    async (id) => {
      const response = await axios.delete(
        `http://localhost:5059/api/contact_messages/${id}`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("Message deleted successfully");
        queryClient.invalidateQueries(["messages"]);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting message");
      },
    }
  );

  const {
    data: results,
    isLoading: messagesIsLoading,
    error: messagesError,
  } = useQuery(["messages", queryString], async () => {
    const response = await axios.get(
      `http://localhost:5059/api/contact_messages${queryString}`
    );
    return response.data.data;
  });
  //#endregion

  console.log("query");
  console.log(queryString);
  console.log("data");
  console.log(results);

  const deleteHandler = (id) => {
    deleteMessage(id);
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
        <Typography variant="h5">Messages</Typography>

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
      {results && (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <b>Delete</b>
                </TableCell>
                <TableCell align="left">
                  <b>Answer</b>
                </TableCell>
                <TableCell align="left">
                  <b>Id</b>
                </TableCell>
                <TableCell align="left">
                  <b>Status</b>
                </TableCell>
                <TableCell align="left">
                  <b>Name</b>
                </TableCell>
                <TableCell align="left">
                  <b>Email</b>
                </TableCell>
                <TableCell align="left">
                  <b>Subject</b>
                </TableCell>

                <TableCell align="left">
                  <b>Created Date</b>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {results?.contactMessages?.map((message) => (
                <TableRow key={message.id}>
                  <TableCell align="left">
                    <IconButton onClick={() => deleteHandler(message.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <Link to={`/contactus/edit/${message.id}`}>
                      <Button variant="outlined" color="primary">
                        Answer
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="left">{message.id}</TableCell>
                  <TableCell align="left">
                    {message.status === "Pending" ? (
                      <Chip color="error" label="Pending" />
                    ) : (
                      <Chip color="success" label="Answered" />
                    )}
                  </TableCell>
                  <TableCell align="left">{message.name}</TableCell>
                  <TableCell align="left">{message.email}</TableCell>
                  <TableCell align="left">
                    <Typography>{message.subject}</Typography>
                  </TableCell>
                  <TableCell align="left">{formatDateTime(message.messageDate)}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {messagesIsLoading && <CircularProgress size="lg"></CircularProgress>}
      {messagesError && <Alert severity="error">An error occured!</Alert>}
    </Paper>
  );
}
