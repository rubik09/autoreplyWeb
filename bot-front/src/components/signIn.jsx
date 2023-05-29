import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
// import PhoneInput from "react-phone-input-2";
import {useState} from "react";
import {loginUser} from "../store/actions/usersActions.js";
import {useDispatch} from "react-redux";
import {historyPush} from "../store/actions/historyActions.js";

const SignIn = () => {
    const dispatch = useDispatch();
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
        await dispatch(loginUser({...user}));
        await dispatch(historyPush('/main'));
    };

    const regex = new RegExp('[^\\s@]+@[^\\s@]+\\.[^\\s@]+');

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
                        autoComplete="current-password"
                        onChange={inputUserChangeHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={!(user.password.length >= 8 && regex.test(user.email))}
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
