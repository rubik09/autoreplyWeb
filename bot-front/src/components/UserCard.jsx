import {Box, Button} from "@mui/material";
import {logoutUser} from "../store/actions/usersActions.js";
import {historyPush} from "../store/actions/historyActions.js";

const UserCard = (props) => {
    const statusColor = props.status ? 'green' : 'red';
    return (
        <Box sx={{
            border: '1px solid lightGrey',
            marginTop: 2,
            MarginBottom: 2,
            borderRadius: '5px',
            padding: '10px',
            Height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <Box sx={{width: '400px'}}>
                <p>
                    {props.username}
                </p>
                <p>
                    +{props.phone}
                </p>
            </Box>
            <Box sx={{width: '400px', textAlign: 'center'}}>
                <Box sx={{
                    borderRadius: '50%',
                    height: '20px',
                    width: '20px',
                    background: statusColor,
                    margin: 'auto'
                }}/>
            </Box>
            <Box sx={{width: '400px', textAlign: 'right'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Button variant='outlined' sx={{cursor: 'pointer', width: '100px'}} onClick={() => {
                            // dispatch(logoutUser());
                            // dispatch(historyPush('/'))
                        }}>{props.status ? 'stop' : 'start'}</Button>
                    </Box>
            </Box>
        </Box>
    );
};

export default UserCard;
