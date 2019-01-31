export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const API_LOGIN = 'API_LOGIN';
export const CHECK_USER='CHECK_USER';
export const LOGOUT_USER= 'LOGOUT_USER';
export const USER_INFO= 'USER_INFO'

import { AsyncStorage } from 'react-native';


//Import the sample data
import Data from '../intructions.json';
import Login from '../screens/Login.js';
 
export function getData(){
    return (dispatch) => {
 
        //Make API Call
        //For this example, I will be using the sample data in the json file
        //delay the retrieval [Sample reasons only]
        setTimeout(() => {
            const data  = Data.instructions;
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 2000);
 
    };
}
const saveToken = async token => {
    try {

      await AsyncStorage.setItem('userToken', token);

    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  

  const getToken = async () => {
    var tokem;
    try {
    token = await AsyncStorage.getItem('userToken') || 'none';
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return token;
  }

const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }


export function login(user, pass){

    return (dispatch)=>{

        console.log('user: ' +user + ' password: '+pass );
        var details = {
            'username': user,
            'password': pass,
            'grant_type': 'password'
        };
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        fetch('http://enei2019.uingress.com/internal/api/token', {

          method: 'POST',

          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody

        }).catch(err=>{

            console.log(err);
            alert("error");
            dispatch({
                type: API_LOGIN, 
                loggedIn:false, 
                tokenData:'error'
            });

        }).then(res=>res.json()).then(parsed=>{
            
            console.log('parsed'+parsed.access_token)
            
          //  deviceStorage.saveItem(parsed.access_token);
            try {

                saveToken(parsed.access_token).then(a=>{
                    console.log('sucess');
                }).catch(a=>{
                    console.log('error saving')
                })

            } catch (error) {
                console.log('Error saving token')
            }

            dispatch({
                type: API_LOGIN, 
                loggedIn:true, 
                token:true,
                tokenData:parsed
            });
        }
           
            
        ).then(a=>{})

        
           
    }
}

export function getUserInfo(){
    return (dispatch)=>{
        getToken().then(a=>{

            console.log('get user info');
            var token;
         var obj = {  
            method: 'GET',
                headers: {
                    'Authorization':"Bearer "+a,
                },
            }
    
            fetch('http://enei2019.uingress.com/internal/api/Attendee/Detail', obj)  
    
            .then(function(res) {
              
                //console.log(res._bodyText);
                
                var obj = JSON.parse(res._bodyText);

                dispatch({
                    type: USER_INFO, 
                     user: obj
                
                });
    
    
            })
             .then(function(resJson) {
            
            })
        })

       
    
    }
}

export function logoutUser(){
    return (dispatch)=>{
        
        deleteToken().then(a=>{

            console.log('token apagado');
            dispatch({
                type: LOGOUT_USER, 
                loggedIn:false,
                tokenData:'error',
                token:false
            });
        }).catch(err=>{

            console.log('errors');
            
        })
       
    }
}

export function checkUser(){
    return (dispatch)=>{
        
        getToken().then(a=>{

            console.log('sucess: '+a)
            
            if(a=='none'){
                dispatch({type: CHECK_USER,token:false, tokenData:'error', });

            }
            else{
                dispatch({type: CHECK_USER,token:true, tokenData:a,});
            }
            
           
        }).catch(a=>{
            console.log('erros');
            dispatch({type: CHECK_USER,token:false, tokenData:'error'});
        })

    
    }
}


