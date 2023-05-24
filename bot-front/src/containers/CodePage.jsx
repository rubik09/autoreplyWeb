import {useEffect, useState} from 'react';
import Header from "../components/UI/Header.jsx";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {apiSuccessNull} from "../store/slices/usersSlice.js";
import {sendApiInfo} from "../store/actions/usersActions.js";

const CodePage = () => {
    const apiSuccess = useSelector(state => state.users.apiSuccess)
    const dispatch = useDispatch();
    const push = useNavigate();
    const userPhone = useSelector(state => state.users.user.phone_number);

    const [api, setApi] = useState({
        code: '',
        phone_number: userPhone,
        setupStep: 2,
    });

    const inputApiChangeHandler = e => {
        const {name, value} = e.target;
        setApi(prev => ({...prev, [name]: value}));
    };

    useEffect(() => {
        if (apiSuccess) {
            push('/answer');
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
                    width: 450,
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onSubmit={(e) => submitFormHandler(e)}>
                    <Typography>
                        Input code from Telegram
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="code"
                        label="Code"
                        type="text"
                        id="code"
                        onChange={inputApiChangeHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={!(api.code.length === 5)}
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

export default CodePage;