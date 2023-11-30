import React, {useEffect} from 'react';
import {Container, Box, Button, TextField} from "@mui/material";
import Header from "../components/UI/Header.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchClientById} from "../store/actions/clientsActions.js";
import {useNavigate, useParams} from "react-router-dom";
const Info = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const user = useSelector(state => state.users.editableUser)
    const push = useNavigate();

    useEffect(() => {
        dispatch(fetchClientById(id));
    }, [dispatch]);

    const infoStyle = {display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid lightgray'};
    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box noValidate sx={{
                    mt: 1,
                    width: 500,
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'center',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '20px',
                }}>
                    <div style={infoStyle}><span style={{color: 'grey'}}>Username:</span> {user?.username}</div>
                    <div style={infoStyle}><span style={{color: 'grey'}}>User id:</span> {user?.user_id}</div>
                    <div style={infoStyle}><span style={{color: 'grey'}}>Phone number:</span> {user?.phone_number}</div>
                    <div style={infoStyle}><span style={{color: 'grey'}}>Region:</span> {user?.region}</div>
                    {!!user && JSON.parse(user?.keywords).map((element, index) => (
                        <Box key={index} sx={{
                            mt: 1
                        }}>
                            <TextField
                                label="Действие"
                                id="outlined-size-small"
                                size="small"
                                name="activity"
                                defaultValue={element.activity || ""}
                                onChange={e => handleChange(index, e)}
                                sx={{
                                    mr: 1
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                label="Ключевое слово"
                                id="outlined-size-small"
                                size="small"
                                name="keyword"
                                defaultValue={element.keyword || ""}
                                sx={{
                                    mr: 1
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>
                    ))}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={() => push('/')}
                    >
                        На главную
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Info;
