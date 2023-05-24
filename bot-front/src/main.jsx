import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Router} from "react-router-dom";
import history from "./history.js";
import {Provider} from "react-redux";
import store from "./store/configureStore";

const app = (
    <Provider store={store}>
        <BrowserRouter basename='/'>
            <App/>
        </BrowserRouter>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);