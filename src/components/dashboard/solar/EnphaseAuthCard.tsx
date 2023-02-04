import React, { useEffect, useState } from 'react';
import jwtInterceptor from '../../../services/jwtInterceptor';
import Grid from '@mui/joy/Grid';
import { Typography, Button, Theme, Link } from '@mui/joy';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

interface LoginStatusData {
    isUserLoggedIntoEnphase: boolean;
}

const notLoggedInStyles = (theme: Theme) => ({
    backgroundColor: theme.palette.ems.surface,
    borderColor: theme.palette.ems.danger,
    borderStyle: 'solid',
    borderRadius: 'sm',
    p: 2,
})

const loggedInStyles = (theme: Theme) => ({
    backgroundColor: theme.palette.ems.surface,
    borderColor: theme.palette.ems.success,
    borderStyle: 'solid',
    borderRadius: 'sm',
    p: 2,
})

function EnphaseAuthCard() {

    const LoginStatusDefaultValues: LoginStatusData = {
        isUserLoggedIntoEnphase: false,
    }

    const [loginStatusData, setLoginStatusData] = useState<LoginStatusData>(LoginStatusDefaultValues);
    
    useEffect(() => {

        let userToken = localStorage.getItem("userToken")
        if (userToken) {
            let accessToken = JSON.parse(userToken).access_token;
        
            jwtInterceptor.get("/api/enphase/login_status", {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            })
                .then((loginStatusDataResponse: any) => {
                    console.log(loginStatusDataResponse.data)
                    setLoginStatusData(loginStatusDataResponse.data)
                });
        }    
    }, [])

    return (
        <Grid xs={12} pt={3} pl={2}>
            {loginStatusData.isUserLoggedIntoEnphase ? (
                <Grid container sx={loggedInStyles} xs={12} sm={12} lg={6} xl={4} justifyContent="center" alignItems="center">
                    <Grid xs={10}>
                        <Typography level="body1" sx={{ color: "white" }}>Enphase account is connected successfully.</Typography>
                    </Grid>
                    <Grid xs={2}>
                        {/* TODO: Infer color from theme. */}
                        <DoneIcon sx={{ color: "#0f5d26", fontSize: 35 }} />
                    </Grid>

                </Grid>
                ) : (
                    <Grid container sx={notLoggedInStyles} xs={12} sm={12} lg={6} xl={4} justifyContent="center" alignItems="center">
                        <Grid xs={10}>
                            <Typography level="body1" sx={{ color: "white" }}>Please connect your Enphase account:</Typography>
                            
                            <Link href="https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=8969127dbb1692152b1fb04d2e421694&redirect_uri=http://localhost:8080/enphase/oauth/1">
                                <Button variant="solid" sx={{ mt: 2, mb: 2, mr: 2 }}>Connect to Enphase</Button>
                            </Link>
                        </Grid>
                        <Grid xs={2}>
                            {/* TODO: Infer color from theme. */}
                            <CancelIcon sx={{ color: "#a10e25", fontSize: 35 }} />
                        </Grid>
                    </Grid>
                ) }
                
            
        </Grid>
    )
}
export default EnphaseAuthCard;