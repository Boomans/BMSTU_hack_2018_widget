import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Main.jsx';
import cookieUtils from '../../../src/utils/cookie.js';

const cookieKey = window.widget.data.cookieKey;
const containerId = window.widget.data.containerId;
if (!cookieKey) {
    mount();
} else {
    const checkId = setInterval(() => {
        if (cookieUtils.get(cookieKey)) {
            mount();
        } else {
            unmount();
        }
    }, 1000);
}

function mount() {
    ReactDOM.render(
        <Main/>,
        document.getElementById(containerId)
    );
}

function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
}