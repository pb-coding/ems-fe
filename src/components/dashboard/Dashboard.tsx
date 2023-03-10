import MenuSidebar from './MenuSidebar'
import Home from './home/Home'
import { Sheet, Theme } from '@mui/joy'
import Grid from '@mui/joy/Grid'
import customTheme from '../../theme'
import EnphaseAuth from './enphase/EnphaseAuth'
import SmartHome from './smarthome/SmartHome'

const responsive = customTheme.responsive

const sidebarGrid = (theme: Theme) => ({
    minHeight: "95vh",
    backgroundColor: theme.vars.palette.ems.surface,
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px'
})

const sidebarGridMobile = (theme: Theme) => ({
    minHeight: "30vh",
    backgroundColor: theme.vars.palette.ems.surface,
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px'
})

const mainBodyGrid = (theme: Theme) => ({
    minHeight: "95vh",
    backgroundColor: theme.vars.palette.ems.bodyBg,
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px'
})

const dashboardBackground = (theme: Theme) => ({
    background: theme.vars.palette.ems.background,
    p: 2,
    height: "98vh",
})

interface DashboardProps {
    page: string;
}



const Dashboard = ({ page }: DashboardProps) => {
    

    return(
        <Sheet sx={dashboardBackground}>
            <Grid container>
                <Grid xs={12} sm={6} md={4} lg={3} xl={2} sx={responsive('(min-width:600px)', sidebarGrid, sidebarGridMobile)}>
                    <MenuSidebar page={page} />
                </Grid>
                <Grid xs={12} sm={6} md={8} lg={9} xl={10} sx={mainBodyGrid}>
                    {page === "home" && <Home />}
                    {page === "enphase-auth" && <EnphaseAuth />}
                    {page === "smart-home" && <SmartHome />}
                </Grid>
            </Grid>
        </Sheet>
    )
}
export default Dashboard;