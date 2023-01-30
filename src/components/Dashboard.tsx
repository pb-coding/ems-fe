import MenuSidebar from './MenuSidebar'
import MainBody from './MainBody'
import { Sheet } from '@mui/joy'
import Grid from '@mui/joy/Grid'
import Typography from '@mui/joy/Typography'

function Dashboard() {
    
    const old = (
        <div className="antialiased bg-slate-800 w-full min-h-screen text-slate-300 relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                <MenuSidebar />
                <MainBody />
            </div>
        </div>
    )

    return(
        <Sheet
            sx={(theme) => ({
                background: theme.vars.palette.ems.background,
                p: 2,
                height: "98vh",
            })}
        >
            <Grid 
                container
                sx={{ borderRadius: '30px' }}
            >
                <Grid 
                    sm={3} 
                    sx={(theme) => ({ 
                        minHeight: "95vh",
                        backgroundColor: theme.vars.palette.ems.surface,
                        borderTopLeftRadius: '20px',
                        borderBottomLeftRadius: '20px'
                    })}
                >
                    <Typography level="h4" color="primary">menu bar</Typography>
                </Grid>
                <Grid
                    sm={9}
                    sx={(theme) => ({ 
                        minHeight: "95vh",
                        backgroundColor: theme.vars.palette.ems.bodyBg,
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '20px'
                    })}
                >
                    <Typography level="h4" color="primary">main body</Typography>
                </Grid>
            </Grid>
        </Sheet>
    )
}
export default Dashboard;