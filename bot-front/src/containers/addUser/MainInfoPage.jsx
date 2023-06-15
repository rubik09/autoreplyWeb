import {
    Autocomplete,
    Box,
    Button,
    Container,
    TextField,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Header from "../../components/UI/Header.jsx";
import {useNavigate} from "react-router-dom";
import {countries} from "../../config";
import {sendClientInfo} from "../../store/actions/clientsActions";

const MainInfoPage = () => {
    const dispatch = useDispatch();
    const push = useNavigate();
    const [user, setUser] = useState({
        phone: "",
        user_id: "",
        username: "",
        geo: "",
    });

    const inputUserChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(sendClientInfo({...user}));
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
                                label: 'Номер телефона',
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
                            sx={{marginBottom: '0px'}}
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
                        <Autocomplete
                            id="country-select-demo"
                            sx={{width: 332}}
                            options={countries}
                            onChange={(e) => setUser(prev => ({...prev, geo: e.target.textContent}))}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                    <img
                                        width="20"
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        alt=""
                                    />
                                    {option.label} ({option.code}) +{option.phone}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Choose a country"
                                    name="region"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={!(user.phone.length >= 10 && user.username.length >= 3 && user.user_id.length >= 6 && user.geo.length >= 2)}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Далее
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
};

export default MainInfoPage;

