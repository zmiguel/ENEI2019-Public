import {AsyncStorage} from 'react-native';
import Login from '../screens/Login';

  cenas={

   

    
    loginAPI(user, pass){
        var details = {
            'username': user,
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

        }).then(res=>res.json()).then(parsed=>{console.log(parsed)
            deviceStorage.saveItem(parsed.access_token);},
            this.setState(previousState => (
                { loggedIn: true }
              ))
        )
    }


}
export default cenas;