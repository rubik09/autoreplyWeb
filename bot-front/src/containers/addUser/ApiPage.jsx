import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../components/UI/Header.jsx";
import {useEffect, useState} from "react";
import {apiSuccessNull} from "../../store/slices/usersSlice";
import {sendApiInfo} from "../../store/actions/clientsActions";
import {toast} from "react-toastify";

const ApiPage = () => {
    const apiSuccess = useSelector(state => state.users.apiSuccess)
    const { id } = useParams()
    const push = useNavigate();
    const dispatch = useDispatch();

    const [api, setApi] = useState({
        api_id: '',
        api_hash: '',
        setupStep: 1,
        user_id: id,
    });

    const inputApiChangeHandler = e => {
        const {name, value} = e.target;
        setApi(prev => ({...prev, [name]: value}));
    };

    const copyLink = (e) => {
        e.preventDefault();
        const hiddenInput = document.createElement('input');
        hiddenInput.value = 'https://my.telegram.org/apps';
        hiddenInput.style = {display: 'none'};
        document.body.append(hiddenInput);
        hiddenInput.select();
        document.execCommand('copy');
        hiddenInput.remove();
        toast.success('Ссылка успешно скопирована!');
    };

    useEffect(() => {
        if (apiSuccess) {
            push('/code/' + id);
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
                    width: 400  ,
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onSubmit={(e) => submitFormHandler(e)}>
                    <Typography>
                        <ul>
                            <li>Перейдите на <a href='' style={{cursor: "pointer"}} onClick={(e) => copyLink(e)}>https://my.telegram.org/apps</a> в режиме инкогнито</li>
                            <li>Зарегистрируйтесь</li>
                            <li>скопируйте apiId и apiHash</li>
                        </ul>
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
                        Далее
                    </Button>
                </Box>
            </Box>

        </Container>
    );
};

export default ApiPage;
