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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FaqsTable() {

  const queryClient = useQueryClient();

  //#region React query
  const {
    mutate: deleteFaq,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useMutation(
    async (id) => {
      const response = await axios.delete(
        `http://localhost:5059/api/faqs/${id}`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("FAQ başarıyla silindi");
        queryClient.invalidateQueries(["faqs"]);
      },
      onError: (error) => {
        console.log(error);
        toast.error("FAQ silinemedi");
      },
    }
  );

  const {
    data: faqs,
    isLoading: faqIsLoading,
    error: faqError,
  } = useQuery(["faqs"], async () => {
    const response = await axios.get(`http://localhost:5059/api/faqs`);

    return response.data.data;
  });
  //#endregion

  console.log("data");
  console.log(faqs);

  const deleteHandler = (id) => {
    deleteFaq(id);
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
                <b>Soru</b>
              </TableCell>
              <TableCell align="left">
                <b>Kategori</b>
              </TableCell>
              <TableCell align="left">
                <b>Kategori</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faqs?.map((faq) => (
              <TableRow key={faq.faqID}>
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
                    <Link to={`/faqs/edit/${faq.faqID}`}>
                      <IconButton>
                        {" "}
                        <EditIcon color="primary" />
                      </IconButton>
                    </Link>
                    <IconButton
                      onClick={() => deleteHandler(faq.faqID)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="left">{faq.category}</TableCell>

                <TableCell align="left">{faq.question}</TableCell>

                <TableCell align="left" ><Typography >{faq.answer}</Typography></TableCell>
                {/* <TableCell align="left">{airport.numOfClosets}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
