import { AsyncStorage } from 'react-native';
import Login from '../screens/Login';

const deviceStorage = {

     Login(){
        var details = {
            'username': 'TC2MT8QFJT',
            'password': '80f3b6e5',
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

           AsyncStorage.setItem('token', parsed.access_token);
           AsyncStorage.setItem('nome',"henrique");
           
        }
          
        )
    },

    async isLogged(){
      
        const value = AsyncStorage.getItem('token');
return value;
      
    },

    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
            console.log('saved')
        } catch (error) {
            console.log(`Erro a guardar! \n${error.message}`);
        }
    },

    //Carregar token
    async loadJWT() {
        try {
            const value = await AsyncStorage.getItem('userToken');
            if (value !== null) {
                this.setState({
                    jwt: value,
                    loading: false
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        } catch (error) {
            console.log(`Erro a ler token \n${error.message}`);
        }
    },


    //Apagar Token
    async deleteJWT() {
        try {
            console.log("apaga");
            await AsyncStorage.removeItem('token');
           
            
        } catch (error) {
            console.log(`Erro a ler token \n${error.message}`);
        }
    }


};

export default deviceStorage;