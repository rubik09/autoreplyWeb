import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/configureStore";
import {createTheme, ThemeProvider} from "@mui/material";
import {ruRU} from "@mui/x-data-grid";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme(
    ruRU,
);

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
        <BrowserRouter basename='/'>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                pauseOnHover={true}/>
            <App/>
        </BrowserRouter>
        </ThemeProvider>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
