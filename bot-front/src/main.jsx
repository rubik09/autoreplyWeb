import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/configureStore";
import {createTheme, ThemeProvider} from "@mui/material";
import {ruRU} from "@mui/x-data-grid";

const theme = createTheme(
    ruRU,
);

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
        <BrowserRouter basename='/'>
            <App/>
        </BrowserRouter>
        </ThemeProvider>;
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
