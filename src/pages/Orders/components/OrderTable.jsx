import { Box, Typography, Card, CardContent, Grid, Divider, Button } from '@mui/material';
import { useContext } from 'react';

import axios from 'axios';
import { OrderFilterContext } from '../OrderFilterContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function OrderTable() {
    const { queryString } = useContext(OrderFilterContext);
    const queryClient = useQueryClient();

    const { data: results } = useQuery(["orders", queryString], async () => {
        const response = await axios.get(
            `http://localhost:5059/api/order${queryString}`
        );
        console.log(response.data.data.orders);
        return response.data.data.orders;
    });

    const {mutate: changeStatus} = useMutation({
        mutationFn: async ({id,status}) => {
            const response = await axios.put(
                `http://localhost:5059/api/order/${id}`,
                {status: status}
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Order status changed successfully");
            queryClient.invalidateQueries(["orders"]);
        },
        onError: () => {
            toast.error("Failed to change order status");
        }

    })

    return (
        <Box p={4}>
            <Typography variant='h3' mb={4}>Orders</Typography>
            <Grid container spacing={3}>
                {results?.map((order) => (
                    <Grid item xs={12} md={6} key={order.order.id}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5' gutterBottom>Order ID: {order.order.orderID}</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>Status:</strong> {order.order.orderStatus}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>User Id:</strong> {order.order.userID}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>Total Price:</strong> ${order.order.totalPrice}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>Start Date:</strong> {new Date(order.order.startDate).toLocaleDateString()}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>End Date:</strong> {new Date(order.order.endDate).toLocaleDateString()}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>Created At:</strong> {new Date(order.order.createdAt).toLocaleDateString()}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>Closet No:</strong> {order.order.closetNo}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>Name on Cart:</strong> {order.order.nameOnCart}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>Card Number:</strong> {order.order.cardNumber}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>Expiry Date:</strong> {order.order.expiryDate}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>CVV:</strong> {order.order.cvv}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>Airport:</strong> {order.airport.airportName}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'><strong>City:</strong> {order.airport.city}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant='body1'><strong>Closet Password:</strong> {order.order.closetPassword}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 2 }} />
                                <Box>
                                    <Typography variant='h6' gutterBottom>Order Products</Typography>
                                    {order.orderProducts.map((op) => (
                                        <Card key={op.product.productID} variant="outlined" sx={{ mb: 2 }}>
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <img src={op.product.imagePath} alt="product" style={{ width: '100%' }} />
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography variant='body1'><strong>Product Name:</strong> {op.product.productName}</Typography>
                                                        <Typography variant='body1'><strong>Category:</strong> {op.product.category}</Typography>
                                                        <Typography variant='body1'><strong>SubCategory:</strong> {op.product.subcategory}</Typography>
                                                        <Typography variant='body1'><strong>Brand:</strong> {op.product.brand}</Typography>
                                                        <Typography variant='body1'><strong>Price:</strong> ${op.product.price}</Typography>
                                                        <Typography variant='body1'><strong>Color:</strong> {op.product.color}</Typography>
                                                        <Typography variant='body1'><strong>Size:</strong> {op.size}</Typography>
                                                        <Typography variant='body1'><strong>Amount:</strong> {op.amount}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Typography>Change status to:</Typography>
                                <Button onClick={()=>{changeStatus({id:order.order.id,status:"Progress"})}}>Progress</Button>
                                <Button onClick={()=>{changeStatus({id:order.order.id,status:"Closet"})}}>Closet</Button>
                                <Button onClick={()=>{changeStatus({id:order.order.id,status:"Customer"})}}>Customer</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
