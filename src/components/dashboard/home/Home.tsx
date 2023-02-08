import SummaryChart from './SummaryChart';
import Grid from '@mui/joy/Grid';
import { Theme, Typography } from '@mui/joy'
import SolarSystemOverviewCard from './SolarSystemOverviewCard';

const keyCard = (theme: Theme) => ({
    backgroundColor: theme.palette.ems.surface,
    borderRadius: 'sm',
    p: 2,
})



function Home() {


    return (
        <Grid container xs={12} p={5}>
            <SolarSystemOverviewCard solarSystemId={123456} />
            <Grid xs={12}  pt={3} pr={2}>
                <Grid sx={keyCard} xs={12}>
                    <SummaryChart />
                </Grid>
            </Grid>
            <Grid xs={4} pt={3} pl={2}>
                <Grid sx={keyCard} xs={12}>
                <Typography level="display2" sx={{ color: "gray" }}>Something else</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Home;