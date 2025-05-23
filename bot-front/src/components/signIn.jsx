import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginAdmin} from "../store/actions/adminsActions";
import {toast} from "react-toastify";

const SignIn = () => {
    const dispatch = useDispatch();
    const loginError = useSelector(state => state.users.loginError)
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const inputUserChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(loginAdmin({...user}));
    };

    const emailRegex = new RegExp('[^\\s@]+@[^\\s@]+\\.[^\\s@]+');

    if(loginError?.passwordErr) toast.error(loginError?.passwordErr);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}} onSubmit={(e) => submitFormHandler(e)}>
                    {/*<PhoneInput*/}
                    {/*    inputStyle={{width: '332px'}}*/}
                    {/*    inputProps={{*/}
                    {/*        name: 'phone',*/}
                    {/*        required: true,*/}
                    {/*        autoFocus: true*/}
                    {/*    }}*/}
                    {/*    onChange={(phone) => inputUserChangeHandler({target: {name: 'phone', value: phone}})}*/}
                    {/*/>*/}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        autoComplete="email"
                        onChange={inputUserChangeHandler}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={!!loginError?.passwordErr}
                        helperText={loginError?.passwordErr}
                        autoComplete="current-password"
                        onChange={inputUserChangeHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={!(user.password.length >= 8 && emailRegex.test(user.email))}
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
