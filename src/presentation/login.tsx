import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { AlertSuccess, AlertError } from "../widgets/alerts";
import { useNavigate } from "react-router-dom";
import * as Session from "../persisntace/session";

const theme = createTheme();
const LoginPage = () => {
    const navigateApp = useNavigate();
    const [alert, setAlert] = React.useState<{ status: "warning" | "success" | "info" | "error", message: string } | null>(null);
    const [username, setUsername] = React.useState('user');
    const [password, setPassword] = React.useState('user');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Session.setSession({username: username});
        navigateApp("/");
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Grid container style={{ marginBottom: 20 }}>
                        <Grid item xs={4}>
                            <Button variant="text" onClick={() => navigateApp("/")}>
                                <ArrowBack />
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>Login Page</Typography>
                        </Grid>
                    </Grid>

                    {
                        alert && (
                            alert.status == "success"
                                ? <AlertSuccess style={{ width: "100%", marginBottom: "14px" }} msg={alert.message} />
                                : <AlertError style={{ width: "100%", marginBottom: "14px" }} msg={alert?.message} />
                        )
                    }

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    type='text'
                                    style={{ marginBottom: 20 }}
                                    inputProps={{ maxLength: 32 }}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                    onChange={evt => setUsername(evt.target.value)}
                                    value={username}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    type='text'
                                    style={{ marginBottom: 20 }}
                                    inputProps={{ maxLength: 32 }}
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    onChange={evt => setPassword(evt.target.value)}
                                    value={password}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LoginPage;