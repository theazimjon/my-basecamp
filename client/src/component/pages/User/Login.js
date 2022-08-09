import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import {Link as LinkRoute} from "react-router-dom";
import ServiceAPI from "../../../API/ServiceAPI";
import {useContext, useState} from "react";
import UserCredentialsContext from "../../../context/Credentials/UserCredentialsContext";
const LOGIN_URL = "/login";

export default function Login() {
    const { setUserCredentials, userCredentials} = useContext(UserCredentialsContext);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            email: data.get("email"),
            password: data.get("password")
        };
        try {
            const response = await ServiceAPI.post(LOGIN_URL,
                JSON.stringify(user),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
            console.log(response.data);
            const token = response?.data?.token;
            const validUser = response?.data?.existingUser;
            setUserCredentials({token: token, user: validUser});
            console.log(userCredentials);
        } catch (err) {
            if (!err?.response)
                setErrorMessage('Login Failed, Try again later');
            else
                setErrorMessage(err.response.data.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <FilterHdrIcon sx={{ display: { xs: 'block', md: 'flex' }, mr: 1, mb: -1, fontSize: "100px" }}  />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{

                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        mb: 5
                    }}
                >
                    BASECAMP
                </Typography>
                <Typography component="h1" variant="h5" sx={{ml: -1.5}}>
                    Sign In
                </Typography>
                <h4 className={errorMessage ? "text-warning bg-secondary p-2 mb-0 mt-2 w-100 text-center border" : "d-none"} aria-live="assertive">{errorMessage}</h4>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
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
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <LinkRoute to="/register">
                                <Link  variant="body2">
                                    Do not have an account? Sign Up
                                </Link>
                            </LinkRoute>
                        </Grid>
                    </Grid>
                </Box>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: '',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        mt: 16
                    }}
                >
                    Welcome to My Basecamp project Qwasar.io Azimjon Umarov
                </Typography>
            </Box>
        </Container>
    );
}
