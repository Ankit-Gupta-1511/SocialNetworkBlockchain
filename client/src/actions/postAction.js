import axios from "axios";

const config = require('../config/config')

export const ADD_POST = "ADD_POST";
export const ALL_POST = "ALL_POST";


export const addPost = (data) => {
    var id = window.localStorage.getItem('userId');
    var requestData = {
        "$class": "org.example.socialnetwork.Post",
        "postId": "Post-" + id + Math.random(),
        "owner": "resource:org.example.socialnetwork.User#"+ id,
        "data": {
          "$class": "org.example.socialnetwork.PostData",
          "text": data.text,
          "image": "string",
          "comment": []
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
    var id = window.localStorage.getItem('userId');
    return dispatch => {
        axios.get(config.host + config.getPostsByUserId, {
            params: {
                owner: "resource:org.example.socialnetwork.User#"+ id
            }
        }).then(data => {
            console.log(data)
            dispatch({
                type: ALL_POST,
                payload: data.data
            })
        });
    }
};