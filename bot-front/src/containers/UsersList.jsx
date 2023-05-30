import {Box, Container} from "@mui/material";
import Header from "../components/UI/Header.jsx";

const UsersList = () => {
    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                list
                {/*{users.map(user => (*/}
                {/*    user?.status ?*/}
                {/*        <UserCard*/}
                {/*            key={user._id}*/}
                {/*            name={user.name}*/}
                {/*            history={props.history}*/}
                {/*            id={user._id}*/}
                {/*        /> : null*/}
                {/*))}*/}
            </Box>
        </Container>
    );
};

export default UsersList;
