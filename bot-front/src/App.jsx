import {Route, Routes} from 'react-router-dom';
import {useSelector} from "react-redux";
import Auth from "./containers/Auth.jsx";
import ApiPage from "./containers/addUser/ApiPage.jsx";
import CodePage from "./containers/addUser/CodePage.jsx";
import AnswerPage from "./containers/addUser/AnswerPage.jsx";
import UsersList from "./containers/UsersList.jsx";
import MainInfoPage from "./containers/addUser/MainInfoPage.jsx";
import UserChange from "./containers/UserChange.jsx";
import Info from "./containers/Info.jsx";

function App() {
    const user = useSelector((state) => state.users.user);

    return (
        <div>
            {user ?
                <Routes>
                    <Route path='/' element={<UsersList/>}/>
                    <Route path='/add' element={<MainInfoPage/>}/>
                    <Route path='/edit/:id' element={<UserChange/>}/>
                    <Route path='/info/:id' element={<Info/>}/>
                    <Route path='/api/:id' element={<ApiPage/>}/>
                    <Route path='/code/:id' element={<CodePage/>}/>
                    <Route path='/answer/:id' element={<AnswerPage/>}/>
                </Routes>
                :
                <Routes>
                    {user ? null : <Route path='*' element={<Auth/>}/>}
                </Routes>}
        </div>
    )
}

export default App
