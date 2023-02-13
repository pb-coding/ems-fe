import React, { useState, useEffect, useCallback } from 'react';
import jwtInterceptor from '../../../services/jwtInterceptor';
import { Grid, Typography, Theme, TypographyProps } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';

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

    const convertTimestampToTime = (solarSummaryResponseData: Array<SolarSummaryInterval>) => {
      
      return solarSummaryResponseData.map((interval: any) => { 
        let localDateTime = new Date(interval.end_at * 1000)
        interval.end_at = `${localDateTime.getHours()}:${localDateTime.getMinutes()}`;
        return interval; 
      })
    }


    const [solarSummaryData, setSolarSummaryData] = useState<Array<SolarSummaryInterval>>([SolarSummaryDefaultData]);

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
            const solarSummaryResponseData = convertTimestampToTime(solarSummaryResponse.data)
            console.log(solarSummaryResponseData)
            setSolarSummaryData(solarSummaryResponseData)
          });
      }    
    }, [])
    
    return (
        <Grid container xs={12}>
            <Typography level="h4" sx={{ color: "white" }}>Energy Overview Today</Typography>
            <ResponsiveContainer width="100%" height={600}>
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
                  <CartesianGrid strokeDasharray="3 10" />
                  <XAxis 
                    dataKey="end_at"
                    tick={{ fontFamily: 'Public Sans', fontSize: 14 }}
                    dy={5} 
                  />
                  <YAxis 
                    tick={{ fontFamily: 'Public Sans', fontSize: 14 }} 
                    dx={-5}
                  />
                  <Tooltip />
                  <Legend iconType='circle' />
                  <ReferenceLine y={0} stroke="#000" />
                  <Bar dataKey="production" stackId="a" fill="#8884d8" />
                  <Bar dataKey="consumption" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
        </Grid>
    )
}

export default SummaryChart;