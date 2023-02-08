import React, { useState, useEffect } from 'react';
import jwtInterceptor from '../../../services/jwtInterceptor';
import { Grid, Typography, Theme, TypographyProps } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

interface SolarSystemOverviewCardProps {
    solarSystemId: number;
}

interface SolarSystemAddress {
    country: string;
    postal_code: string;
}

interface SolarSystemData {
    system_id: number;
    name: string;
    public_name: string;
    timezone: string;
    address: SolarSystemAddress;
    connection_type: string;
    status: string;
    last_report_at: number;
    last_energy_at: number;
    operational_at: number;
    other_references: Array<string>;
}

interface CardEntryProps {
    header: string;
    value: string;
    headerLevel: TypographyProps['level'];
    valueLevel: TypographyProps['level'];
}

function SolarSystemOverviewCard({solarSystemId}: SolarSystemOverviewCardProps) {

    const keyCard = (theme: Theme) => ({
        backgroundColor: theme.palette.ems.surface,
        borderRadius: 'sm',
        p: 3,
    })
    
    const SolarSystemDataDefaultValues: SolarSystemData = {
        system_id: 0,
        name: "",
        public_name: "",
        timezone: "",
        address: {
            country: "",
            postal_code: "",
        },
        connection_type: "",
        status: "",
        last_report_at: 0,
        last_energy_at: 0,
        operational_at: 0,
        other_references: [],
    }
    
    const [solarSystemData, setSolarSystemData] = useState<SolarSystemData>(SolarSystemDataDefaultValues);

    const navigate = useNavigate()


    /*useEffect(() => {

        let userToken = localStorage.getItem("userToken")
        if (userToken) {
            let accessToken = JSON.parse(userToken).access_token;
        
            jwtInterceptor.get("/api/enphase/solar/system/" + "3447361", {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            })
            //.then on rejected promise
            .catch((onrejectionhandled) => {
                console.log("on rejection handled")
                if (onrejectionhandled.response.status === 400) {
                    console.log("Error with enphase auth. Please re-authenticate.")
                    navigate("/enphase-auth")
                }
            })
            .then((solarSystemDataResponse: any) => {
                console.log(solarSystemDataResponse.data)
                setSolarSystemData(solarSystemDataResponse.data)
            });
        }    
    }, [])*/
    
    function CardEntry({header, value, headerLevel = "body2", valueLevel = "h4" }: CardEntryProps ) {
        return (
            <Grid container xs={3}>
                <Grid xs={12}>
                    <Typography level={headerLevel} sx={{ color: "gray" }}>{header}</Typography>
                </Grid>
                <Grid xs={12}>
                    <Typography level={valueLevel} sx={{ color: "white" }}>{value}</Typography>
                </Grid>
            </Grid>
        )
    }

    function convertTimestampToDateTimeString(timestamp: number) {
        let date = new Date(timestamp * 1000);
        return date.getHours() + ":" + date.getMinutes() + " "+ date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }
    
    return (
        // TODO: implent loading spinner
        <Grid container xs={12} sx={keyCard}>
            {solarSystemData ? (
                <>
                    <CardEntry
                        header="Solar System ID"
                        value={solarSystemData.system_id.toString()}
                        headerLevel="body2"
                        valueLevel="h4"
                    />
                    <CardEntry 
                        header="Location" 
                        value={`${solarSystemData.address.country} (PC ${solarSystemData.address.postal_code})`}
                        headerLevel="body2"
                        valueLevel="h4"
                    />
                    <CardEntry
                        header="Last report at"
                        value={convertTimestampToDateTimeString(solarSystemData.last_report_at)}
                        headerLevel="body2"
                        valueLevel="h6"
                    />
                    <CardEntry
                        header="Last energy at"
                        value={convertTimestampToDateTimeString(solarSystemData.last_energy_at)}
                        headerLevel="body2"
                        valueLevel="h6"
                    />
                </>
            ): <p>loading...</p>}
        </Grid>
    )
}
export default SolarSystemOverviewCard;