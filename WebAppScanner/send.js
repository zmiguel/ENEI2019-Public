function sendData(){
    var uQR = document.getElementById("userQR").value;
    var LocID = document.getElementById("location").value;
    var Pontos = document.getElementById("pontos").value;

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