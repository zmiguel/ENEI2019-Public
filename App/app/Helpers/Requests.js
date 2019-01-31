const axios = require('axios');

const url = "http://enei2019.uingress.com/internal/api/token";

export function getToken(userName, password) {

    let headers = {
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    let request = {
        method: 'GET',
        headers: headers,
        body: {
            username: userName,
            password: password,
            grant_type: 'password'
        }
    };

    fetch(url, request).then(response => {
        return response.json()
    })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
};
