import React, { useEffect, useState } from 'react';
import jwtInterceptor from '../../../services/jwtInterceptor';
import Grid from '@mui/joy/Grid';
import { Typography } from '@mui/joy';

interface EnphaseAuthCardProps {
    gridSx: any
}

interface LoginStatusData {
    isUserLoggedIntoEnphase: boolean;
}

function EnphaseAuthCard({ gridSx }: EnphaseAuthCardProps) {

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
        <Grid xs={4} pt={3} pl={2}>
            <Grid sx={gridSx} xs={12}>
                {loginStatusData.isUserLoggedIntoEnphase ? (
                    <Typography level="body1" sx={{ color: "white" }}>Logged in.</Typography>
                ) : (
                    <>
                        <Typography level="body1" sx={{ color: "white" }}>Please login in to Enphase:</Typography>
                        <a href="https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=8969127dbb1692152b1fb04d2e421694&redirect_uri=http://localhost:8080/enphase/oauth/1">Login to Enphase</a>
                    </>
                ) }
                
            </Grid>
        </Grid>
    )
}
export default EnphaseAuthCard;