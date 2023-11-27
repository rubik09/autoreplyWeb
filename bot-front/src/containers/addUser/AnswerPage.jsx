import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {apiSuccessNull} from "../../store/slices/usersSlice";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import Header from "../../components/UI/Header.jsx";
import {sendApiInfo} from "../../store/actions/clientsActions";

const AnswerPage = () => {
    const apiSuccess = useSelector(state => state.users.apiSuccess)
    const dispatch = useDispatch();
    const push = useNavigate();
    const {id} = useParams()

    const api = {
        user_id: id,
        setupStep: 3,
    };

    const [keywords, setKeywords] = useState([
            {activity: "register", keyword: "", count: 0},
            {activity: "firstDep", keyword: "", count: 0},
    ]);

    let handleChange = (i, e) => {
        let newFormValues = [...keywords];
        newFormValues[i][e.target.name] = e.target.value;
        setKeywords(newFormValues);
    }

    let addFormFields = () => {
        setKeywords([...keywords, { activity: "", keyword: ""}])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...keywords];
        newFormValues.splice(i, 1);
        setKeywords(newFormValues)
    }

    useEffect(() => {
        if (apiSuccess) {
            push('/');
            dispatch(apiSuccessNull());
        }
    }, [dispatch, apiSuccess]);

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(sendApiInfo({...api, keywords: keywords}));
    };

    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box component="form" noValidate sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'center',
                    width: 600
                }} onSubmit={(e) => submitFormHandler(e)}>
                    <Typography>
                        Введите ключевые слова
                    </Typography>
                    <Box>
                        {keywords.map((element, index) => (
                            <Box key={index} sx={{
                                mt: 1
                            }}>
                                <TextField
                                    label="Действие"
                                    id="outlined-size-small"
                                    size="small"
                                    name="activity"
                                    value={element.activity || ""}
                                    onChange={e => handleChange(index, e)}
                                    sx={{
                                        mr: 1
                                    }}
                                />
                                <TextField
                                    label="Ключевое слово"
                                    id="outlined-size-small"
                                    size="small"
                                    name="keyword"
                                    value={element.keyword || ""}
                                    onChange={e => handleChange(index, e)}
                                    sx={{
                                        mr: 1
                                    }}
                                />
                                {
                                    index ?
                                        <Button color="error" onClick={() => removeFormFields(index)}>
                                            Удалить
                                        </Button>
                                        : null
                                }
                            </Box>
                        ))}
                    </Box>
                    <div className="button-section">
                        <Button variant="contained" onClick={() => addFormFields()} sx={{
                            mt: 1
                        }}>
                            Добавить
                        </Button>
                    </div>
                    <Button
                        type="submit"
                        disabled={!keywords.every(item => item.activity && item.keyword)}
                        variant="contained"
                        sx={{mt: 3, mb: 2, width: 110}}
                    >
                        Запустить
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AnswerPage;
