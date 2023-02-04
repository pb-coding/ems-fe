import Grid from '@mui/joy/Grid';
import { Theme, Typography } from '@mui/joy'
import EnphaseAuthCard from './EnphaseAuthCard';


function EnphaseAuth() {
    return (
        <Grid container xs={12} p={2}>
            <EnphaseAuthCard />
        </Grid>
    )
}
export default EnphaseAuth;