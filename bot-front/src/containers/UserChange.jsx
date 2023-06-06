import Header from "../components/UI/Header.jsx";
import {Autocomplete, Box, Button, Container, TextField,} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchUserById, updateClient} from "../store/actions/usersActions.js";
import ReactJson from "react-json-view";
import {countries} from "../config";

const UserChange = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.editableUser);
    const push = useNavigate();
    const {id} = useParams();

    console.log(id, 'd')

    const [userState, setUserState] = useState({
        answers: '',
        region: '',
        username: '',
        user_id: id,
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setUserState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(updateClient({...userState}));
        push('/list')
    };

    const fileChangeHandler = (e) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const jsonObj = JSON.parse(event.target.result);
            const jsonString = JSON.stringify(jsonObj);
            setUserState(prev => ({...prev, answers: jsonString}));
        }

        reader.readAsText(e.target.files[0]);
    }

    useEffect(() => {
        dispatch(fetchUserById(id));
        if (user) {
            setUserState({
                answers: user.answers,
                region: user.region,
                username: user.username,
                user_id: id,
            });
        }
    }, [dispatch, id, !!user]);

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
                    <Autocomplete
                        id="country-select-demo"
                        sx={{width: 450}}
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
                            src={userState.answers ? JSON.parse(userState.answers) : {}}
                            collapsed={4} theme="rjv-default"
                            onDelete={(edit) => setUserState(prev => ({
                                ...prev,
                                answers: JSON.stringify(edit.updated_src)
                            }))}
                            onAdd={(edit) => setUserState(prev => ({
                                ...prev,
                                answers: JSON.stringify(edit.updated_src)
                            }))}
                            onEdit={(edit) => setUserState(prev => ({
                                ...prev,
                                answers: JSON.stringify(edit.updated_src)
                            }))}/>
                    </div>

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
