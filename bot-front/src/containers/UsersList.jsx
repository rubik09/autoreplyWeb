import {Button, Container} from "@mui/material";
import Header from "../components/UI/Header";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {useNavigate} from "react-router-dom";
import {changeStatus, deleteUser, fetchClients} from "../store/actions/clientsActions";

const UsersList = () => {
    const dispatch = useDispatch(), users = useSelector(state => state.users.usersList);
    const push = useNavigate();

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const columns = [
        {field: 'user_id', headerName: 'User Id', width: 150},
        {field: 'username', headerName: 'Username', width: 200},
        {field: 'phone_number', headerName: 'Номер телефона', width: 200},
        {field: 'region', headerName: 'Гео', width: 200},
        {field: 'status', headerName: 'Статус', type: 'boolean', width: 150},
        {
            field: 'Start/Stop button',
            headerName: '',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button variant='outlined' sx={{cursor: 'pointer', width: '100px'}} onClick={() => {
                    dispatch(changeStatus(params.row.user_id))
                }}>{params.row.status ? 'Стоп' : 'Старт'}</Button>
            )
        },
        {
            field: 'edit button',
            headerName: '',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button variant='outlined' onClick={() => push(`/edit/${params.row.user_id}`)}
                        sx={{cursor: 'pointer', width: '100px'}}>Изменить</Button>
            )
        },
        {
            field: 'delete button',
            headerName: '',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button variant='contained' color='error' onClick={() => dispatch(deleteUser(params.row.user_id))}
                        sx={{cursor: 'pointer', width: '100px'}}>Удалить</Button>
            )
        },
    ];

    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <div style={{height: 800, width: '100%'}}>
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
