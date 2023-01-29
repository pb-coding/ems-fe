import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext'
import Grid from '@mui/joy/Grid'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import '@fontsource/public-sans';
import emsTheme from '../theme'

function Login() {
    
    const { login } = useContext(AuthContext)
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    const loginSubmit = async () => {
       let payload = {
        username: username.current?.value,
        password: password.current?.value,
       }
       await login(payload)
    }

    return (
        <Sheet>
            <Grid 
                container
                direction="column"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ 
                    minHeight: "100vh",
                    backgroundColor: emsTheme.color.bg,
                }}
            >
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    p={5}
                    sx={{
                        backgroundColor: emsTheme.color.surface
                    }}
                >
                    <Grid my="3">
                        <Typography level="h2" >Login</Typography>
                    </Grid>
                    <form>
                        <Grid>
                            <Input
                                disabled={false}
                                placeholder="username"
                                type="text"
                                name="username"
                                slotProps={{ input: { ref: username } }}
                            />
                        </Grid>
                        <Grid>
                            <Input
                                color="primary"
                                disabled={false}
                                placeholder="password"
                                type="password"
                                name="password"
                                slotProps={{ input: { ref: password } }}
                            />
                        </Grid>
                        <Grid>
                            <Button
                                color="primary"
                                type="button"
                                onClick={loginSubmit}
                            >
                                Login
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Sheet>
    )
}
export default Login;