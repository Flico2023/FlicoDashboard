import {
    Paper, Box,
    TextField,
    Stack,
    Button
} from "@mui/material";
import React, { useEffect } from "react";
import { center } from "../../../utils/muiStyles";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

export function AirportForm() {
    const queryClient = useQueryClient();
    const params = useParams();

    const { data: airport,isLoading:formDataIsLoading,error } = useQuery({
        queryKey: ["airport", params.id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/airports/${params.id}`)
            return response.data;
        },
        enabled: !!params.id,
    });

    useEffect(() => {
        if (airport) {
            setValue("airportName", airport.airportName);
            setValue("country", airport.country);
            setValue("city", airport.city);
            setValue("numOfClosets", `${airport.numOfClosets}`);
        }
    }, [airport]);


    const {
        register, control, handleSubmit, formState: { errors }, reset, setValue
    } = useForm({
        defaultValues: {
            airportName: "",
            country: "",
            city: "",
            numOfClosets: "",//burası integer da gelebilir dikkat
        },
    });

    const { mutate: submitAirport, isLoading } = useMutation({
        mutationFn: async ({ body }) => {

            const parameter = params.id ? params.id : "";
            const method = params.id ? "PUT" : "POST";
            const response = await axios({
                url: `http://localhost:3000/airports/${parameter}`,
                method,
                data: body,
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Airport created successfully");
            queryClient.invalidateQueries({ queryKey: ["airports"] });
            if (!params.id) {
                reset()
            }
        },
        onError: (error) => {
            console.log(error);
            toast.error(error);
        },
    });

    const onSubmitHandler = (data) => {
        const body = { ...data, numOfClosets: parseInt(data.numOfClosets) };

        submitAirport({ body });
    };


    return (
        <Paper sx={{ p: 3, mt: 3, width: "100%" }}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Stack spacing={2}>
                    <TextField
                        error={!!errors.airportName}
                        fullWidth
                        id="airport-name"
                        label="Airport Name"
                        defaultValue=""
                        helperText={errors.airportName?.message}
                        {...register("airportName", {
                            required: "Airport name is required",
                            validate: {
                                empty: (value) => value.trim() !== "" || "Airport name is required",
                            },
                        })} 
                        InputLabelProps={params.id ? { shrink: true } : null}
                        />
                    <TextField
                        error={!!errors.country}
                        fullWidth
                        id="country"
                        label="Country"
                        defaultValue=""
                        helperText={errors.country?.message}
                        {...register("country", {
                            required: "Country is required",
                            validate: {
                                empty: (value) => value.trim() !== "" || "Country is required",
                            },
                        })} 
                        InputLabelProps={params.id ? { shrink: true } : null}/>
                    <TextField
                        error={!!errors.city}
                        fullWidth
                        id="city"
                        label="City"
                        defaultValue=""
                        helperText={errors.city?.message}
                        {...register("city", {
                            validate: {
                                empty: (value) => value.trim() !== "" || "City is required",
                            },
                        })} 
                        InputLabelProps={params.id ? { shrink: true } : null}/>
                    <TextField
                        type="number"
                        error={!!errors.numOfClosets}
                        fullWidth
                        id="num-of-closets"
                        label="Number of Closets"
                        defaultValue=""
                        helperText={errors.numOfClosets?.message}
                        {...register("numOfClosets", {
                            validate: {
                                positiveInteger: (value) => {
                                    if (value.startsWith("0") || value.startsWith("-")) {
                                        return "Please enter a valid integer.";
                                    }

                                    const parsedValue = parseInt(value);

                                    if (isNaN(parsedValue)) {
                                        return "Please enter a valid integer.";
                                    }

                                    if (parsedValue < 1) {
                                        return "Number of closets must be a positive integer.";
                                    }

                                    return true;
                                },
                                empty: (value) => value.trim() !== "" || "Number of closets is required",
                            },
                        })} 
                        InputLabelProps={params.id ? { shrink: true } : null}/>
                    {/** DAHA SONRA DOLAP SAYISI DEĞİŞİNCE ARKA TARAFTA SADECE BOŞ OLAN DOLAPLAR FİLAN DEĞİŞMESİ LAZIM
             * AKTİFDOLAP SAYISI DA GÖSTERİLEBİLİR İELRİDE. BACKENDLE Bİ KONUŞMAK LAZIM
             */}
                    <Box sx={{ ...center }}>
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                    </Box>
                </Stack>
            </form>
            <DevTool control={control} />
        </Paper>
    );
}
