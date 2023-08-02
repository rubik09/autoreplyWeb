import React, {useEffect} from 'react';
import {Container, Box} from "@mui/material";
import Header from "../components/UI/Header.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchClientById} from "../store/actions/clientsActions.js";
import {useParams} from "react-router-dom";
import ReactJson from "react-json-view";

const Info = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const user = useSelector(state => state.users.editableUser)

    useEffect(() => {
        dispatch(fetchClientById(id));
    }, []);

    const infoStyle = {display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid lightgray'};
    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box noValidate sx={{
                    mt: 1,
                    width: 450,
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
                    <div style={{
                        border: '1px solid grey',
                        borderRadius: '4px',
                        width: '445px',
                        marginTop: '30px',
                    }}>
                        <ReactJson
                            style={{
                                height: '600px',
                                overflow: 'scroll',
                                fontSize: '18px',
                            }}
                            src={user?.answers ? JSON.parse(user?.answers) : {}}
                            collapsed={4} theme="rjv-default"
                        />
                    </div>
                </Box>
            </Box>
        </Container>
    );
};

export default Info;
