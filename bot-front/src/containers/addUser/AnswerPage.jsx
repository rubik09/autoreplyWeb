import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {apiSuccessNull} from "../../store/slices/usersSlice.js";
import {sendApiInfo} from "../../store/actions/usersActions.js";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import Header from "../../components/UI/Header.jsx";

const AnswerPage = () => {
    const apiSuccess = useSelector(state => state.users.apiSuccess)
    const dispatch = useDispatch();
    const push = useNavigate();
    const userPhone = useSelector(state => state.users.user.phone_number);

    const [api, setApi] = useState({
        answer: '',
        phone_number: userPhone,
        setupStep: 3,
    });

    useEffect(() => {
        if (apiSuccess) {
            push('/list');
            dispatch(apiSuccessNull());
        }
    }, [dispatch, apiSuccess]);

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(sendApiInfo({...api}));
    };

    const fileChangeHandler = (e) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const jsonObj = JSON.parse(event.target.result);
            const jsonString = JSON.stringify(jsonObj);
            setApi(prev => ({...prev, answer: jsonString}));
        }

        reader.readAsText(e.target.files[0]);
    }

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
                        Insert JSON file
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="answer"
                        type="file"
                        id="answer"
                        onChange={fileChangeHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
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

export default AnswerPage;
