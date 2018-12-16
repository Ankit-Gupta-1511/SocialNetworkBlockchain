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
            window.localStorage.setItem('userId', cardData.data.userId);
            axios.post(config.host + config.identityIssue, identityData, {responseType: 'blob'})
                .then(identity => {
                    console.log(identity);
                    const file = new File([identity.data], localStorage.getItem('userId') + '.card', {type: 'application/octet-stream', lastModified: Date.now()});
                    const formData = new FormData();
                    formData.append('card', file);
                    formData.append('name', window.localStorage.getItem('userId'));
                    console.log(file);
                    console.log(formData);

                    const axiosInstance = axios.create();

                    axiosInstance({
                        method:'post',
                        url:'http://localhost:3002/api/wallet/import',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'X-Access-Token': localStorage.getItem('githubAuthToken')
                        },
                        data: formData,
                        withCredentials: true
                    }).then(data => {
                        dispatch({
                            type: REGISTER,
                            payload: {
                                message: 'successful'
                            }
                        })
                    })

                // return axios.post('wallet/import', formData, {withCredentials: true});
            });
            
            axios.post(config.host + config.registerAsset, requestData).then(data => {
                
            }); 
        });
        
    }
};