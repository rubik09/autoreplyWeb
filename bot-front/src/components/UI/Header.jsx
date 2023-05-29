import {Box, Button, Typography} from "@mui/material";
import {logoutUser} from "../../store/actions/usersActions.js";
import {historyPush} from "../../store/actions/historyActions.js";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const dispatch = useDispatch(), user = useSelector(state => state.users.user);

    return (
        <Box sx={{
            display: "flex",
            justifyContent: 'space-between',
            borderBottom: '1px solid lightGrey',
            padding: '10px'
        }}>
            <Typography component="h1" variant="h4">Auto Reply Bot</Typography>
            {user ? <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <Typography component="p">{user.email}</Typography>
                <Button variant='outlined' sx={{cursor: 'pointer'}} onClick={() => {
                    dispatch(logoutUser());
                    dispatch(historyPush('/'))
                }}>Add user</Button>
                <Button variant='outlined' sx={{cursor: 'pointer'}} onClick={() => {
                    dispatch(logoutUser());
                    dispatch(historyPush('/'))
                }}>logout</Button>
            </Box> : null}

        </Box>
    );
};

export default Header;
