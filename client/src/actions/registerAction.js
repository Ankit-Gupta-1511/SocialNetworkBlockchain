import axios from 'axios';

const config = require('../config/config');

export const REGISTER = "REGISTER";

export const initRegister = (data) => {
    let id = data.email.substring(0, data.email.indexOf("@"));
    
    console.log(id);

    let userData = {
        "$class": "org.example.socialnetwork.User",
        "userId": "User-" + id
      };
    
    let identityData = {
        "$class": "org.hyperledger.composer.system.Identity",
        "participant": "org.example.socialnetwork.User#User-"+id,
        "userID": "User-"+id,
        "options": {}
          
    }  

    var requestData = {
        "$class": "org.example.socialnetwork.Profile",
        "profileId": "Profile-" + id,
        "owner": "resource:org.example.socialnetwork.User#User-" + id,
        "name": data.name,
        "email": data.email,
        "subscribedTo": []
      }
    return dispatch => {
        axios.post(config.host + config.registerUser, userData).then(cardData => {
            window.localStorage.setItem('userId', cardData.userId);
            axios.post(config.host + config.identityIssue, identityData).then(data => {
                console.log(data);
                
                window.localStorage.setItem('identity',data.data);
            });
            
            axios.post(config.host + config.registerAsset, requestData).then(data => {
                dispatch({
                    type: REGISTER,
                    payload: data.data
                })
            }); 
        });
        
    }
};