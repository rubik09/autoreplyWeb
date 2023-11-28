import Header from "../components/UI/Header.jsx";
import {Autocomplete, Box, Button, Container, TextField, Typography,} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {countries} from "../config";
import {fetchClientById, updateClient} from "../store/actions/clientsActions";
import {fetchUserNull} from "../store/slices/usersSlice.js";

const UserChange = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.editableUser);
    const push = useNavigate();
    const {id} = useParams();

    const [userState, setUserState] = useState({
        region: '',
        username: '',
        id: id,
    });

    const [keywords, setKeywords] = useState([]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setUserState(prev => ({...prev, [name]: value}));
    };

    let handleChange = (i, e) => {
        let newFormValues = [...keywords];
        newFormValues[i][e.target.name] = e.target.value;
        setKeywords(newFormValues);
    }

    let addFormFields = () => {
        setKeywords([...keywords, { activity: "", keyword: "", count: 0}])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...keywords];
        newFormValues.splice(i, 1);
        setKeywords(newFormValues)
    }

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(updateClient({...userState, keywords: keywords}));
        push('/')
    };

    useEffect(() => {
        dispatch(fetchClientById(id));
        if (user) {
            setUserState({
                region: user.region,
                username: user.username,
                id: id,
            });
            setKeywords(JSON.parse(user.keywords));
            console.log(user, keywords)
        }
    }, [dispatch, id, !!user]);

    useEffect(() => {
        dispatch(fetchUserNull())
    }, [])

    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box component="form" noValidate sx={{
                    mt: 1,
                    width: 600,
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onSubmit={(e) => submitFormHandler(e)}>
                    <Autocomplete
                        id="country-select-demo"
                        sx={{width: 600}}
                        options={countries}
                        onChange={(e) => setUserState(prev => ({...prev, region: e.target.textContent}))}
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
                                    autoComplete: 'new-password',
                                }}
                            />
                        )}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="username"
                        label="Username"
                        type="text"
                        value={userState.username}
                        id="username"
                        onChange={inputChangeHandler}
                        sx={{marginBottom: '0px'}}
                    />
                    <Box noValidate sx={{
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
                                        defaultValue="Small"
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
                                        defaultValue="Small"
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
                        </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Сохранить
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default UserChange;
