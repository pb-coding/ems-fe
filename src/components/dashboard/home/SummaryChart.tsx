import React, { useState, useEffect } from 'react';
import jwtInterceptor from '../../../services/jwtInterceptor';
import { Grid, Typography, Theme, TypographyProps } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SummaryChart() {
    
    const navigate = useNavigate();

    interface SolarSummaryInterval {
        end_at: number;
        production: number;
        consumption: number;
    }

    const SolarSummaryDefaultData = {
        end_at: 0,
        production: 0,
        consumption: 0,
    }

    const [solarSummaryData, setSolarSummaryData] = useState<Array<SolarSummaryInterval>>([SolarSummaryDefaultData]);

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

      useEffect(() => {

        let userToken = localStorage.getItem("userToken")
        if (userToken) {
            let accessToken = JSON.parse(userToken).access_token;
        
            jwtInterceptor.get("/api/enphase/solar/summary?solar_system_id=" + "3447361" + "&start_date=" + "2023-02-05", {
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
            .then((solarSummaryResponse: any) => {
                console.log(solarSummaryResponse.data)
                setSolarSummaryData(solarSummaryResponse.data)
            });
        }    
    }, [])
    
    return (
        <Grid container xs={12}>
            <BarChart
                width={1000}
                height={600}
                data={solarSummaryData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
                <Bar dataKey="uv" fill="#ffc658" />
            </BarChart>
        </Grid>
    )
}

export default SummaryChart;