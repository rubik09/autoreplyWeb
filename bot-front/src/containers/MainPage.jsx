import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Header from "../components/UI/Header.jsx";
import {useEffect, useState} from "react";
import {apiSuccessNull} from "../store/slices/usersSlice.js";
import {sendApiInfo} from "../store/actions/usersActions.js";

const MainPage = () => {
    const apiSuccess = useSelector(state => state.users.apiSuccess)
    const userPhone = useSelector(state => state.users.user.phone_number);
    const push = useNavigate();
    const dispatch = useDispatch();

    const [api, setApi] = useState({
        api_id: '',
        api_hash: '',
        setupStep: 1,
        phone_number: userPhone,
    });

    const inputApiChangeHandler = e => {
        const {name, value} = e.target;
        setApi(prev => ({...prev, [name]: value}));
    };

    useEffect(() => {
        if (apiSuccess) {
            push('/code');
            dispatch(apiSuccessNull());
        }
    }, [dispatch, apiSuccess]);

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(sendApiInfo({...api}));
    };

    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box component="form" noValidate sx={{
                    mt: 1,
                    maxWidth: 500,
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onSubmit={(e) => submitFormHandler(e)}>
                    <Typography>
                        Please go to <a href='https://my.telegram.org/apps' style={{fontSize: '20px'}}>site</a> and
                        register there and copy apiId and apiHash
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="api_id"
                        label="App api_id"
                        type="text"
                        id="api_id"
                        onChange={inputApiChangeHandler}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="api_hash"
                        label="App api_hash"
                        type="text"
                        id="api_hash"
                        onChange={inputApiChangeHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={!(api.api_hash.length >= 8 && api.api_id.length >= 4)}
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Send
                    </Button>
                </Box>
            </Box>

        </Container>
    );
};

export default MainPage;
