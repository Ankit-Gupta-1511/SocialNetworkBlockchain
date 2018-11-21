import axios from 'axios';
import cookie from 'react-cookies'

const setAuthToken = (githubToken, token) => {
    if(githubToken){
        axios.defaults.headers.common['X-Access-Token'] = githubToken;
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Cookie'] =  `_ga=${cookie.load('_ga')}; access_token=${cookie.load('access_token')}; connect.sid=${cookie.load('connect.sid')}; userId=${cookie.load('userId')};`;
        
        console.log(`_ga=${cookie.load('_ga')}; access_token=${cookie.load('access_token')}; connect.sid=${cookie.load('connect.sid')}; userId=${cookie.load('userId')};`);
    }
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;