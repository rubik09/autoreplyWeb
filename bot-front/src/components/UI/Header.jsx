import {Box, Button, Typography} from "@mui/material";
import {historyPush} from "../../store/actions/historyActions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logoutAdmin} from "../../store/actions/adminsActions";

const Header = () => {
    const push = useNavigate();
    const dispatch = useDispatch(), user = useSelector(state => state.users.user);
    const path = window.location.pathname;

    return (
        <Box sx={{
            display: "flex",
            justifyContent: 'space-between',
            borderBottom: '1px solid lightGrey',
            padding: '10px'
        }}>
            <Typography component="h1" variant="h4" sx={{cursor: 'pointer'}} onClick={() => {
                push('/')
            }}>Auto Reply CRM</Typography>
            {user ? <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <Typography component="p">{user.email}</Typography>
                {path !== '/add' && path !== '/api' && path !== '/code' && path !== '/answer' ? <Button variant='outlined' sx={{cursor: 'pointer'}} onClick={() => {
                    push('/add')
                }}>Добавить Личку</Button> : null}
                <Button variant='outlined' sx={{cursor: 'pointer'}} onClick={() => {
                    dispatch(logoutAdmin(user.id));
                    dispatch(historyPush('/'))
                }}>Выйти</Button>
            </Box> : null}

        </Box>
    );
};

export default Header;
