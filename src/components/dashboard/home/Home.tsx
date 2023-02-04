import Grid from '@mui/joy/Grid';
import { Theme, Typography } from '@mui/joy'
import SolarSystemOverviewCard from './SolarSystemOverviewCard';
import EnphaseAuthCard from './EnphaseAuthCard';

const keyCard = (theme: Theme) => ({
    backgroundColor: theme.palette.ems.surface,
    borderRadius: 'sm',
    p: 2,
})

function Home() {
    return (
        <Grid container xs={12} p={5}>
            <SolarSystemOverviewCard solarSystemId={123456} />
            <Grid xs={8}  pt={3} pr={2}>
                <Grid sx={keyCard} xs={12}>
                <Typography level="display2" sx={{ color: "gray" }}>Some key HOME stats will be displayed here</Typography>
                </Grid>
            </Grid>
            <EnphaseAuthCard gridSx={keyCard} />
        </Grid>
    )
}
export default Home;