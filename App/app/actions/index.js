export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const API_LOGIN = 'API_LOGIN';
export const CHECK_USER='CHECK_USER';
export const LOGOUT_USER= 'LOGOUT_USER';
export const USER_INFO= 'USER_INFO'
export const HOLD='HOLD'


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
                logged:false, 
                tokenData:'error'
            });

        }).then(res=>res.json()).then(parsed=>{

            var obj={
                access_token:parsed.access_token,
                expirationDateToken:Math.round(new Date().getTime()/1000) + parsed.expires_in,
                refreshToken:parsed.refresh_token,
                valid:true
            };

        
    
            //  deviceStorage.saveItem(parsed.access_token);
        
                saveToken(obj).then(a=>{

                    obj.valid=true;
                    
                    dispatch({
                        type: API_LOGIN, 
                        logged:true, 
                        token: obj
        
                    });

                }).catch(a=>{

                    console.log('error saving')

                    obj.valid=false;

                    dispatch({
                        type: API_LOGIN, 
                        logged:true, 
                        token: obj

        
                    });
                })
             
       
        }
                   
        ).then(a=>{
            dispatch({
                type: API_LOGIN, 
                logged:true, 
                token: obj

            });
        })

           
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
                    'Authorization':"Bearer "+token.access_token,
                },
            }

            fetch('http://enei2019.uingress.com/internal/api/Attendee/Detail', obj)  
    
            .then(function(res) {
              
                
                var obj = JSON.parse(res._bodyText);

                dispatch({ type: USER_INFO, user: obj,onHold:false, logged:true });
    
            })
             .then(function(resJson) {

                dispatch({ type: USER_INFO, user: '',onHold:false, logged:true });
            
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

export function checkUser(){

    return (dispatch)=>{
        
        getToken().then(a=>{

            
            if(a.access_token=='none'){
                
                a.valid=false;
                
                console.log('check user deu falso')
                
                dispatch({type: CHECK_USER,token:a,logged:false, onHold:false});
              
            }
            else{
                
                a.valid=true;


                console.log('Existe Token em memória' )

                //se expirar 
                if(Math.round(new Date().getTime()/1000) >= a.expirationDateToken){

                    a.valid=false;

                  
                    //chamar funçao para renovar


                }

                console.log("Tempo restante token: "+ Math.round((a.expirationDateToken-Math.round(new Date().getTime()/1000) )/60) +" Minutos");
    
                //fazer validação da data e renovar o token

                dispatch({type: CHECK_USER, token:a, logged:true, onHold:false});
            }
            
           
        }).catch(a=>{

            console.log('erros');
            dispatch({type: CHECK_USER,token:false, logged:false});
        })

    
    }
}


