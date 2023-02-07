import jwtInterceptor from '../../services/jwtInterceptor';
import React, { useContext, useEffect, useState } from 'react';
import '@fontsource/public-sans';
import AuthContext from '../AuthContext';
import Grid from '@mui/joy/Grid';
import { Link, Theme, Typography } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import Home from '@mui/icons-material/Home';
import { List, ListItem, ListItemButton, ListItemDecorator} from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import helpers from '../../services/helpers';


interface MenuSidebarProps {
    page: string;
}

interface UserData {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    creationDate: Array<number>;
}




function MenuSidebar({ page }: MenuSidebarProps) {

    const primaryFont = (theme: Theme) => ({
        fontFamily: 'Public Sans',
        color: theme.palette.ems.primaryFont,
    })
    
    const secondaryFont = (theme: Theme) => ({
        fontFamily: 'Public Sans',
        color: theme.palette.ems.secondaryFont,
    })
    
    const menuList = (theme: Theme) => ({
        borderRadius: 'sm',
        maxWidth: 300,
        backgroundColor: theme.palette.ems.surface,
        color: theme.palette.ems.primaryFont,
    })

    const menuItem = (theme: Theme) => ({
        my: 1,
    })
    
    const menuItemButton = (theme: Theme) => ({
        color: theme.palette.ems.primaryFont,
        "&:hover": {
            backgroundColor: theme.palette.ems.primary,
            color: theme.palette.ems.primaryFont,
            borderRadius: 'sm',
        }
    })

    const menuItemButtonActive = (theme: Theme) => ({
        color: theme.palette.ems.primaryFont,
        backgroundColor: theme.palette.ems.primary,
        borderRadius: 'sm',
        "&:hover": {
            backgroundColor: theme.palette.ems.primary,
            color: theme.palette.ems.primaryFont,
            borderRadius: 'sm',
        }
    })
    
    const menuIcon = (theme: Theme) => ({
        color: theme.palette.ems.primaryFont,
    })

    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState<UserData>({} as UserData);

    const navigate = useNavigate()

    useEffect(() => {

        let userToken = localStorage.getItem("userToken")
        if (userToken) {
            let accessToken = JSON.parse(userToken).access_token;
        
            jwtInterceptor.get("/api/user/" + "pb1497", {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            })
            .catch((onrejectionhandled) => {
                console.log("on rejection handled")
                if (onrejectionhandled.response.status === 401) {
                    console.log("Error with enphase auth. Please re-authenticate.")
                    helpers.refreshPage()
                }
            })
            .then((userEndpointResponse: any) => {
                setUserData(userEndpointResponse.data)
            });
        }
        else logout()
    }, [])

  return (
    <Grid container m={1}>
        <Grid container xs={12}>
            {user ? (
                <Grid container alignItems="center" xs={12} mt={1}>
                    <Grid container xs={3} justifyContent="center">
                        <Avatar color="primary" variant='soft' />
                    </Grid>
                    <Grid container xs={6} justifyContent="flex-start">
                        <Grid xs={12}>
                            <Typography level="body2" sx={primaryFont}>{userData.firstName} {userData.lastName}</Typography>
                        </Grid>
                        <Grid xs={12}>
                            <Typography level="body3" sx={secondaryFont}>{userData.userName}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container xs={3} justifyContent="center">
                        <Grid xs={6}>
                            <Link><SettingsIcon /></Link>
                        </Grid>
                        <Grid xs={6}>
                            <Link onClick={() => {logout()}}><LogoutIcon /></Link>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Typography level="h1" color="neutral">Not logged in</Typography>
            )}
        </Grid>
        <Grid container xs={12} p={2}>
            <List
                size='md'
                sx={menuList}
            >
                <ListItem sx={menuItem}>
                    <ListItemButton 
                        sx={page=="home" ? menuItemButtonActive : menuItemButton}
                        onClick={() => navigate("/")}
                    >
                        <ListItemDecorator sx={menuIcon}>
                            <Home />
                        </ListItemDecorator>
                        Home
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{menuItem}}>
                    <ListItemButton 
                        sx={page=="enphase-auth" ? menuItemButtonActive : menuItemButton}
                        onClick={() => navigate("/enphase-auth")}
                    >
                        <ListItemDecorator sx={menuIcon}>
                            <SyncLockIcon />
                        </ListItemDecorator>
                        Enphase Auth
                    </ListItemButton>
                </ListItem>
            </List>
        </Grid>
    </Grid>
  )
}
export default MenuSidebar;