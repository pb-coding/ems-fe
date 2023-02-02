import Grid from '@mui/joy/Grid';
import { Theme, Typography } from '@mui/joy'

const keyCard = (theme: Theme) => ({
    backgroundColor: theme.palette.ems.surface,
    borderRadius: 'sm',
    p: 2,
})

function Home() {
    return (
        <Grid container xs={12} p={5}>
            <Grid xs={12} sx={keyCard}>
                <Typography level="display2" sx={{ color: "gray" }}>Some key HOME stats will be displayed here</Typography>
            </Grid>
            <Grid xs={8}  pt={3} pr={2}>
                <Grid sx={keyCard} xs={12}>
                <Typography level="display2" sx={{ color: "gray" }}>Some key HOME stats will be displayed here</Typography>
                </Grid>
            </Grid>
            <Grid xs={4} pt={3} pl={2}>
                <Grid sx={keyCard} xs={12}>
                    <a href="https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=8969127dbb1692152b1fb04d2e421694&redirect_uri=http://localhost:8080/enphase/oauth/1">Login to Enphase</a>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Home;