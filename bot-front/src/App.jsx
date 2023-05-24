import {Route, Routes} from 'react-router-dom';
import {useSelector} from "react-redux";
import Auth from "./containers/Auth.jsx";
import MainPage from "./containers/MainPage.jsx";
import CodePage from "./containers/CodePage.jsx";
import AnswerPage from "./containers/AnswerPage.jsx";
import SuccessPage from "./containers/SuccessPage.jsx";

function App() {
    const user = useSelector((state) => state.users.user);

    return (
        <div>
            {user ?
                <Routes>
                    <Route path='/main' element={<MainPage/>}/>
                    <Route path='/code' element={<CodePage/>}/>
                    <Route path='/answer' element={<AnswerPage/>}/>
                    <Route path='/success' element={<SuccessPage/>}/>
                </Routes>
                :
                <Routes>
                    {user ? null : <Route path='*' element={<Auth/>}/>}
                </Routes>}
        </div>
    )
}

export default App
