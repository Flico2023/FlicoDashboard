import React, { useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ProductFilterContext } from "../context/ProductFilterContext";
import axios from "axios";
import { Alert, Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { center } from "../../../utils/muiStyles";

export default function ProductTable() {

  const { queryString, updatePageConfig, pageConfig } = useContext(ProductFilterContext);

  const queryClient = useQueryClient();

  const [options, setOptions] = useState([]);


  const {
    data: results,
    isLoading: productIsLoading,
    error: productError,
  } = useQuery(["products", queryString], async () => {
    const response = await axios.get(
      `http://localhost:5059/api/product${queryString}`
    );
    console.log(response.data.data);
    return response.data.data;
  });

  const {
    mutate: deleteProduct,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useMutation(
    async (id) => {
      const response = await axios.delete(
        `http://localhost:5059/api/product/${id}`
      );
      return response.data.data;
    },
    {
      onSuccess: () => {
        toast.success("Product deleted successfully");
        queryClient.invalidateQueries(["products"]);
      },
      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "An error occured");
      },
    }
  );

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

  const deleteHandler = (id) => {
    deleteProduct(id);
  };


  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Products</Typography>

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
                {/* <TableCell align="left">
                  <b>Details</b>
                </TableCell> */}
                <TableCell align="left">
                  <b>Image</b>
                </TableCell>
                <TableCell align="left">
                  <b>Id</b>
                </TableCell>
                <TableCell align="left">
                  <b>Brand</b>
                </TableCell>
                <TableCell align="left">
                  <b>Product Name</b>
                </TableCell>
                <TableCell align="left">
                  <b>Category</b>
                </TableCell>
                <TableCell align="left">
                  <b>SubCategory</b>
                </TableCell>
                <TableCell align="left">
                  <b>Price</b>
                </TableCell>
                <TableCell align="left">
                  <b>Color</b>
                </TableCell>
                <TableCell align="left">
                  <b>Sizes</b>
                </TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {results?.products?.map((product) => (
                <TableRow key={product.productID}>
                  <TableCell align="left">
                    <IconButton onClick={() => deleteHandler(product.productID)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <Link to={`/products/edit/${product.productID}`}>
                    <IconButton>
                      <EditIcon color="primary" />
                    </IconButton>
                    </Link>
                  </TableCell>
                  {/* <TableCell align="left">
                    <Link to={`/products/${product.productID}`}>
                      <Button variant="outlined" color="primary">
                        Details
                      </Button>
                    </Link>
                  </TableCell> */}
                   <TableCell align="left">
                    <img
                      src={product.imagePath}
                      alt="image not loaded"
                      style={{ width: "150px" }}
                    />
                  </TableCell> 
                  <TableCell align="left">{product.productID}</TableCell>
                  <TableCell align="left">{product.brand}</TableCell>
                  <TableCell align="left">{product.productName}</TableCell>
                  <TableCell align="left">{product.category}</TableCell>
                  <TableCell align="left">{product.subcategory}</TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell align="left">{product.color}</TableCell>
                  <TableCell align="left">{product.stockDetails.map(sd=>sd.size).join(" - ")}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {productIsLoading && <CircularProgress size="lg"></CircularProgress>}
      {productError && (
        <Alert severity="error">
          {productError.response.data.message} An error occured!
        </Alert>
      )}
      {results?.products?.length === 0 && (
        <Alert color="warning" sx={{ mt: 2 }}>
          No item found
        </Alert>
      )}
    </Paper>
  );
}
