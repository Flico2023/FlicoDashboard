import React from 'react';
import { Grid } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />
      <Grid container sx={{height:"100%"}}>
        {/* Burda şuan taşmalar sonucu 3 noktalı görünen şeyler var
        ilerde burayı gridden çıkarabiliriz belki */}
        <Grid item xs={1} md={2} lg={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={11} md={10} lg={11}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}