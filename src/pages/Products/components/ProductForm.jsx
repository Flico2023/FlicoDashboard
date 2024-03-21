import {
  Box,
  TextField,
  Stack,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  FormHelperText,
  Container,
  Alert,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../data/productSchema";
import { productDefault } from "../data/productDefault";
import { DevTool } from "@hookform/devtools";
import { productConfig } from "../data/productConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function ProductForm() {

  const queryClient = useQueryClient();
  const params = useParams();  
  const navigate = useNavigate();

  //! REACT QUERY PARTS
  const {
    data: product,
    isLoading: productDataIsLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5059/api/product/${params.id}`
      );
        console.log(response.data)
      return response.data;
    },
    enabled: !!params.id,
  });

  const { mutate: submitProduct, error:submitError } = useMutation({
    mutationFn: async ({ body }) => {
      const parameter = params.id ? params.id : "";
      const method = params.id ? "PUT" : "POST";
      const response = await axios({
        url: `http://localhost:5059/api/product/${parameter}`,
        method,
        data: body,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      navigate("/products");
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message || "An error occured");
    },
  });

  //stock detailler için warehouse bilgileri
  const {
    data: warehouses,

  } = useQuery(["warehouse"], async () => {
    const response = await axios.get(`http://localhost:5059/api/warehouse`);

    return response.data.data;
  });

  //! HOOKFORM PARTS
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    //resolver: yupResolver(productSchema),
    defaultValues: productDefault,
  });


  useEffect(() => {
    if (product) {
      resetToInitialData();
    }
  }, [product]);

  function resetToInitialData(){
    setValue("product.productName", product.productName);
    setValue("product.category", product.category);
    setValue("product.subcategory", product.subcategory);
    setValue("product.brand", product.brand);
    setValue("product.price", product.price);
    setValue("product.productDetail", product.productDetail);
    setValue("product.color", product.color);
    setValue("product.imagePath", product.imagePath);
    setValue("stockDetails", product.stockDetails);
  }
    
  

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stockDetails", //arrayi burda belirledik
  });

  const appendVariation = () => {
    append({
      size: "",
      variationAmount: "",
      variationActiveAmount: "",
      warehouseID: "",
    });
  };

  const onReset = () => {
    if (product) {
      resetToInitialData();
    } else {
      clearForm();
    }
  };

  const clearForm = () => {
    reset();
  };

  //! HOOKFORM PARTS END

  const onSubmit = (data) => {
    const body = {...data};
    console.log(data);
    submitProduct({ body: data });
  };



  return (
    <Container sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          {submitError && (
            <Alert severity="error">{submitError.response.data.message || "An error occured"}</Alert>
          )}
        </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="product.productName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Name"
                  fullWidth
                  error={!!errors.product?.productName}
                  helperText={errors.product?.productName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="product.category"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.product?.category}
                  helperText={errors.product?.category?.message}
                >
                  <InputLabel>Category</InputLabel>
                  <Select label="Category" fullWidth {...field}>
                    <MenuItem value="">Select a category</MenuItem>
                    {productConfig.categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.value}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.product?.category?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="product.subcategory"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.product?.subcategory}
                  helperText={errors.product?.subcategory?.message}
                >
                  <InputLabel>Subcategory</InputLabel>
                  <Select label="Subcategory" fullWidth {...field}>
                    <MenuItem value="">Select a subcategory</MenuItem>
                    {productConfig.subcategories.map((subCategory) => (
                      <MenuItem
                        key={subCategory.value}
                        value={subCategory.value}
                      >
                        {subCategory.value}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.product?.subcategory?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="product.brand"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.product?.brand}
                  helperText={errors.product?.brand?.message}
                >
                  <InputLabel>Brand</InputLabel>
                  <Select label="Brand" fullWidth {...field}>
                    <MenuItem value="">Select a brand</MenuItem>
                    {productConfig.brands.map((brand) => (
                      <MenuItem key={brand.value} value={brand.value}>
                        {brand.value}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.product?.brand?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="product.price"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  fullWidth
                  type="number"
                  error={!!errors.product?.price}
                  helperText={errors.product?.price?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="product.color"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.product?.color}
                  helperText={errors.product?.color?.message}
                >
                  <InputLabel>Color</InputLabel>
                  <Select label="Color" fullWidth {...field}>
                    <MenuItem value="">Select a color</MenuItem>
                    {productConfig.colors.map((color) => (
                      <MenuItem key={color.value} value={color.value}>
                        {color.value}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.product?.color?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="product.imagePath"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image Path"
                  fullWidth
                  error={!!errors.product?.imagePath}
                  helperText={errors.product?.imagePath?.message}
                />
              )}
            />
          </Grid>
       
        <Grid item xs={12}>
          <Controller
            name="product.productDetail"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Detail"
                fullWidth
                multiline
                rows={4}
                error={!!errors.product?.productDetail}
                helperText={errors.product?.productDetail?.message}
              />
            )}
          />
        </Grid> </Grid>

        <Grid item xs={12} mt={4}>
          <Typography variant="h5" gutterBottom>
            Stock Details (Ekleme ve çıkarma işlemnde bug var)
          </Typography>
          {fields.map((item, index) => (
            <div key={item.id}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name={`stockDetails.${index}.size`}
                    control={control}
                    defaultValue={item.size}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.stockDetails?.[index]?.size}
                        helperText={errors.stockDetails?.[index]?.size?.message}
                      >
                        <InputLabel>Size</InputLabel>
                        <Select label="Size" fullWidth {...field}>
                          {["XS", "S", "M", "L", "XL", "XXL"].map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {errors.stockDetails?.[index]?.size?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name={`stockDetails.${index}.variationAmount`}
                    control={control}
                    defaultValue={item.variationAmount}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Variation Amount"
                        fullWidth
                        type="number"
                        error={!!errors.stockDetails?.[index]?.variationAmount}
                        helperText={
                          errors.stockDetails?.[index]?.variationAmount?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name={`stockDetails.${index}.variationActiveAmount`}
                    control={control}
                    defaultValue={item.variationActiveAmount}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Variation Active Amount"
                        fullWidth
                        type="number"
                        error={
                          !!errors.stockDetails?.[index]?.variationActiveAmount
                        }
                        helperText={
                          errors.stockDetails?.[index]?.variationActiveAmount
                            ?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name={`stockDetails.${index}.warehouseID`}
                    control={control}

                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.stockDetails?.[index]?.warehouseID}
                        helperText={
                          errors.stockDetails?.[index]?.warehouseID?.message
                        }
                      >
                        <InputLabel>Warehouse</InputLabel>
                        <Select label="Warehouse" fullWidth {...field}>
                          <MenuItem value="">Select a warehouse</MenuItem>
                          {warehouses?.map((warehouse) => (
                            <MenuItem
                              key={warehouse.warehouseID}
                              value={warehouse.warehouseID}
                            >
                              {warehouse.warehouseName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {errors.stockDetails?.[index]?.warehouseID?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                type="button"
                color="error"
                onClick={() => remove(item.id)}
                sx={{ mb: 1 }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={appendVariation}>
            Add Stock Detail
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={onReset}
          >
            Clear
          </Button>
        </Grid>
      </form>
      <DevTool control={control}></DevTool>
    </Container>
  );
}

export default ProductForm;
