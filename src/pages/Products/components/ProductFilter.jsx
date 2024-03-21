import React, { useContext, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";

import { ProductFilterContext } from "../context/ProductFilterContext";
import { productConfig } from "../data/productConfig";

const defaultFilters = {
  category: [],
  subcategory: [],
  sizes: [],
  brand: [],
  color: [],
  min: "",
  max: "",
  id: "",
  productName: "",
};

function ProductFilter() {
  const { updateFilters, updatePageConfig, queryString } =
    useContext(ProductFilterContext);
  const [filters, setFilters] = useState(defaultFilters);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filters);
    const joinedfilters = {
      ...filters,
      category: filters.category.join(","),
      subcategory: filters.subcategory.join(","),
      sizes: filters.sizes.join(","),
      brand: filters.brand.join(","),
      color: filters.color.join(","),
    };
    updateFilters(joinedfilters);
    updatePageConfig({ pageIndex: 1, pageSize: 10 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    updateFilters(defaultFilters);
    updatePageConfig({ pageIndex: 1, pageSize: 10 });
  };


  return (
    <Paper sx={{ p: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl sx={{width:1}}>
              <InputLabel>Categories</InputLabel>
              <Select
                multiple
                value={filters.category}
                onChange={handleInputChange}
                input={<OutlinedInput label="Categories" name="category" />}
              >
                {productConfig.categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl sx={{width:1}}>
              <InputLabel>Subcategories</InputLabel>
              <Select
                multiple
                value={filters.subcategory}
                onChange={handleInputChange}
                input={<OutlinedInput label="Subcategories" name="subcategory" />}
              >
                {productConfig.subcategories.map((subcategory) => (
                  <MenuItem key={subcategory.value} value={subcategory.value}>
                    {subcategory.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl sx={{width:1}}>
              <InputLabel>Sizes</InputLabel>
              <Select
                multiple
                value={filters.sizes}
                onChange={handleInputChange}
                input={<OutlinedInput label="Sizes" name="sizes" />}
              >
                {productConfig.sizes.map((size) => (
                  <MenuItem key={size.value} value={size.value}>
                    {size.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl sx={{width:1}}>
              <InputLabel>Brands</InputLabel>
              <Select
                multiple
                value={filters.brand}
                onChange={handleInputChange}
                input={<OutlinedInput label="Brands" name="brand" />}
              >
                {productConfig.brands.map((brand) => (
                  <MenuItem key={brand.value} value={brand.value}>
                    {brand.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl sx={{width:1}}>
              <InputLabel>Colors</InputLabel>
              <Select
                multiple
                value={filters.color}
                onChange={handleInputChange}
                input={<OutlinedInput label="Colors" name="color" />}
              >
                {productConfig.colors.map((color) => (
                  <MenuItem key={color.value} value={color.value}>
                    {color.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Min Price"
              name="min"
              type="number"
              value={filters.min}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Max Price"
              name="max"
              type="number"
              value={filters.max}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product ID"
              name="id"
              type="number"
              value={filters.id}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={filters.productName}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Filter
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              fullWidth
              onClick={resetFilters}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default ProductFilter;
