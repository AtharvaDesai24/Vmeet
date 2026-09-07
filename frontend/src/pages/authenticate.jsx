import * as React from "react";
import { useState, useContext } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
    createTheme,
    ThemeProvider
} from "@mui/material/styles";

import Backimg from "../assets/auth-background.avif";

import { AuthContext } from "../contexts/AuthContext";


// ================= THEME =================

const defaultTheme = createTheme({
    typography: {
        fontSize: 13,

        h6: {
            fontSize: "1.1rem",
            fontWeight: 500,
        },

        body2: {
            fontSize: "0.8rem",
        },
    },

    components: {

        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "0.8rem",
                },
            },
        },

        MuiInputBase: {
            styleOverrides: {
                input: {
                    fontSize: "0.85rem",
                },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: "0.85rem",
                },
            },
        },
    },
});


// ================= COMPONENT =================

export default function Auth() {
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate=useNavigate();

    // 0 = login
    // 1 = register
    const [formState, setFormState] = useState(0);

    const [open, setOpen] = useState(false);


    // Get functions from Context
    const {
        handleRegister,
        handleLogin
    } = useContext(AuthContext);



    // ================= HANDLE AUTH =================

    const handleAuth = async (event) => {

        // VERY IMPORTANT
        event.preventDefault();

        // Clear previous messages
        setError("");
        setMessage("");


        try {

            // ================= LOGIN =================

            if (formState === 0) {

                const response = await handleLogin(
                    username,
                    password
                );

                console.log(
                    "LOGIN RESPONSE:",
                    response
                );


                setMessage(response.message);

                setOpen(true);
            
                return navigate("/home") ;
            }



            // ================= REGISTER =================

            if (formState === 1) {

                const response = await handleRegister(
                    name,
                    username,
                    password
                );

                console.log(
                    "REGISTER RESPONSE:",
                    response
                );


                setMessage(response.message);

                setOpen(true);


                // Switch back to login
                setFormState(0);

                // Clear fields
                setName("");
                setUsername("");
                setPassword("");
            }


        } catch (err) {

            console.log(
                "AUTH ERROR:",
                err
            );


            const errorMessage =
                err.response?.data?.message ||
                "Something went wrong";


            setError(errorMessage);

            setOpen(true);
        }
    };




    const handleClose = () => {
        setOpen(false);
    };





    return (

        <ThemeProvider theme={defaultTheme}>

            <Grid
                container
                component="main"
                sx={{ height: "100vh" }}
            >

                <CssBaseline />


                {/* ================= LEFT IMAGE ================= */}

                <Grid
                    size={{ xs: false, sm: 4, md: 7 }}
                    sx={{
                        backgroundImage: `url(${Backimg})`,
                        backgroundRepeat: "no-repeat",

                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[50]
                                : theme.palette.grey[900],

                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />



                {/* ================= RIGHT FORM ================= */}

                <Grid
                    size={{ xs: 12, sm: 8, md: 5 }}
                    component={Paper}
                    elevation={6}
                    square
                >

                    <Box
                        sx={{
                            my: 6,
                            mx: 4,

                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >


                        {/* Avatar */}

                        <Avatar
                            sx={{
                                m: 1,
                                width: 32,
                                height: 32,
                                bgcolor: "secondary.main",
                            }}
                        >
                            <LockOutlinedIcon fontSize="small" />
                        </Avatar>


                        <br />



                        {/* LOGIN / REGISTER BUTTONS */}

                        <Stack
                            direction="row"
                            spacing={4}
                        >

                            <Button
                                variant={
                                    formState === 0
                                        ? "contained"
                                        : "text"
                                }

                                onClick={() => {
                                    setFormState(0);
                                    setError("");
                                    setMessage("");
                                }}
                            >
                                Sign In
                            </Button>


                            <Button
                                variant={
                                    formState === 1
                                        ? "contained"
                                        : "text"
                                }

                                onClick={() => {
                                    setFormState(1);
                                    setError("");
                                    setMessage("");
                                }}
                            >
                                Sign Up
                            </Button>

                        </Stack>



                        {/* ================= FORM ================= */}

                        <Box
                            component="form"

                            onSubmit={handleAuth}

                            noValidate

                            sx={{
                                mt: 1,
                                width: "100%",
                            }}
                        >


                            {/* USERNAME */}

                            <TextField
                                size="small"
                                margin="normal"
                                required
                                fullWidth

                                id="username"

                                label="Username"

                                name="username"

                                value={username}

                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }

                                autoFocus
                            />



                            {/* FULL NAME - ONLY REGISTER */}

                            {formState === 1 && (

                                <TextField
                                    size="small"
                                    margin="normal"
                                    required
                                    fullWidth

                                    name="name"

                                    label="Full Name"

                                    id="fullname"

                                    value={name}

                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />

                            )}



                            {/* PASSWORD */}

                            <TextField
                                size="small"
                                margin="normal"
                                required
                                fullWidth

                                name="password"

                                label="Password"

                                type="password"

                                id="password"

                                value={password}

                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />



                            {/* ERROR TEXT */}

                            {error && (
                                <Typography
                                    sx={{
                                        color: "red",
                                        mt: 1,
                                    }}
                                >
                                    {error}
                                </Typography>
                            )}



                            {/* SUBMIT */}

                            <Button
                                type="submit"

                                fullWidth

                                variant="contained"

                                size="small"

                                sx={{
                                    mt: 3,
                                    mb: 2,
                                }}
                            >

                                {formState === 0
                                    ? "Sign In"
                                    : "Sign Up"}

                            </Button>

                        </Box>

                    </Box>

                </Grid>

            </Grid>



            {/* ================= SNACKBAR ================= */}

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >

                <Alert
                    onClose={handleClose}

                    severity={
                        error
                            ? "error"
                            : "success"
                    }

                    variant="filled"

                    sx={{
                        width: "100%",
                    }}
                >

                    {error || message}

                </Alert>

            </Snackbar>

        </ThemeProvider>
    );
}