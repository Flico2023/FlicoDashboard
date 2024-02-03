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
  import React, { Fragment, useEffect } from "react";
  import { Controller, useForm, useFieldArray } from "react-hook-form";
  import { DevTool } from "@hookform/devtools";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  import { toast } from "react-toastify";
  import axios from "axios";
  import { useParams } from "react-router-dom";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { faqDefault } from "../data/faqDefault";
  import { faqSchema } from "../data/faqSchema";
import { categories } from "../data/categories";

  
  export default function ClosetForm() {
    const queryClient = useQueryClient();
    const params = useParams();
  
    const {
      data: faq,
      isLoading: formDataIsLoading,
      error: faqError,
    } = useQuery({
      queryKey: ["faq", params.id],
      queryFn: async () => {
        const response = await axios.get(
          //!FIXME: burası da değişecek
          `http://localhost:5059/api/faqs/${params.id}`
        );
        
        return response.data.data;
      },
      enabled: !!params.id,
    });
  
    useEffect(() => {
      if (faq) {
          resetToInitialData();
      }
    }, [faq]);
  
    const { mutate: submitFaq, submitIsLoading } = useMutation({
      mutationFn: async ({ body }) => {
        const parameter = params.id ? params.id : "";
        const method = params.id ? "PUT" : "POST";
        const response = await axios({
          url: `http://localhost:5059/api/faqs/${parameter}`,
          method,
          data: body,
        });
        return response.data;
      },
      onSuccess: () => {
        toast.success("FAQ submitted successfully");
        queryClient.invalidateQueries({ queryKey: ["faqs"] });
      },
  
      onError: (error) => {
        //!Burayı değiştiricez err.resp.data filan olabilir
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
      watch,
    } = useForm({
      defaultValues: faqDefault,
      resolver: yupResolver(faqSchema),
    });
  
  
    const clearForm = () => {
      reset();
    };
  
    const resetToInitialData = () => {
      console.log(faq)
      setValue("question", faq.question);
      setValue("answer", faq.answer);
      setValue("category", faq.category);

    };
  
    const onReset = () => {
      if (faq) {
        resetToInitialData();
      } else {
        clearForm();
      }
    };
  
    const onSubmitHandler = (data) => {
      console.log(data);
        submitFaq({ body: data });
    };
  
    return (
      <Box sx={{ p: 3, mt: 1, width: "100%" }}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Stack spacing={2}>
          <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category?.message}
                >
                  <InputLabel>Kategori</InputLabel>
                  <Select label="Kategori" fullWidth {...field} placeholder="Lütfen İngilizce olarak girin">
                    {categories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))
                    }
                  </Select>
                  <FormHelperText>{errors.category?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="question"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Soru"
                  fullWidth
                  placeholder="Lütfen İngilizce olarak girin"
                  {...field}
                  error={!!errors.question}
                  helperText={errors?.question?.message}
                />
              )}
            />
  
            <Controller
              name="answer"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Cevap"
                  variant="outlined"
                    multiline
                  fullWidth
                  placeholder="Lütfen İngilizce olarak girin"
                  {...field}
                  error={!!errors.answer}
                  helperText={errors?.answer?.message}
                  minRows={5}
                />
              )}
            />

  
  
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                      variant="contained"
                      color="primary"
                      //fullWidth
                      type="submit"
                      disabled={submitIsLoading || !!faqError}
                      sx={{width: "50%"}}
                  >
                      {submitIsLoading ? "Gönderiliyor..." : "Kaydet"}
                  </Button>
                  <Button
                      variant="outlined"
                      color="primary"
                      type="button"
                      onClick={onReset}
                      sx={{width: "50%"}}
                  >
                      Reset
                  </Button>
              </Stack>
  
          </Stack>
        </form>
        <DevTool control={control} />
      </Box>
    );
  }
  