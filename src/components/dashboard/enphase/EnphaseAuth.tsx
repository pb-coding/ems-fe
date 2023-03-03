import Grid from '@mui/joy/Grid';
import { Theme, Typography } from '@mui/joy'
import EnphaseAuthCard from './EnphaseAuthCard';
import QueryExample from './QueryExample';


function EnphaseAuth() {
    return (
        <Grid container xs={12} p={2}>
            <EnphaseAuthCard />
            <QueryExample />
        </Grid>
    )
}
export default EnphaseAuth;