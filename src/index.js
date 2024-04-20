import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/global.css';
import './css/tabbar.css';
import './css/scrollbar.css';
import './css/background.css';
import './css/landing.css';

import App from './App';
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <RecoilRoot>
        <App/>
    </RecoilRoot>
    // </React.StrictMode>
);
