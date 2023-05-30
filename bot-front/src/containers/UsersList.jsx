import {Box, Container} from "@mui/material";
import Header from "../components/UI/Header.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsersSuccess} from "../store/slices/usersSlice.js";
import React, {useEffect} from "react";
import {fetchUsers} from "../store/actions/usersActions.js";
import UserCard from "../components/UserCard.jsx";

const UsersList = () => {
    const dispatch = useDispatch(), users = useSelector(state => state.users.usersList);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                {users?.map(user => (
                    <UserCard
                        key={user.id}
                        id={user.id}
                        username={user.username}
                        phone={user.phone_number}
                        status={user.status}
                    />
                ))}
            </Box>
        </Container>
    );
};

export default UsersList;
