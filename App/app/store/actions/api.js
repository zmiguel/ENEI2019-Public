import { AsyncStorage } from "react-native";

import { NetInfo, Alert } from "react-native";

var _ = require("lodash");

import {
  TIMERWAIT_CHANGE,
  SESSION_BLOCKS,
  DATA_AVAILABLE,
  API_LOGIN,
  CHECK_USER,
  LOGOUT_USER,
  USER_INFO,
  HOLD,
  GET_EVENTS,
  GET_CAREERS,
  GET_SESSIONS,
  CHANGE_GUEST,
  WAIT_CHANGE,
  SIGN_SESSION,
  OPEN_MODAL,
  LOADINGLOGIN,
  REMOVE_SESSION,
  UPDATE_USER
} from "./actionTypes"; //Import the actions types constant we defined in our actions

import moment from "moment";

import { compose } from "redux";
import tap from "lodash/fp/tap";
import flow from "lodash/fp/flow";
import groupBy from "lodash/fp/groupBy";
import { colors } from "react-native-elements";

const axios = require("axios");

axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";


const map = require("lodash/fp/map").convert({ cap: false });

export function waitLogin() {
  return dispatch => {
    dispatch({
      type: LOADINGLOGIN
    });
  };
}

var checkAndRefresh = function(token) {
  return new Promise(function(resolve, reject) {
    //verificar se já expirou a validade do token
    if (token == undefined || token.access_token == undefined) {
      reject("user logged out");
      console.log("fds");
    } else if (
      Math.round(new Date().getTime() / 1000) >= token.expirationDateToken
    ) {
      console.log("vai renovar");
      var obj;

      var details = {
        refresh_token: token.refresh_token,
        grant_type: "refresh_token"
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
        .catch(err => {
          console.log(err);
          alert("Erro no login!!");

          alert("error");
          reject("ERRRO");
        })
        .then(res => res.json())
        .then(parsed => {
          if (parsed.error == "invalid_grant") {
            reject("erro");
          } else {
            var obj = {
              access_token: parsed.access_token,
              refresh_token: parsed.refresh_token,
              expirationDateToken:
                Math.round(new Date().getTime() / 1000) + 3598
            };
            resolve(obj);
            console.log(parsed);
          }
        });
    } else {
      console.log(
        "Tempo restante token: " +
          Math.round(
            (token.expirationDateToken -
              Math.round(new Date().getTime() / 1000)) /
              60
          ) +
          " Minutos"
      );
      resolve(token);
    }
  });
};

export function changePassword(token, old, new1, new2) {
  return dispatch => {
    axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";
    checkAndRefresh(token)
      .then(newToken => {
        axios.defaults.headers.common = {
          Authorization: `bearer ${newToken.access_token}`
        };
        if (new1 != new2) {
          Alert.alert("ERRO!", "As passords são diferentes...");
        } else {
          axios
            .post("/User/ChangePassword", {
              OldPassword: old,
              NewPassword: new1
            })
            .then(a => {
              Alert.alert("Sucesso!", "Password alterada com sucesso");
            })
            .catch(p => {
              Alert.alert(
                "ERRO!",
                "Erro a alterar a password.\nA palavra original é inválida...\nCaso o erro persista verifica a tua conexão à internet e tenta novamente"
              );
            });

          dispatch({
            type: OPEN_MODAL
          });
        }
      })
      .catch(err => {
        Alert.alert(
          "Token ERROR!",
          "Parace que houve um erro com o teu token... Reinicia a App. Caso o problema se mantenha, volta e instalar"
        );
      });
  };
}
//faz autenticação com API interna
export function loginInternal(userDetails) {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
  return dispatch => {
    axios
      .post("/api/login", {
        username: "cena",
        password: "password"
      })
      .then(a => {
        console.log("sucesso!");
        console.log(a);
      })
      .catch(p => {
        console.log(p);
      });

    dispatch({
      type: OPEN_MODAL
    });
  };
}

export function openModal(info, t) {
  return dispatch => {
    dispatch({
      type: OPEN_MODAL,
      modalInfo: info,
      modalType: t
    });
  };
}

export function closeModal() {
  return dispatch => {
    dispatch({
      type: OPEN_MODAL,
      modalInfo: info
    });
  };
}

export function updateUser(token, user) {
  axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";

  return dispatch => {
    checkAndRefresh(token)
      .then(newToken => {
        axios.defaults.headers.common = {
          Authorization: `bearer ${newToken.access_token}`
        };
        axios

          .post("/Attendee/Edit", user)

          .then(a => {
            Alert.alert(
              "Sucesso",
              "As informações pessoais foram guardadas com sucesso."
            );

            console.log(a.data);
            dispatch({
              type: UPDATE_USER,
              user: a.data
            });
          })
          .catch(b => {
            Alert.alert(
              "ERRO!",
              "Ocorreu um erro a guardar os dados pessoais."
            );
            alert(b);
          });
      })
      .catch(err => {
        Alert.alert(
          "Token ERROR!",
          "Parace que houve um erro com o teu token... Reinicia a App. Caso o problema se mantenha, volta e instalar"
        );
      });
  };
}
function getCareerPath(sessions) {
  careerPath = "Sem Career Path";
  careerColor = "white";

  for (let key in sessions) {
    if (sessions[key].Name == "IA") {
      careerPath = "Artificial Inteligence";
      careerColor = "#CC1A17";
    }
    if (sessions[key].Name == "IOT") {
      careerPath = "Internet of Things";
      careerColor = "green";
    }
    if (sessions[key].Name == "WEB") {
      careerPath = "Web Development";
      careerColor = "purple";
    }
    if (sessions[key].Name == "NET") {
      careerPath = "Networking and Security";
      careerColor = "blue";
    }
    if (sessions[key].Name == "MOB") {
      careerPath = "Mobile Development";
      careerColor = "orange";
    }
    if (sessions[key].Name == "DS") {
      careerPath = "Data Science";
      careerColor = "yellow";
    }
  }
  return { name: careerPath, color: careerColor };
}
export const waitChangeGuest = () => {
  return dispatch => {
    dispatch({
      type: WAIT_CHANGE
    });
  };
};
export const timerChangeGuest = () => {
  return dispatch => {
    dispatch({
      type: TIMERWAIT_CHANGE
    });
  };
};

export const connectionState = status => {
  console.log(status);
  return { type: "CHANGE_CONNECTION_STATUS", isConnected: status };
};

export function removeSession(user, token, idSession) {

   var obj = {
    IdSession: idSession,
    Direction: 0
  };

  return dispatch => {
    //adiciona participante a uma palestra
    checkAndRefresh(token)
    .then(newToken => {
    axios.defaults.headers.common = {
      Authorization: `bearer ${newToken.access_token}`
    };
  
    axios
      .post("/Session/RemoveAttendee", obj)
      //se não existir erro na chamada...
      .then(a => {
        console.log(a);
        if (a.data.Success) {
          axios
            .get("/Attendee/AvailableSessions")

            .then(function(response) {
              console.log(response);

              var sessions = response.data;
              var careerPath = getCareerPath(sessions);
              var cenas = [];

              const result = flow(groupBy("SessionStart"))(response.data);

              for (let key in result) {
                result[key].option = 0;
                cenas.push(result[key]);
              }

              Alert.alert(
                "Sucesso",
                "A inscrição na sessão foi removida com sucesso!"
              );

              //obter informações pessoais:
              axios
                .get("/Attendee/Detail")

                .catch(error => {
                  alert(error);
                })
                .then(sucess => {
                  dispatch({
                    type: REMOVE_SESSION,
                    sessions: response.data,
                    Blocks: cenas,
                    changeGuestList: false,
                    careerPath: careerPath,
                    user: sucess.data
                  });
                  getEvents(user);
                });
            })
            .catch(function(error) {
              alert("Erro a obter sessões disponíveis!!");

              console.log(error);
            });
        } else {
          alert("Erro a inscrever na palestra");
          dispatch({
            type: REMOVE_SESSION,
            waitChangeGuest: false
          });
        }
      })
      .catch(b => {
        alert("Erro a inscrever na palestra");
      });
    })
    .catch(err => {
      Alert.alert(
        "Token ERROR!",
        "Parace que houve um erro com o teu token... Reinicia a App. Caso o problema se mantenha, volta e instalar"
      );
    });
  };
}

//inscrição em palestra através de ID
export function signSession(user, token, idSession) {
 

  var obj = {
    IdSession: idSession,
    Direction: 0
  };

  return dispatch => {

    checkAndRefresh(token)
    .then(newToken => {
      axios.defaults.headers.common = {
        Authorization: `bearer ${newToken.access_token}`
      };

    //adiciona participante a uma palestra
    axios
      .post("/Session/AddAttendee", obj)
      //se não existir erro na chamada...
      .then(a => {
        if (a.data.Success) {
          axios.defaults.headers.common = {
            Authorization: `bearer ${token.access_token}`
          };
          axios
            .get("/Attendee/AvailableSessions")

            .then(function(response) {
              console.log(response);

              var sessions = response.data;
              var careerPath = getCareerPath(sessions);
              var cenas = [];

              const result = flow(groupBy("SessionStart"))(response.data);

              for (let key in result) {
                result[key].option = 0;
                cenas.push(result[key]);
              }

              Alert.alert(
                "Sucesso",
                "Inscrição na sessão efectuada com sucesso"
              );
              console.log("aqui1");
              //obter informações pessoais:
              axios
                .get("/Attendee/Detail")

                .catch(error => {
                  alert(error);
                })
                .then(sucess => {
                  console.log("aqui2");
                  var result = getE(user);
                  dispatch({
                    type: SIGN_SESSION,
                    sessions: response.data,
                    Blocks: cenas,
                    changeGuestList: false,
                    careerPath: careerPath,
                    user: sucess.data,
                    events: result.a,
                    day1: result.a,
                    day2: result.b,
                    day3: result.c,
                    day4: result.d
                  });
                });
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          Alert.alert("ERRO!!", a.data.Error);
          dispatch({
            type: SIGN_SESSION,
            waitChangeGuest: false
          });
        }
      })
      .catch(b => {
        //   alert("Erro a inscrever na palestra");
      });
    })
    .catch(err => {
      Alert.alert(
        "Token ERROR!",
        "Parace que houve um erro com o teu token... Reinicia a App. Caso o problema se mantenha, volta e instalar"
      );
    });
  };
}

export function getSessions(token) {
  

  return dispatch => {

    checkAndRefresh(token)
    .then(newToken => {
      axios.defaults.headers.common = {
        Authorization: `bearer ${newToken.access_token}`
      };

    axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";

    axios.defaults.headers.common = {
      Authorization: `bearer ${token.access_token}`
    };

    axios
      .get("/Attendee/AvailableSessions")
      .then(function(response) {
        var sessions = response.data;

        var careerPath = getCareerPath(sessions);

        console.log(careerPath);

        var cenas = [];

        const result = flow(
          groupBy("SessionStart")
          // map((Id) => ({Id})),
          //tap(console.log)
        )(response.data);
        for (let key in result) {
          result[key].option = 0;
          cenas.push(result[key]);
        }
        dispatch({
          type: GET_SESSIONS,
          sessions: response.data,
          Blocks: cenas,
          careerPath: careerPath
          //guests: response.data
        });
      })
      .catch(function(error) {
        alert("Error a obter sessões disponíveis!!");
        console.log(error);
      });
    })
    .catch(err => {
      Alert.alert(
        "Token ERROR!",
        "Parace que houve um erro com o teu token... Reinicia a App. Caso o problema se mantenha, volta e instalar"
      );
    });
  };
}

export function getAvailableGuestlists(token) {
  

  return dispatch => {

    checkAndRefresh(token)
    .then(newToken => {
      axios.defaults.headers.common = {
        Authorization: `bearer ${newToken.access_token}`
      };
    axios
      .get("/Attendee/AvailableGuestlists")
      .then(function(response) {
        // handle success
        console.log(response);
        dispatch({
          type: GET_CAREERS,
          guests: response.data
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });})
      .catch(err => {
        Alert.alert(
          "Token ERROR!",
          "Parace que houve um erro com o teu token... Reinicia a App. Caso o problema se mantenha, volta e instalar"
        );
      });
  };
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
export function changeGuestList(token, guestID) {
  

  axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";
  return dispatch => {

    checkAndRefresh(token)
    .then(newToken => {
      axios.defaults.headers.common = {
        Authorization: `bearer ${newToken.access_token}`
      };
    
    var full = `/Attendee/ChangeGuestlist/${guestID}`;

    axios
      .get(full)
      .then(function(response) {
       

        axios
          .get("/Attendee/AvailableSessions")

          .then(function(response) {
            // handle success

            //console.log(response);

            var cenas = [];
            c = getCareerPath(response.data);
            const result = flow(
              groupBy("SessionStart")
              // map((Id) => ({Id})),
              //tap(console.log)
            )(response.data);

            for (let key in result) {
              result[key].option = 0;
              cenas.push(result[key]);
            }
            console.log("-.-.-..-.-.-.-.-.-.");
            console.log(cenas);
            console.log("-.-.-..-.-.-.-.-.-.");
            dispatch({
              type: CHANGE_GUEST,
              sessions: response.data,
              Blocks: cenas,
              careerPath: c

              //guests: response.data
            });
          })
          .catch(function(error) {
            alert("Error a obter sessões disponíveis!!");
            console.log(error);
          });
      })
      .catch(function(error) {
        // handle error
        console.log(response);
        console.log(error);
        alert("Erro a mudar de career path");
      })
      .then(function() {
        // always executed
      });}).catch(err => {
        Alert.alert(
          "Token ERROR!",
          "Parace que houve um erro com o teu token... Reinicia a App. Caso o problema se mantenha, volta e instalar"
        );
      });
  };
}
export function getSessionBlocks(sessions) {
  var a;
  var cenas = [];

  const result = flow(
    groupBy("SessionStart")
    // map((Id) => ({Id})),
    //tap(console.log)
  )(sessions);

  return dispatch => {
    for (let key in result) {
      cenas.push(result[key]);
      console.log();
    }
    console.log(cenas);

    dispatch({
      type: SESSION_BLOCKS,
      Blocks: cenas
    });
  };
}

export function getAvailableSessions(token) {


  axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";

  

  return dispatch => {

    checkAndRefresh(token)
    .then(newToken => {
      axios.defaults.headers.common = {
        Authorization: `bearer ${newToken.access_token}`
      };
    axios
      .get("/Attendee/AvailableSessions")
      .then(function(response) {
        // handle success
        console.log(response);

        var cenas = [];

        const result = flow(
          groupBy("SessionStart")
          // map((Id) => ({Id})),
          //tap(console.log)
        )(response.data);
        for (let key in result) {
          cenas.push(result[key]);
          console.log();
        }

        dispatch({
          type: GET_SESSIONS,
          sessions: response.data,

          Blocks: cenas
        });
      })
      .catch(function(error) {
        alert("Error a obter sessões disponíveis!!");
        console.log(error);
      });})
      .catch(err => {
        Alert.alert(
          "Token ERROR!",
          "Parace que houve um erro com o teu token... Reinicia a App. Caso o problema se mantenha, volta e instalar"
        );
      });
  };
}

function getE(user) {
  var cenas = [];
  let events = [];
  var i = 0;
  for (let key in user.Sessions) {
    events.push({
      key: i++,
      time: moment(user.Sessions[key].SessionStart).format("HH:mm"),
      timeEnd: moment(user.Sessions[key].SessionEnd).format("HH:mm"),
      //lineColor:'#009688',
      imageUrl:
        "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/Vjkyj2hBg/welcome-white-sign-with-falling-colorful-confetti-animation-on-white-background_sglmmh3qm__F0013.png",
      description: user.Sessions[key].Description,
      name: user.Sessions[key].Name,
      Enrolled: user.Sessions[key].Enrolled,
      MaxAttendees: user.Sessions[key].MaxAttendees,
      day: moment(user.Sessions[key].SessionStart).format("DD")
    });
  }
  const result = flow(groupBy("day"))(events);

  for (let key in result) {
    cenas.push(result[key]);
  }

  var a = [],
    b = [],
    c = [],
    d = [];

  for (let key in cenas[0]) {
    a.push({
      time: cenas[0][key].time,
      timeEnd: cenas[0][key].timeEnd,
      imageUrl: cenas[0][key].imageUrl,
      description: cenas[0][key].description,
      name: cenas[0][key].name,
      Enrolled: cenas[0][key].Enrolled,
      MaxAttendees: cenas[0][key].MaxAttendees,
      day: cenas[0][key].day
    });
  }

  for (let key in cenas[1]) {
    b.push({
      time: cenas[1][key].time,
      timeEnd: cenas[1][key].timeEnd,
      imageUrl: cenas[1][key].imageUrl,
      description: cenas[1][key].description,
      name: cenas[1][key].name,
      Enrolled: cenas[1][key].Enrolled,
      MaxAttendees: cenas[1][key].MaxAttendees,
      day: cenas[1][key].day
    });
  }
  for (let key in cenas[2]) {
    c.push({
      time: cenas[2][key].time,
      timeEnd: cenas[2][key].timeEnd,
      imageUrl: cenas[2][key].imageUrl,
      description: cenas[2][key].description,
      name: cenas[2][key].name,
      Enrolled: cenas[2][key].Enrolled,
      MaxAttendees: cenas[2][key].MaxAttendees,
      day: cenas[2][key].day
    });
  }

  for (let key in cenas[3]) {
    d.push({
      time: cenas[3][key].time,
      timeEnd: cenas[3][key].timeEnd,
      imageUrl: cenas[3][key].imageUrl,
      description: cenas[3][key].description,
      name: cenas[3][key].name,
      Enrolled: cenas[3][key].Enrolled,
      MaxAttendees: cenas[3][key].MaxAttendees,
      day: cenas[3][key].day
    });
  }
  a = _.sortBy(a, function(o) {
    return o.time;
  });
  b = _.sortBy(b, function(o) {
    return o.time;
  });
  c = _.sortBy(c, function(o) {
    return o.time;
  });
  d = _.sortBy(d, function(o) {
    return o.time;
  });

  return { a, b, c, d };
}

export function getEvents(user) {
  var result = getE(user);
  return dispatch => {
    dispatch({
      type: GET_EVENTS,
      events: result.a,
      day1: result.a,
      day2: result.b,
      day3: result.c,
      day4: result.d
    });
  };
}

export function login(user, pass) {
  return dispatch => {
    console.log("user: " + user + " password: " + pass);

    var details = {
      username: user,
      password: pass,
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
      .catch(err => {
        console.log(err);
        alert("Erro no login!!");

        alert("error");
        co;
        dispatch({
          type: API_LOGIN,
          logged: false,
          failedAttempt: true,
          tokenData: "error",
          user: { Name: "" }
        });
      })
      .catch(err => {
        console.log("error");
      })
      .then(res => res.json())
      .then(parsed => {
        console.log(parsed);
        if (
          parsed.error_description ==
          "Provided username and password is incorrect"
        ) {
          Alert.alert(
            "Dados Inválidos",
            "Podes sempre fazer reset da password para o email."
          );

          dispatch({
            type: API_LOGIN,
            logged: false,
            failedAttempt: true,
            token: obj,
            user: { Name: "Henrique" },
            userDetails: {},
            waitLogin: false,
            onHold: false
          });
          return;
        } else {
          var obj = {
            access_token: parsed.access_token,
            expirationDateToken: Math.round(new Date().getTime() / 1000) + 3598,
            refresh_token: parsed.refresh_token,
            valid: true
          };

          var details = {
            username: user,
            password: pass
          };
          dispatch({
            type: API_LOGIN,
            logged: true,
            failedAttempt: false,
            token: obj,
            user: { Name: "Henrique" },
            userDetails: details
          });
        }
      });
  };
}
export function hold() {
  return dispatch => {
    dispatch({
      type: HOLD,
      onHold: true
    });
  };
}

export function getUserInfo(token) {
  return dispatch => {
    //TODO: verificar validade do token
    checkAndRefresh(token)
      .then(newToken => {
        console.log('Chamada "getUserInfo"');

        var obj = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${newToken.access_token}`
          }
        };

        fetch("https://tickets.enei.pt/internal/api/Attendee/Detail", obj)
          .then(function(res) {
            console.log(res);
            let obj = JSON.parse(res._bodyText);

            dispatch({
              type: USER_INFO,
              user: obj,
              onHold: false,
              logged: true,
              token: newToken
            });
          })
          .catch(function(res) {
            console.log("erro");
            //  dispatch({ type: USER_INFO,onHold:false});
            alert("Erro a obter a informação pessoal.");
          });
      })
      .catch(err => {
        console.log("cenas da vida");
      });
  };
}

export function logoutUser() {
  return dispatch => {
    console.log("token apagado");
    dispatch({
      type: LOGOUT_USER,
      loggedIn: false,
      tokenData: "error",
      token: false
    });
  };
}

export function checkUser(token) {
  return dispatch => {
    checkAndRefresh(token)
      .catch(err => {
        Alert("ERRO a fazer login");
        console.log(err);
        dispatch({
          type: CHECK_USER,
          logged: true,
          onHold: false,
          userDetails: u,
          token: obj
        });
      })
      .then(newToken => {
        dispatch({
          type: CHECK_USER,
          logged: true,
          onHold: false,
          user: { Name: "Henrique" },
          token: newToken
        });
      });
  };
}
