function sendData(){
  var LocIDbox = document.getElementById("location")

  var uQR = document.getElementById("userQR").value;
  var LocID = LocIDbox.options[LocIDbox.selectedIndex].value;
  var Pontos = document.getElementById("pontos").value;

  axios.defaults.headers.common = {
    Authorization: "bearer " + Cookies.get().token
  };
  axios.post('https://enei.pt/api/EventLocsVisited/add', {
      UserQR: uQR,
      EventLocID: LocID,
      pontos:Pontos
    })
    .then(function (response) {
      if(response.status === 201){
          window.alert("Adicionado com sucesso!!");
      }else if(response.status === 400){
          window.alert("Erro na API!\nProvavelmente esta equipa já esteve aqui!!");
      } else{
          window.alert("Erro!");
          console.log(response);
      }
    })
    .catch(function (error) {
      window.alert("erro");
      console.log(error);
    });
}

function doLogin(){
  var loginQR = document.getElementById("LoginQR").value;
  var loginpassword = document.getElementById("LoginPassword").value;
  
  //login ticket

  var details = {
    username: loginQR,
    password: loginpassword,
    grant_type: "password"
  };

  var formBody = [];

  for (var property in details) {
    var encodedKey = encodeURIComponent(property);

    var encodedValue = encodeURIComponent(details[property]);

    formBody.push(encodedKey + "=" + encodedValue);
  }

  formBody = formBody.join("&");

  fetch("https://tickets.enei.pt/internal/api/token", {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },

    body: formBody
  })
  .then(res => res.json())
  .then(parsed => {
    var tokenext = parsed.access_token;
    //login api enei
    axios.post('https://enei.pt/api/loginQR', {
      QRcode: loginQR,
      token: tokenext
    })
    .then(function (response) {
      if(response.status === 200){
          window.alert("Login Feito!!");
          console.log(response.data);
          Cookies.set('token',response.data.token);
          location.reload();
      }else if(response.status === 401){
          window.alert("Unauthorized!!  ");
      } else{
          window.alert("Erro!");
          console.log(response);
      }
    })
    .catch(function (error) {
      window.alert("erro");
      console.log(error);
    });
  });
}

$(document).ready(function(){
  console.log(Cookies.get().token);
  if(Cookies.get().token){
    console.log("token ja existe");
    $('#LoginDiv').hide();
  }else{
    $('#LoginDiv').show();
  }
}) 