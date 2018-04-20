import cookies from 'browser-cookies';

const cookieUtil = {
    set: (key, value) => {
        cookies.set(key, value);
    },
    get: (key) => {
        return cookies.get(key);
    },
    remove: (key) => {
        cookies.erase(key);
    }
};

export default cookieUtil;