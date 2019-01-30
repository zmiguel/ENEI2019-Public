
const api={

_retrieveData (){
    try {
      const value =  AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
       return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  },
getPersonalInfo(){

   
     var obj = {  
        method: 'GET',
        headers: {
          'Authorization':"Bearer "+ api._retrieveData(),
      
        },
    }

        return  fetch('http://enei2019.uingress.com/internal/api/Attendee/Detail', obj)  
        .then(function(res) {
          
            console.log(res);
            return res.json();
        })
         .then(function(resJson) {
             return resJson;
         })

   ;
}
}

export default api;