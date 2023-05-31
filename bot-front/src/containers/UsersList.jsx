import {Button, Container} from "@mui/material";
import Header from "../components/UI/Header.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUsers} from "../store/actions/usersActions.js";
import {DataGrid} from '@mui/x-data-grid';

const UsersList = () => {
    const dispatch = useDispatch(), users = useSelector(state => state.users.usersList);

    console.log(users)
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const columns = [
        {field: 'user_id', headerName: 'User id', width: 150},
        {field: 'username', headerName: 'User name', width: 200},
        {field: 'phone_number', headerName: 'Phone number', width: 200},
        {field: 'region', headerName: 'Region', width: 150},
        {field: 'status', headerName: 'Status', type: 'boolean', width: 150 },
        {
            field: '1',
            headerName: '',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button variant='outlined' sx={{ cursor: 'pointer', width: '100px' }}>{params.row.status ? 'Stop' : 'start'}</Button>
            )
        },
        {
            field: '2',
            headerName: '',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button variant='outlined' sx={{ cursor: 'pointer', width: '100px' }}>Edit</Button>
            )
        },
    ];

    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={users?.length ? users : []}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 20},
                        },
                    }}
                    pageSizeOptions={[20, 50, 100, 200]}
                />
            </div>
        </Container>
    );
};

export default UsersList;
