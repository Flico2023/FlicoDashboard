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
import { formatDateTime } from "../../../utils/formatDateTime";
import { CartFilterContext } from "../context/CartsFilterContextProvider";

export default function CartsTable() {
  const [options, setOptions] = useState([]);
  const { queryString, updatePageConfig, pageConfig } =
    useContext(CartFilterContext);
  const queryClient = useQueryClient();

  //#region React query
  const {
    mutate: deleteCart,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useMutation(
    async (id) => {
      const response = await axios.delete(
        `http://localhost:5059/api/cart/${id}`
      );
      return response.data.data;
    },
    {
      onSuccess: () => {
        toast.success("Cart deleted successfully");
        queryClient.invalidateQueries(["carts"]);
      },
      onError: (error) => {
        console.log(error);
        //BURASI DA İÇİME SİNMİYOR HİÇ HAT AALAMIYORUM ÇÜNKÜ
        toast.error(error?.response?.data?.message || "An error occured");
      },
    }
  );

  const {
    data: results,
    isLoading: cartIsLoading,
    error: cartError,
  } = useQuery(["carts", queryString], async () => {
    const response = await axios.get(
      `http://localhost:5059/api/cart${queryString}`
    );
    return response.data.data;
  });
  //#endregion

  console.log("query");
  console.log(queryString);
  console.log("data");
  console.log(results);

  const deleteHandler = (id) => {
    deleteCart(id);
  };

  useEffect(() => {
    if (!results) return;

    const options = [];
    const pageCount = Math.ceil(results.totalCount / results.pageSize);

    //BU İŞLEM HİÇ İÇİME SİNMİYOR
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
        <Typography variant="h5">Carts</Typography>

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
                  <b>Edit</b>
                </TableCell>
                <TableCell align="left">
                  <b>Id</b>
                </TableCell>
                <TableCell align="left">
                  <b>User</b>
                </TableCell>
                <TableCell align="left">
                  <b>Product (Id - Brand - Product Name)</b>
                </TableCell>
                <TableCell align="left">
                  <b>Color</b>
                </TableCell>
                <TableCell align="left">
                  <b>Size</b>
                </TableCell>
                <TableCell align="left">
                  <b>Amount</b>
                </TableCell>

                <TableCell align="left">
                  <b>Product Details</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results?.data?.map((cart) => (
                <TableRow key={cart.cartID}>
                  <TableCell align="left">
                    <IconButton onClick={() => deleteHandler(cart.cartID)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <Link to={`/carts/edit/${cart.cartID}`}>
                      <Button variant="outlined" color="primary">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="left">{cart.cartID}</TableCell>
                  <TableCell align="left">
                    <Typography>
                      {" "}
                      <b>{cart.user.userID}</b> -{" "}
                      {cart.user.name + " " + cart.user.surname}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <b>{cart.product.productID}</b> - {cart.product.brand} -{" "}
                    {cart.product.productName}
                  </TableCell>
                  <TableCell align="left">{cart.product.color}</TableCell>
                  <TableCell align="left">{cart.size}</TableCell>
                  <TableCell align="left">
                    <Typography>{cart.amount}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <img
                      src={cart.product.imagePath}
                      alt=""
                      style={{ width: "150px" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {cartIsLoading && <CircularProgress size="lg"></CircularProgress>}
      {cartError && (
        <Alert severity="error">
          {cartError.response.data.message} An error occured!
        </Alert>
      )}
      {results?.data?.length === 0 && (
        <Alert color="warning" sx={{ mt: 2 }}>
          No item found
        </Alert>
      )}
    </Paper>
  );
}
