import { Box, ListItemIcon, MenuItem, MenuList, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import AirportIcon from "@mui/icons-material/FlightTakeoff";
import { Height } from "@mui/icons-material";
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CampaignIcon from '@mui/icons-material/Campaign';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';

export default function Sidebar() {
    return (
        <Box boxShadow={2} sx={{height:"100%"}}>
            <MenuList>
                <SidebarItem to="/airports" icon={<AirportIcon />}>
                    Airports
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
            </MenuList>
        </Box>
    );
}

function SidebarItem(props) {
    return (
        <NavLink
            to={props.to}
            style={{ textDecoration: "none" }}
            sx={{
                "&.active-link": {
                    backgroundColor: "lightblue",
                },
                
            }}
            
        >
            <MenuItem sx={{p:1.5}}>
                <ListItemIcon>{props.icon}</ListItemIcon>
                {/* BURDA YANA TAŞMAYI ENGELLEYİP AŞAĞI GEÇİRMEYE ÇALIŞ nowrap sadece taşmayı engelliyor*/}
                <Typography noWrap color="textPrimary">{props.children}</Typography>
            </MenuItem>
        </NavLink>
    );
}
