import {
    Box,
    Button,
    Container,
    TextField,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Header from "../../components/UI/Header.jsx";
import {sendUserInfo} from "../../store/actions/usersActions.js";
import {useNavigate} from "react-router-dom";

const MainInfoPage = () => {
    const dispatch = useDispatch();
    const push = useNavigate();
    const [user, setUser] = useState({
        phone: "",
        user_id: "",
        username: "",
    });

    const inputUserChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(sendUserInfo({...user}));
        push(`/api/${user.user_id}`);
    };

    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: 396
                    }}
                >
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
                        <Button
                            type="submit"
                            disabled={!(user.phone.length >= 10 && user.username.length >= 3 && user.user_id.length >= 6)}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Next step
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
};

export default MainInfoPage;

