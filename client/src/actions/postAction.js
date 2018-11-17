import axios from "axios";

const config = require('../config/config')

export const ADD_POST = "ADD_POST";
export const ALL_POST = "ALL_POST";


export const addPost = (data) => {
    var id = window.localStorage.getItem('userId');
    var requestData = {
        "$class": "org.example.socialnetwork.Post",
        "postId": "Post-" + id,
        "owner": "resource:org.example.socialnetwork.User#User-"+ id,
        "data": {
          "$class": "org.example.socialnetwork.PostData",
          "text": data.text,
          "image": "string",
          "comment": [],
          "id": "postData-" + id
        },
        "sharedTo": []
    }

    return dispatch => {
        axios.post(config.host + config.registerPost, requestData).then(data => {
            dispatch({
                type: ADD_POST,
                payload: data.data
            })
        });
    }
};

export const getAllPosts = () => {
    return dispatch => {
        axios.get('/api/posts').then(data => {
            dispatch({
                type: ALL_POST,
                payload: data.data
            })
        });
    }
};