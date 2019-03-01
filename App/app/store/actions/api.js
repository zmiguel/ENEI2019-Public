import { AsyncStorage } from 'react-native';

import { NetInfo } from 'react-native';


import { DATA_AVAILABLE, API_LOGIN, CHECK_USER, LOGOUT_USER, USER_INFO, HOLD, GET_EVENTS, GET_CAREERS, GET_SESSIONS, CHANGE_GUEST, WAIT_CHANGE } from "./actionTypes" //Import the actions types constant we defined in our actions

import moment from 'moment'

import { compose } from 'redux';
 
const axios = require('axios');


export const waitChangeGuest= ()=>{
    return (dispatch)=>{
        dispatch({
            type: WAIT_CHANGE,
            });
    }

}

export const connectionState = (status) => {
    
    console.log(status);
    return { type: 'CHANGE_CONNECTION_STATUS', isConnected: status };
  };




///Attendee/AvailableGuestlists


axios.defaults.baseURL = 'http://enei2019.uingress.com/internal/api'

export  function getAvailableGuestlists(token){

   
   
    axios.defaults.headers.common = {'Authorization': `bearer ${token.access_token}`}
    
    return (dispatch)=>{

        axios.get('/Attendee/AvailableGuestlists')
        .then(function (response) {
        
            // handle success
            console.log(response);
            dispatch({
                type: GET_CAREERS,
                guests: response.data
            
                });
         })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
}



/*
    8  - group
    9  - IA
    10 - NET
    11 - MOB
    12 - IOT
    14 - WB
    15 - DS

*/
export function changeGuestList(token, guestID){
    //http://enei2019.uingress.com/internal/api/Attendee/ChangeGuestlist/
    
   
    axios.defaults.headers.common = {'Authorization': `bearer ${token.access_token}`}
    

    return (dispatch)=>{

        var full= `/Attendee/ChangeGuestlist/${guestID}`
console.log(full)
        axios.get(full)
        .then(function (response) {
        
            // handle success
            console.log(response);
            dispatch({
                type: CHANGE_GUEST,
                //guests: response.data
            
                });
         })
        .catch(function (error) {
            // handle error
            console.log(response);
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
}

export function getAvailableSessions(token){
    //http://enei2019.uingress.com/internal/api/Attendee/AvailableSessions

    axios.defaults.baseURL = 'http://enei2019.uingress.com/internal/api'
   
    axios.defaults.headers.common = {'Authorization': `bearer ${token.access_token}`}
    
    return (dispatch)=>{

        axios.get('/Attendee/AvailableSessions')
        .then(function (response) {
        
            // handle success
            console.log(response);
            dispatch({
                type: GET_SESSIONS,
               sessions: response.data
            
                });
         })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

}

export function getEvents(user){

    return (dispatch)=>{

    let events = [];
    console.log("chegou aqui")


    for(let key in user.Sessions){

        events.push({
            time: moment(user.Sessions[key].SessionStart).format('h:mm'),
            timeEnd: moment(user.Sessions[key].SessionEnd).format('h:mm'),
            //lineColor:'#009688',
            imageUrl: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/Vjkyj2hBg/welcome-white-sign-with-falling-colorful-confetti-animation-on-white-background_sglmmh3qm__F0013.png',
            description:user.Sessions[key].Description,
            name:user.Sessions[key].Name,
            Enrolled:user.Sessions[key].Enrolled,
            MaxAttendees:user.Sessions[key].MaxAttendees
      })
      
    }

    dispatch({
    type: GET_EVENTS,
    events: events

    });

    }
}

const saveToken = async token => {
  

    try {
        await AsyncStorage.setItem('refreshToken', token.refreshToken).catch(a=>{
            
        })
        await AsyncStorage.setItem('userToken', token.access_token).catch(a=>{

        })
        await AsyncStorage.setItem('expirationDateToken', token.expirationDateToken.toString()).catch(a=>{
            
        }) 
      

    } catch (error) {

        // Error retrieving data
        console.log(error.message);

    }
   
  };
  

  const getToken = async () => {

    obj={}
    try {

        obj.access_token = await AsyncStorage.getItem('userToken') || 'none';
        obj.expirationDateToken = await AsyncStorage.getItem('expirationDateToken') || 'none';
        obj.refreshToken = await AsyncStorage.getItem('refreshToken') || 'none';
     
         

    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return obj;
}


const deleteToken = async () => {

    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('expirationDateToken');
      await AsyncStorage.removeItem('refreshToken');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

const renewToken=(refresh)=>{


   

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
            co
            dispatch({
                type: API_LOGIN, 
                logged:false,
                failedAttempt:true,
                tokenData:'error'
            });



        }).then(res=>res.json()).then(parsed=>{

            if(parsed.error_description=="Provided username and password is incorrect"){
                dispatch({
                    type: API_LOGIN, 
                    logged:false, 
                    failedAttempt:true,
                    token: obj,
                    user:{Name:'Henrique'}
    
                });
            }
            var obj={
                access_token:parsed.access_token,
                expirationDateToken:Math.round(new Date().getTime()/1000) + 3598,
                refreshToken:parsed.refresh_token,
                valid:true
            };
            
            var details={
                username:user,
                password:pass
            }
            dispatch({
                type: API_LOGIN, 
                logged:true, 
                failedAttempt:false,
                token:obj,
                user:{Name:'Henrique'},
                userDetails: details

            });
            
             
       
        }
                   
        )

           
    }
}
export function hold(){
    return (dispatch)=>{
        dispatch({
            type: HOLD, 
             onHold:true
        
        });
    }
}



export function getUserInfo(token){


        
    return (dispatch)=>{

            //TODO: verificar validade do token

            console.log('Chamada "getUserInfo"');
            
            var obj = {  

            method: 'GET',
                headers: {

                    'Authorization': `Bearer ${token.access_token}`,
                },
            }

            fetch('http://enei2019.uingress.com/internal/api/Attendee/Detail', obj)  
    
            .then(function(res) {
              
                console.log(res);
                let obj = JSON.parse(res._bodyText);

                dispatch({ type: USER_INFO, user: obj,onHold:false, logged:true });
    
            }).catch(function(res){

                console.log("erro")
              //  dispatch({ type: USER_INFO,onHold:false});
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

//
function refreshToken(){

    refresh=a.refreshToken
                
    //chamar funçao para renovar
    console.log("expirou")
    
    var details = {

        'grant_type': 'refresh_token',
        'refresh_token':refresh 

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

    }).then(res=>res.json()).then(parsed=>{

        console.log(parsed);

        if(parsed.error=='invalid_grant'){

            console.log(formBody);
            dispatch({type: CHECK_USER, token:'', logged:false, onHold:false});    

        }else{

        var obj={
            access_token:parsed.access_token,
            expirationDateToken:Math.round(new Date().getTime()/1000) + 3598,
            refreshToken:parsed.refresh_token,
            valid:true

            
        };
   
       // deleteToken();  
        saveToken(obj).then(a=>{
            console.log("Token guardado" )
            console.log(obj)
            dispatch({type: CHECK_USER, token:obj, logged:true, onHold:false});             

        })
    }
        
    
    }).catch(a=>{
        console.log("erro na api")
        dispatch({type: CHECK_USER, token:'', logged:false, onHold:false});             
    })

}

 refreshLogin= async (user, pass)=>{

  
    console.log("login")


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
       

    }).then(res=>res.json()).then(parsed=>{

        if(parsed.error_description=="Provided username and password is incorrect"){

           console.error("cenas da vida")

        }
        else{

            console.log(parsed)

            var obj={
                access_token:parsed.access_token,
                expirationDateToken:Math.round(new Date().getTime()/1000) + 3598,
                refreshToken:parsed.refresh_token,
                valid:true
            };
         
            go();
            return obj;
              
         
        }

    }
               
    )

}


go=(t)=>{
    dispatch({type: CHECK_USER, logged:true, onHold:false, user:{Name:'Henrique'}, token:t});  
}




export function checkUser(userDetails){
    
    var u=  userDetails;
    
    return (dispatch)=>{
       
        //verifica se existe utilizador em memória
        if(
            userDetails.username != undefined && 
            userDetails.username != ''        &&
            userDetails.password != undefined && 
            userDetails.password != ''
            
            ){
           
            //verifica a validade do token
            if(Math.round(new Date().getTime()/1000) >= userDetails.token.expirationDateToken){
                
             
                var details = {
                    'username': userDetails.username,
                    'password': userDetails.password,
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
                   
            
                }).then(res=>res.json()).then(parsed=>{
            
                    if(parsed.error_description=="Provided username and password is incorrect"){
            
                       console.error("cenas da vida")
            
                    }
                    else{
            
                        console.log(parsed)
            
                        var obj={
                            access_token:parsed.access_token,
                            expirationDateToken:Math.round(new Date().getTime()/1000) + 3598,
                            refreshToken:parsed.refresh_token,
                            valid:true
                        };
                        
                        dispatch({type: CHECK_USER, logged:true, onHold:false, userDetails:u,token:obj}); 
                          
                     
                    }
            
                }                          
                )
            }else{
                console.log("Tempo restante token: "+ Math.round((userDetails.token.expirationDateToken-Math.round(new Date().getTime()/1000) )/60) +" Minutos");
    
                //dispatch home
                dispatch({type: CHECK_USER,  logged:true, onHold:false, user:{Name:'Henrique'},userDetails:u});

            }


        }
        //utilizador não existe em memória
        else{
        
            dispatch({type: CHECK_USER,logged:false, onHold:false,userDetails:u});
            //dispatch menu de login
        }
    }}