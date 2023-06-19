import {
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import {useState} from "react";
import {registerUser} from "../store/actions/usersActions";
import {useDispatch} from "react-redux";
import {historyPush} from "../store/actions/historyActions";

const SignUp = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        phone: "",
        password: "",
        user_id: "",
        secondPassword: "",
        username: "",
    });

    const inputUserChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(registerUser({...user}));
        await dispatch(historyPush('/main'));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 396
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{mt: 1, width: 332}} onSubmit={(e) => submitFormHandler(e)}>
                    <PhoneInput
                        inputStyle={{width: '332px'}}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true,
                        }}
                        onChange={(phone) => inputUserChangeHandler({target: {name: 'phone', value: phone}})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="user_id"
                        label="User id"
                        type="text"
                        id="user_id"
                        value={user.user_id}
                        onChange={inputUserChangeHandler}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="username"
                        label="Username"
                        type="text"
                        id="username"
                        value={user.username}
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
                        value={user.password}
                        onChange={inputUserChangeHandler}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="secondPassword"
                        label="Retry password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={user.secondPassword}
                        onChange={inputUserChangeHandler}
                    />
                    <Button
                        type="submit"
                        disabled={!(user.phone.length >= 10 && user.password.length >= 8 && user.secondPassword.length >= 8 && user.password === user.secondPassword && user.username.length > 3)}
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;
