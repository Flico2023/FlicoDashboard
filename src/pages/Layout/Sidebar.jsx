/* eslint-disable react/prop-types */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import AirportIcon from "@mui/icons-material/FlightTakeoff";
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CampaignIcon from '@mui/icons-material/Campaign';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { Box, ListItemIcon, MenuItem, MenuList, Stack, Typography } from "@mui/material";


export default function Sidebar() {

    return (
        <Box boxShadow={2} sx={{height:"100%"}}>
            <MenuList>
                <Stack spacing={0.5} padding={1}>
                <SidebarItem to="/airports" icon={<AirportIcon />}>
                    Airports
                </SidebarItem>
                <SidebarItem to="/warehouses" icon={<WarehouseIcon />}>
                    Warehouses
                </SidebarItem>
                <SidebarItem to="/flicostuff" icon={<EngineeringIcon />}>
                    Flico Stuff
                </SidebarItem>
                <SidebarItem to="/products" icon={<CheckroomOutlinedIcon />}>
                    Products
                </SidebarItem>
                <SidebarItem to="/outsources" icon={<LocalLaundryServiceIcon />}>
                    Outsources
                </SidebarItem>
                <SidebarItem to="/outproducts" icon={<AirportShuttleIcon />}>
                    Out Products
                </SidebarItem>
                <SidebarItem to="/users" icon={<PersonIcon />}>
                    Users
                </SidebarItem>
                <SidebarItem to="/closets" icon={<AccountBalanceWalletIcon />}>
                    Closets
                </SidebarItem>
                <SidebarItem to="/campaigns" icon={<CampaignIcon />}>
                    Campaigns
                </SidebarItem>
                <SidebarItem to="/orders" icon={<ShoppingBagIcon />}>
                    Orders
                </SidebarItem>


                <Typography>buraya satışlar ve analitikler hakkında bi şeyler de eklemek lazım. Toplam gelir gider filan</Typography>
                </Stack>
            </MenuList>
        </Box>
    );
}
/**
 * 
 * @param {object} props 
 * @property {string} props.to
 * @property {React.ReactNode} props.icon
 */
function SidebarItem(props) {
    const location = useLocation();
    const matches = location.pathname.includes(props.to);
  
    const itemStyle = {
      backgroundColor: matches  ? 'primary.main' : 'transparent',
      p: 1,
      borderRadius: 1.15,      
    };

    const itemElementsStyle = {
        color: matches? 'white' : 'text.secondary',
    }
    
  
    return (
      <Link to={props.to} style={{textDecoration: 'none'}} >
        <MenuItem sx={itemStyle} >
          <ListItemIcon sx={itemElementsStyle} >{props.icon}</ListItemIcon>
          <Typography noWrap sx={itemElementsStyle} >
            {props.children}
          </Typography>
        </MenuItem>
      </Link>
    );
  }

