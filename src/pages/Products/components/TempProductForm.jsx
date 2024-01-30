import {
  Paper,
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
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { center } from "../../../utils/muiStyles";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { productConfig } from "../data/productConfig";
import { flexStart } from "../../../utils/muiStyles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../data/productSchema";
import { productDefault } from "../data/productDefault";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export function ProductForm() {
  const [imagePreview, setImagePreview] = useState(null);

  const queryClient = useQueryClient();
  const params = useParams();

  const {
    data: product,
    isLoading: formDataIsLoading,
    error,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/product/${params.id}`
      );
      return response.data;
    },
    enabled: !!params.id,
  });

  useEffect(() => {
    if (product) {
      //setValue("airportName", airport.airportName);
    }
  }, [product]);

  const { mutate: submitProduct, isLoading } = useMutation({
    mutationFn: async ({ body }) => {
      const parameter = params.id ? params.id : "";
      const method = params.id ? "PUT" : "POST";
      const response = await axios({
        url: `http://localhost:5059/api/product/${parameter}`,
        method,
        data: body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully");
      //queryClient.invalidateQueries({ queryKey: ["products"] });
      if (!params.id) {
        reset();
      }
    },

    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: productDefault,
    resolver: yupResolver(productSchema),
  });

  const category = watch("category");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stockDetail", //arrayi burda belirledik
  });

  const appendVariation = () => {
    append({
      size: "",
      variationAmount: "",
      variationActiveAmount: "",
      warehouseID: "",
    });
  };

  const removeVariation = (index) => {
    remove(index);
  };

  const onSubmitHandler = (data) => {
    const { image, stockDetail, ...rest } = data;

    console.log(data);

    const formData = new FormData();
    formData.append("image", image);

    stockDetail.forEach((item, index) => {
      for (const key in item) {
        formData.append(`stockDetail[${index}].${key}`, item[key]);
      }
    });

    for (const key in rest) {
      formData.append(key, rest[key]);
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    submitProduct({ body: formData });
  };

  const onError = (errors) => {
    console.log(errors);
  };

  //! Backendci bunu nasıl ayarlıcak acaba, tam biz burdan gönderirken sipariş olrsa ve fazladan 1 ürün eklenicek gibi

  // let image = getValues("photo");

  return (
    <Box sx={{ p: 3, mt: 1, width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmitHandler, onError)}>
        <Stack spacing={4}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5">General Info</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Photo of product</Typography>
              {imagePreview ? (
                <img src={imagePreview} alt="" style={{ width: "250px" }} />
              ) : (
                <Box
                  sx={{ width: "200px", border: 1, height: "250px", ...center }}
                >
                  <AddPhotoAlternateIcon />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="image"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Button component="label" variant="contained" sx={{ mb: 1 }}>
                    Upload Image
                    <input
                      type="file"
                      id="image"
                      hidden
                      {...field}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        console.log(file);

                        // FileReader ile dosyanın içeriğini al
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          // Gerçek dosya içeriğini state'e set et
                          setImagePreview(reader.result);
                        };
                        reader.readAsDataURL(file);

                        onChange(file);
                      }}
                      accept=".jpg, .png"
                      max={1}
                    />
                  </Button>
                )}
              />

              <Typography color={"error"} mb={2}>
                {errors?.photo?.message}
              </Typography>
            </Grid>

            {/* brand */}
            <Grid item xs={12}>
              <Controller
                name="brand"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errors.brand}
                    helperText={errors.brand?.message}
                  >
                    <InputLabel>Brand</InputLabel>
                    <Select {...field} label="Gender">
                      <MenuItem value="">Select a Brand</MenuItem>
                      {productConfig.brands.map((brand) => (
                        <MenuItem key={brand.value} value={brand.value}>
                          {brand.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.brand?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            {/* name */}
            <Grid item xs={12}>
              <Controller
                name="productName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Product Name"
                    fullWidth
                    error={!!errors.productName}
                    helperText={errors.productName?.message}
                  />
                )}
              />
            </Grid>

            {/* category */}
            <Grid item xs={6}>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select {...field} name="category" label="Category">
                      <MenuItem value="category1">Select a category </MenuItem>
                      {productConfig.categories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.category?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            {/* subcategory */}
            <Grid item xs={6}>
              <Controller
                name="subcategory"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.subcategory}>
                    <InputLabel>Subcategory</InputLabel>
                    <Select {...field} name="subcategory" label="Bubcategory">
                      <MenuItem value="category1">
                        Select a subcategory{" "}
                      </MenuItem>
                      {productConfig.subcategories[category].map(
                        (subcategory) => (
                          <MenuItem
                            key={subcategory.value}
                            value={subcategory.value}
                          >
                            {subcategory.label}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    <FormHelperText>
                      {errors.subcategory?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            {/* gender */}
            <Grid item xs={6}>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select {...field} label="Gender">
                      <MenuItem value="man">Man</MenuItem>
                      <MenuItem value="woman">Woman</MenuItem>
                      {/* <MenuItem value="unisex">Unisex</MenuItem> */}
                    </Select>
                    <FormHelperText>{errors.gender?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            {/* price */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="price"
                label="Price"
                defaultValue=""
                {...register(`price`, { valueAsNumber: true })}
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                // InputLabelProps={{shrink: params.id ? true : undefined}}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="color"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth error={!!errors?.color}>
                  <InputLabel id="color">Color</InputLabel>
                  <Select
                    labelId="color"
                    label="Color"
                    {...field}
                    disabled={false}
                    name="color"
                  >
                    <MenuItem value="">Select a color</MenuItem>
                    {productConfig.colors.map((color) => (
                      <MenuItem key={color.value} value={color.value}>
                        <Box sx={{ ...flexStart, gap: 1 }}>
                          <Box
                            sx={{
                              backgroundColor: color.value,
                              borderRadius: "50%",
                              display: "inline-block",
                            }}
                            width={16}
                            height={16}
                          />
                          {color.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors?.color?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          {/* stock details */}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5" mb={1}>
                Variations{" "}
                <IconButton onClick={appendVariation}>
                  {" "}
                  <AddCircleOutlineIcon color="primary" />{" "}
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                {fields.map((_, index) => {
                  return (
                    <Grid container key={_.id} fullWidth spacing={1}>
                      <Grid item xs={12} lg={0.5}>
                        <IconButton onClick={() => removeVariation(index)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={2}>
                        <Controller
                          name={`stockDetail.${index}.size`}
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <FormControl
                              fullWidth
                              error={!!errors.stockDetail?.[index]?.color}
                              size="small"
                            >
                              <InputLabel id={`stockDetail-${index}-size`}>
                                Size
                              </InputLabel>
                              <Select
                                labelId={`stockDetail-${index}-size`}
                                label="Size"
                                {...field}
                                disabled={false}
                                name={`stockDetail.${index}.size`}
                              >
                                <MenuItem value="">Select a size</MenuItem>
                                {productConfig?.sizes.map((size, i) => (
                                  <MenuItem key={i} value={size.value}>
                                    {size.label}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText>
                                {errors.stockDetail?.[index]?.size?.message}
                              </FormHelperText>
                            </FormControl>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={2}>
                        <TextField
                          error={!!errors.stockDetail?.[index]?.variationAmount}
                          helperText={
                            errors.stockDetail?.[index]?.variationAmount
                              ?.message
                          }
                          fullWidth
                          id={`stockDetail-${index}-variationAmount`}
                          label="Amount"
                          defaultValue=""
                          type="number"
                          size="small"
                          {...register(`stockDetail.${index}.variationAmount`, {
                            valueAsNumber: true,
                          })}
                          // InputLabelProps={{shrink: params.id ? true : undefined}}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={2}>
                        <TextField
                          error={
                            !!errors.stockDetail?.[index]?.variationActiveAmount
                          }
                          fullWidth
                          type="number"
                          id={`stockDetail-${index}-currentAmount`}
                          label="Current Amount"
                          defaultValue=""
                          helperText={
                            errors.stockDetail?.[index]?.variationActiveAmount
                              ?.message
                          }
                          size="small"
                          name={`stockDetail.${index}.variationActiveAmount`}
                          {...register(
                            `stockDetail.${index}.variationActiveAmount`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          // InputLabelProps={{shrink: params.id ? true : undefined}}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={3}>
                        <Controller
                          name={`stockDetail.${index}.warehouseID`}
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <FormControl
                              fullWidth
                              error={!!errors.stockDetail?.[index]?.warehouseID}
                              size="small"
                            >
                              <InputLabel
                                id={`stockDetail-${index}-warehouseID`}
                              >
                                Warehouse
                              </InputLabel>
                              <Select
                                labelId={`stockDetail-${index}-warehouseID`}
                                label="Warehouse"
                                {...field}
                                disabled={false}
                                name={`stockDetail.${index}.warehouseID`}
                              >
                                <MenuItem value="">Select a warehouse</MenuItem>
                                <MenuItem value="warehouse1">
                                  Warehouse 1
                                </MenuItem>
                                <MenuItem value={3}>Warehouse 2</MenuItem>
                              </Select>
                              <FormHelperText>
                                {
                                  errors.stockDetail?.[index]?.warehouseID
                                    ?.message
                                }
                              </FormHelperText>
                            </FormControl>
                          )}
                        />
                      </Grid>
                    </Grid>
                  );
                })}
              </Stack>
            </Grid>
          </Grid>

          {/* details */}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5" mb={1}>
                Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="productDetail"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    error={!!errors.productDetail}
                    helperText={errors.productDetail?.message}
                    minRows={5}
                    {...field}
                    label="Details"
                    multiline
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </form>
      <DevTool control={control} />
    </Box>
  );
}
