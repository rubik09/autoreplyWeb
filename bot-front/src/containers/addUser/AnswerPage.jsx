import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {apiSuccessNull} from "../../store/slices/usersSlice.js";
import {sendApiInfo} from "../../store/actions/usersActions.js";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import Header from "../../components/UI/Header.jsx";
import ReactJson from "react-json-view";

const AnswerPage = () => {
    const apiSuccess = useSelector(state => state.users.apiSuccess)
    const dispatch = useDispatch();
    const push = useNavigate();
    const { id } = useParams()

    const [api, setApi] = useState({
        answer: '',
        user_id: id,
        setupStep: 3,
    });

    useEffect(() => {
        if (apiSuccess) {
            push('/');
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
                        Вставьте JSON файл
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="Json file"
                        type="file"
                        id="answer"
                        onChange={fileChangeHandler}
                    />
                    <div style={{
                        border: '1px solid grey',
                        borderRadius: '4px',
                        width: '445px',
                    }}>
                        <ReactJson
                            style={{
                                height: '600px',
                                overflow: 'scroll',
                                fontSize: '18px'
                            }}
                            src={api.answer ? JSON.parse(api.answer) : {}}
                            collapsed={4} theme="rjv-default"
                            onAdd={(edit) => setApi(prev => ({
                                ...prev,
                                answer: JSON.stringify(edit.updated_src)
                            }))}
                            onDelete={(edit) => setApi(prev => ({
                                ...prev,
                                answer: JSON.stringify(edit.updated_src)
                            }))}
                            onEdit={(edit) => setApi(prev => ({
                                ...prev,
                                answer: JSON.stringify(edit.updated_src)
                            }))}
                        />
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        disabled={!api.answer}
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Запустить
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AnswerPage;
