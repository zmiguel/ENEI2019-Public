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
  UPDATE_USER,
  SESSION_DETAIL,
  GET_TEAM,
  GET_INTERNAL_EVENTS,
  CREATE_TEAM,
  DELETE_TEAM,
  GET_CROMOS,
  GET_LOCS_VISITED,
  SCAN_QR,
  LOGIN_INTERNAL,
  CHANGE_PASSWORD
} from "./actionTypes"; //Import the actions types constant we defined in our actions
var validator = require("email-validator");

import moment from "moment";

import { compose } from "redux";
import tap from "lodash/fp/tap";
import flow from "lodash/fp/flow";
import groupBy from "lodash/fp/groupBy";
import { colors } from "react-native-elements";

const axios = require("axios");

axios.defaults.baseURL = "https://api.enei.pt/internal/api";

const map = require("lodash/fp/map").convert({ cap: false });

export function scanQrCode(data, tokenInternal) {
  axios.defaults.baseURL = "https://api.enei.pt";
  axios.defaults.headers.common = {
    Authorization: `bearer ${tokenInternal}`
  };
  console.log(data);
  return dispatch => {
    axios
      .post("/api/Scan", data)
      .then(a => {

        Alert.alert("SUCESSO!", "Cromo adicionado com sucesso!");
        dispatch({
          type: SCAN_QR
        });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("ERRO!", "Existiu um erro no scan do QRCode\nOu esse QR code não existe ou já tens o cromo conquistado.");
      });
  };
}

export function changeTeamName(tokenInternal, team) {

  axios.defaults.headers.common = {
    Authorization: `bearer ${tokenInternal}`
  };
  axios.defaults.baseURL = "https://api.enei.pt/api";
  return dispatch => {
    axios.post('/Teams/changename', team).then(p => {
      console.log(p);
      Alert.alert("Sucesso!!", "Nome alterado com sucesso");
      axios.defaults.baseURL = "https://api.enei.pt/api";
      axios.defaults.headers.common = {
        Authorization: `bearer ${tokenInternal}`
      };
      console.log("Token: ")
      console.log(tokenInternal)
      axios
        .get(`/Teams/u/${team.UserQR}`)
        .then(a => {
          console.log("sucesso!");
          console.log(a);
          console.log("cenas aqui")
          dispatch({
            type: GET_TEAM,
            team: a.data
          });

        })
        .catch(p => {
          console.log(p);

        });

      dispatch({
        type: OPEN_MODAL
      });


    })
      .catch(err => {
        Alert.alert("ERRO!", "Ocorreu um erro a alterar o nome da equipa")
      })

  }
}
export function getEventLocsVisited(teamId, tokenInternal) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${tokenInternal}`
  };
  axios.defaults.baseURL = "https://api.enei.pt/api";


  return dispatch => {
    axios
      .get(`/EventLocsVisited/t/${teamId}`)
      .then(a => {

        dispatch({
          type: GET_LOCS_VISITED,
          locais: a.data
        });
      })
      .catch(p => {
        console.log(p);
        //   Alert.alert("ERRO!", "erro a obter os locais visitados");
      });
  };
}

export function getCromos(user, tokenInternal) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${tokenInternal}`
  };
  axios.defaults.baseURL = "https://api.enei.pt/api";
  return dispatch => {
    axios
      .get(`/Cromos/${user.Code}`)
      .then(a => {
        console.log("sucesso!");
        console.log(a);
        dispatch({
          type: GET_CROMOS,
          cromos: a.data
        });
      })
      .catch(p => {
        console.log(p);
        Alert.alert("ERRO!", "Erro a obter os cromos.");
      });

    dispatch({
      type: OPEN_MODAL
    });
  };
}

export function deleteTeam(data, tokenInternal) {
  axios.defaults.baseURL = "https://api.enei.pt";
  axios.defaults.headers.common = {
    Authorization: `bearer ${tokenInternal}`
  };
  console.log(data);
  return dispatch => {
    axios
      .post("/api/Teams/delete", data)
      .then(a => {
        console.log(a.data);
        Alert.alert("SUCESSO!", "A equipa foi removida com sucesso");
        axios
          .get(`/api/Teams/u/${data.UserQr}`)
          .then(a => {
            console.log("sucesso!");
            console.log(a);
            dispatch({
              type: GET_TEAM,
              team: a.data
            });
          })
          .catch(p => {
            console.log(p);
            dispatch({
              type: GET_TEAM,
              team: "none"
            });
          });

        dispatch({
          type: OPEN_MODAL
        });
        dispatch({
          type: DELETE_TEAM
        });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("ERRO!", "Existiu um erro na remoção da equipa!\nCertifica-te que removeste todos os elementos antes de apagar a equipa");
      });
  };
}

export function createTeam(team, tokenInternal, user) {
  axios.defaults.baseURL = "https://api.enei.pt";
  axios.defaults.headers.common = {
    Authorization: `bearer ${tokenInternal}`
  };

  return dispatch => {
    axios
      .post("/api/Teams/add", team)
      .then(a => {
        console.log(a.data);
        Alert.alert("SUCESSO!", "A equipa foi criada com sucesso");
        axios
          .get(`/api/Teams/u/${user.Code}`)
          .then(a => {
            console.log("sucesso!");
            console.log(a);
            dispatch({
              type: GET_TEAM,
              team: a.data
            });
          })
          .catch(p => {
            console.log(p);
            dispatch({
              type: GET_TEAM,
              team: "none"
            });
          });

        dispatch({
          type: OPEN_MODAL
        });
        dispatch({
          type: CREATE_TEAM
        });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("ERRO!", "Existiu um erro na criação da equipa");
      });
  };
}

export function getAllEvents(tokenInternal) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${tokenInternal}`
  };
  axios.defaults.baseURL = "https://api.enei.pt/api";
  return dispatch => {
    axios
      .get("/Events")
      .then(a => {
        console.log("sucesso!");
        console.log(a);
        dispatch({
          type: GET_INTERNAL_EVENTS,
          eventsInternal: a.data
        });
      })
      .catch(p => {
        console.log(p);
        // Alert.alert("ERRO!", "erro a obter os eventos");
      });

    dispatch({
      type: OPEN_MODAL
    });
  };
}

export function removeUserTeam(data, tokenInternal) {
  //remove/member
  axios.defaults.headers.common = {
    Authorization: `bearer ${tokenInternal}`
  };

  axios.defaults.baseURL = "https://api.enei.pt";
  return dispatch => {
    axios
      .post("/api/Teams/remove/member", data)
      .then(a => {
        if (a.status == 201) {
          console.log("sucesso!");
          console.log(a.data);
          Alert.alert("Sucesso!", "Elemento removido com sucesso!!");
          axios
            .get(`/api/Teams/u/${data.UserQR}`)
            .then(a => {
              console.log("sucesso!");
              console.log(a);
              dispatch({
                type: GET_TEAM,
                team: a.data
              });
            })
            .catch(p => {
              console.log(p);
              dispatch({
                type: GET_TEAM,
                team: "none"
              });
            });


        }
      })
      .catch(p => {
        console.log(p);
        Alert.alert("ERRO!!", "Erro a remover!");
      });

    dispatch({
      type: OPEN_MODAL
    });
  };
}

export function addUserTeam(data, tokenInternal, user) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${tokenInternal}`
  };
  axios.defaults.baseURL = "https://api.enei.pt";
  return dispatch => {
    axios
      .post("/api/Teams/add/member", data)
      .then(a => {
        if (a.status == 201) {
          console.log("sucesso!");
          console.log(a.data);
          Alert.alert("Sucesso!", "Elemento adicionado com sucesso!!");

        }
        axios
          .get(`/api/Teams/u/${user.Code}`)
          .then(a => {
            console.log("sucesso!");
            console.log(a);
            dispatch({
              type: GET_TEAM,
              team: a.data
            });
          })
          .catch(p => {
            console.log(p);
            dispatch({
              type: GET_TEAM,
              //team: "none"
            });
          });
      })
      .catch(p => {
        console.log(p);
        Alert.alert("ERRO!!", "Esse utlizador já se encontra numa equipa!!");
      });

    dispatch({
      type: OPEN_MODAL
    });
  };

}

export function getUserTeam(user, tokenInternal) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${tokenInternal}`
  };
  axios.defaults.baseURL = "https://api.enei.pt";
  return dispatch => {
    axios
      .get(`/api/Teams/u/${user.Code}`)
      .then(a => {
        console.log("sucesso!");
        console.log(a);
        console.log("cenas aqui")
        dispatch({
          type: GET_TEAM,
          team: a.data
        });

      })
      .catch(p => {
        console.log(p);
        dispatch({
          type: GET_TEAM,
          team: "none"
        });
      });

    dispatch({
      type: OPEN_MODAL
    });
  };
}

export function waitLogin() {
  return dispatch => {
    dispatch({
      type: LOADINGLOGIN
    });
  };
}

var getEAsync = function (user, careerPath, token) {
  return new Promise(function (resolve, reject) {
    console.log("career path: ");
    var cenas = [];
    let events = [];
    var alimentacao = [];
    var alojamento = [];
    var acesso = [];
    var i = 0;
    console.log(user.Sessions);

    checkAndRefresh(token)
      .then(newToken => {
        axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";
        axios.defaults.headers.common = {
          Authorization: `bearer ${newToken.access_token}`
        };
        axios
          .get("/Attendee/AvailableSessions")
          .then(function (response) {
            // handle success
            console.log("available");
            console.log(response);
            console.log("available");
            var cenas = [];

            const result1 = flow(groupBy("SessionStart"))(response.data);
            for (let key in result) {
              cenas.push(result[key]);
              console.log();
            }

            console.log("chegou aqui");
            console.log(cenas);

            for (let key in user.Sessions) {
              //se forem sessões de bilhete, adiciona a outra lista
              if (
                user.Sessions[key].Id == 1 || //dia 12 de abril
                user.Sessions[key].Id == 22 || //jantar 12 de abril
                user.Sessions[key].Id == 23 || //almoço e jantar 13 de abril
                user.Sessions[key].Id == 24 || //almoço e jantar 14 de abril
                user.Sessions[key].Id == 25 || //almoço  15 de abril
                user.Sessions[key].Id == 26 || //alojamento 12 de abril
                user.Sessions[key].Id == 29 || //alojamento 13 de abril
                user.Sessions[key].Id == 31 || //alojamento 14 de abril
                user.Sessions[key].Id == 32 || //dia 13 de abril
                user.Sessions[key].Id == 33 || //dia 14 de abril
                user.Sessions[key].Id == 34 || //dia 15 de abril
                user.Sessions[key].Id == 35 || //jantar dia 12 de abril
                user.Sessions[key].Id == 36 || //jantar dia 13 de abril
                user.Sessions[key].Id == 37 //jantar dia 14 de abril
              ) {
                // bilhete.push( user.Sessions[key])

                if (user.Sessions[key].Id == 1) {
                  acesso.push("dia 12");
                }

                if (user.Sessions[key].Id == 22) alimentacao.push("dia 12");

                if (user.Sessions[key].Id == 23) alimentacao.push("dia 13");

                if (user.Sessions[key].Id == 24) alimentacao.push("dia 14");

                if (user.Sessions[key].Id == 25) alimentacao.push("dia 15");

                if (user.Sessions[key].Id == 26) alojamento.push("dia 12");
                if (user.Sessions[key].Id == 29) alojamento.push("dia 13");
                if (user.Sessions[key].Id == 31) alojamento.push("dia 14");

                if (user.Sessions[key].Id == 32) acesso.push("dia 13");
                if (user.Sessions[key].Id == 33) acesso.push("dia 14");
                if (user.Sessions[key].Id == 34) acesso.push("dia 15");
              } else {
                events.push({
                  key: i++,
                  Id: user.Sessions[key].Id,
                  time: moment(user.Sessions[key].SessionStart).format("HH:mm"),
                  timeEnd: moment(user.Sessions[key].SessionEnd).format(
                    "HH:mm"
                  ),
                  //lineColor:'#009688',
                  imageUrl:
                    "https://tickets.enei.pt/adminpoint/Content/Images/Uploads/Sessions/" +
                    user.Sessions[key].Image,
                  description: user.Sessions[key].Description,
                  name: user.Sessions[key].Name,
                  Enrolled: user.Sessions[key].Enrolled,
                  MaxAttendees: user.Sessions[key].MaxAttendees,
                  day: moment(user.Sessions[key].SessionStart).format("DD")
                });
              }
            }

            const result = flow(groupBy("day"))(events);
            var a = [],
              b = [],
              c = [],
              d = [];

            //MEU DEUS QUE É ISTO???

            for (let key in result["12"]) {
              a.push({
                Id: result["12"][key].Id,
                time: result["12"][key].time,
                timeEnd: result["12"][key].timeEnd,
                imageUrl: result["12"][key].imageUrl,
                description: result["12"][key].description,
                name: result["12"][key].name,
                Enrolled: result["12"][key].Enrolled,
                MaxAttendees: result["12"][key].MaxAttendees,
                day: result["12"][key].day
              });
            }

            for (let key in result["13"]) {
              b.push({
                Id: result["13"][key].Id,
                time: result["13"][key].time,
                timeEnd: result["13"][key].timeEnd,
                imageUrl: result["13"][key].imageUrl,
                description: result["13"][key].description,
                name: result["13"][key].name,
                Enrolled: result["13"][key].Enrolled,
                MaxAttendees: result["13"][key].MaxAttendees,
                day: result["13"][key].day
              });
            }
            for (let key in result["14"]) {
              c.push({
                Id: result["14"][key].Id,
                time: result["14"][key].time,
                timeEnd: result["14"][key].timeEnd,
                imageUrl: result["14"][key].imageUrl,
                description: result["14"][key].description,
                name: result["14"][key].name,
                Enrolled: result["14"][key].Enrolled,
                MaxAttendees: result["14"][key].MaxAttendees,
                day: result["14"][key].day
              });
            }

            for (let key in result["15"]) {
              d.push({
                Id: result["15"][key].Id,
                time: result["15"][key].time,
                timeEnd: result["15"][key].timeEnd,
                imageUrl: result["15"][key].imageUrl,
                description: result["15"][key].description,
                name: result["15"][key].name,
                Enrolled: result["15"][key].Enrolled,
                MaxAttendees: result["15"][key].MaxAttendees,
                day: result["15"][key].day
              });
            }
            a = _.sortBy(a, function (o) {
              return o.time;
            });
            b = _.sortBy(b, function (o) {
              return o.time;
            });
            c = _.sortBy(c, function (o) {
              return o.time;
            });
            d = _.sortBy(d, function (o) {
              return o.time;
            });

            console.log(alimentacao);

            console.log("career path");
            console.log(careerPath);
            console.log("career path");
            return {
              a,
              b,
              c,
              d,
              ab: alimentacao,
              acc: acesso,
              al: alojamento
            };
          })
          .catch(function (error) {
            alert("Error a obter sessões disponíveis!!");
            console.log(error);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

var checkAndRefresh = function (token) {
  return new Promise(function (resolve, reject) {
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
          console.log("parsed");
          console.log(parsed);
          console.log("parsed");
          if (parsed.error == "invalid_grant") {
            console.log("Erro de invalid grant");
            reject("erro");
          } else {
            var obj = {
              access_token: parsed.access_token,
              refresh_token: parsed.refresh_token,
              expirationDateToken:
                Math.round(new Date().getTime() / 1000) + (parsed.expires_in - 2)
            };

            console.log(parsed);
            resolve(obj);
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
              dispatch({
                type: CHANGE_PASSWORD
              });
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
          "Parece que houve um erro com o teu token... Reinicia a App. Caso o problema se mantenha, volta e instalar"
        );
      });
  };
}
//faz autenticação com API interna
export function loginInternal(user, t) {
  axios.defaults.baseURL = "https://api.enei.pt";
  console.log(user);
  return dispatch => {
    axios
      .post("/api/loginQR", {
        Qrcode: user.Code,
        token: t.access_token
      })
      .then(a => {
        dispatch({
          type: LOGIN_INTERNAL,
          internalToken: a.data.token
        });
      })
      .catch(p => {
        console.log(p);
        Alert.alert(
          "Erro",
          "Existiu um erro a obter o token... Contacta a comissão se vires esta mensagem de erro."
        );
      });

    dispatch({
      type: LOGIN_INTERNAL,
      internalToken: "error"
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

export function getSessionDetails(token, sessionId) {
  //enei2019.uingress.com/internal/api/Session/Detail/1
  http: axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";
  return dispatch => {
    checkAndRefresh(token).then(newToken => {
      axios.defaults.headers.common = {
        Authorization: `bearer ${newToken.access_token}`
      };

      axios
        .get(`/Session/Detail/${sessionId}`)
        .then(result => {
          console.log(result.data);
          dispatch({
            type: SESSION_DETAIL,
            sessionDetail: result.data,
            token: newToken
          });
        })
        .catch(err => {
          Alert.alert(
            "ERROR!!",
            "Aconteceu um erro a obter os detalhes da sessão."
          );
          console.log(err);
        });
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
              user: a.data,
              token: newToken
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
          "Parece que houve um erro com o teu token... Reinicia a App. Caso o problema se mantenha, volta e instalar"
        );
      });
  };
}
function getCareerPath(sessions) {
  careerPath = "Sem Career Path";
  careerColor = "white";
  code = "";

  for (let key in sessions) {
    if (sessions[key].Name == "IA") {
      careerPath = "Artificial Intelligence";
      careerColor = "#F54B10";
      code = "IA";
    }
    if (sessions[key].Name == "IOT") {
      careerPath = "Internet of Things";
      careerColor = "#EC174A";
      code = "IOT";
    }
    if (sessions[key].Name == "WEB") {
      careerPath = "Web Development";
      careerColor = "#3A1484";
      code = "WEB";
    }
    if (sessions[key].Name == "NET") {
      careerPath = "Networking and Security";
      careerColor = "#214198";
      code = "NET";
    }
    if (sessions[key].Name == "MOB") {
      careerPath = "Mobile Development";
      careerColor = "#971384";
      code = "MOB";
    }
    if (sessions[key].Name == "DS") {
      careerPath = "Data Science";
      careerColor = "#DC160D";
      code = "DS";
    }
  }
  return { name: careerPath, color: careerColor, code: code };
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
  axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";
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

                .then(function (response) {
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
                        user: sucess.data,
                        token: newToken
                      });
                      getEvents(user, careerPath, token);
                    });
                })
                .catch(function (error) {
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
  axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";
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

                .then(function (response) {
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
                      var result = getE(user, "", token);
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
                        day4: result.d,
                        token: newToken
                      });
                    });
                })
                .catch(function (error) {
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
          .then(function (response) {
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
              careerPath: careerPath,
              token: newToken
              //guests: response.data
            });
          })
          .catch(function (error) {
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
  axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";
  return dispatch => {
    checkAndRefresh(token)
      .then(newToken => {
        axios.defaults.headers.common = {
          Authorization: `bearer ${newToken.access_token}`
        };
        axios
          .get("/Attendee/AvailableGuestlists")
          .then(function (response) {
            // handle success
            console.log(response);
            dispatch({
              type: GET_CAREERS,
              guests: response.data,
              token: newToken
            });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
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
  console.log("Guest ID: " + guestID)
  return dispatch => {
    checkAndRefresh(token)
      .then(newToken => {
        axios.defaults.headers.common = {
          Authorization: `bearer ${newToken.access_token}`
        };

        var full = `/Attendee/ChangeGuestlist/${guestID}`;

        axios
          .get(full)
          .then(function (response) {
            axios
              .get("/Attendee/AvailableSessions")

              .then(function (response) {
                // handle success

                //console.log(response);
                console.log("SUcesso a trocar para :" + guestID)
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
                  careerPath: c,
                  token: newToken

                  //guests: response.data
                });
              })
              .catch(function (error) {
                alert("Error a obter sessões disponíveis!!");
                console.log(error);
              });
          })
          .catch(function (error) {
            // handle error
            console.log(response);
            console.log(error);
            alert("Erro a mudar de career path");
          })
          .then(function () {
            // always executed
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
export function getSessionBlocks(sessions) {
  var a;
  var cenas = [];

  const result = flow(groupBy("SessionStart"))(sessions);

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
          .then(function (response) {
            // handle success
            console.log(response);

            var cenas = [];

            const result = flow(groupBy("SessionStart"))(response.data);
            for (let key in result) {
              cenas.push(result[key]);
              console.log();
            }

            dispatch({
              type: GET_SESSIONS,
              sessions: response.data,
              Blocks: cenas,
              token: newToken
            });
          })
          .catch(function (error) {
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

//ESTA FUNÇÃO TEM MUITO CÓDIGO MAL FEITO...

function getE(user, careerPath, token) {
  var cenas = [];
  let events = [];
  var alimentacao = [];
  var alojamento = [];
  var acesso = [];
  var i = 0;

  for (let key in user.Sessions) {
    //se forem sessões de bilhete, adiciona a outra lista
    if (
      user.Sessions[key].Id == 1 || //dia 12 de abril
      user.Sessions[key].Id == 22 || //jantar 12 de abril
      user.Sessions[key].Id == 23 || //almoço e jantar 13 de abril
      user.Sessions[key].Id == 24 || //almoço e jantar 14 de abril
      user.Sessions[key].Id == 25 || //almoço  15 de abril
      user.Sessions[key].Id == 26 || //alojamento 12 de abril
      user.Sessions[key].Id == 29 || //alojamento 13 de abril
      user.Sessions[key].Id == 31 || //alojamento 14 de abril
      user.Sessions[key].Id == 32 || //dia 13 de abril
      user.Sessions[key].Id == 33 || //dia 14 de abril
      user.Sessions[key].Id == 34 || //dia 15 de abril
      user.Sessions[key].Id == 35 || //jantar dia 12 de abril
      user.Sessions[key].Id == 36 || //jantar dia 13 de abril
      user.Sessions[key].Id == 37 //jantar dia 14 de abril
    ) {
      // bilhete.push( user.Sessions[key])

      if (user.Sessions[key].Id == 1) {
        acesso.push("dia 12");
      }

      if (user.Sessions[key].Id == 22) alimentacao.push("dia 12");

      if (user.Sessions[key].Id == 23) alimentacao.push("dia 13");

      if (user.Sessions[key].Id == 24) alimentacao.push("dia 14");

      if (user.Sessions[key].Id == 25) alimentacao.push("dia 15");

      if (user.Sessions[key].Id == 26) alojamento.push("dia 12");
      if (user.Sessions[key].Id == 29) alojamento.push("dia 13");
      if (user.Sessions[key].Id == 31) alojamento.push("dia 14");

      if (user.Sessions[key].Id == 32) acesso.push("dia 13");
      if (user.Sessions[key].Id == 33) acesso.push("dia 14");
      if (user.Sessions[key].Id == 34) acesso.push("dia 15");
    } else {
      events.push({
        key: i++,
        Id: user.Sessions[key].Id,
        time: moment(user.Sessions[key].SessionStart).format("HH:mm"),
        timeEnd: moment(user.Sessions[key].SessionEnd).format("HH:mm"),
        //lineColor:'#009688',
        imageUrl:
          "https://tickets.enei.pt/adminpoint/Content/Images/Uploads/Sessions/" +
          user.Sessions[key].Image,
        description: user.Sessions[key].Description,
        name: user.Sessions[key].Name,
        Enrolled: user.Sessions[key].Enrolled,
        MaxAttendees: user.Sessions[key].MaxAttendees,
        day: moment(user.Sessions[key].SessionStart).format("DD"),
        LocalRoom: user.Sessions[key].LocalRoom
      });
    }
  }

  const result = flow(groupBy("day"))(events);
  var a = [],
    b = [],
    c = [],
    d = [];

  //MEU DEUS QUE É ISTO???
  if (careerPath != undefined && careerPath.code == "IA" || careerPath.code == "WEB") {
    b.push({
      Id: 22,
      time: "13:30",
      description: "Almoço para os career path's de IA e WEB",
      day: "13",
      name: "Almoço",
      place: "Cantina do ISEC"
    })
    c.push({
      Id: 22,
      time: "13:30",
      description: "Almoço para os career path's de IA e WEB",
      day: "14",
      name: "Almoço",
      place: "Cantina do ISEC"
    })
    d.push({
      Id: 22,
      time: "13:30",
      description: "Almoço para os career path's de IA e WEB",
      day: "15",
      name: "Almoço",
      place: "Cantina do ISEC"
    })
    a.push({
      Id: 22,
      time: "19:00",
      description: "Jantar para os career path's de IA e WEB",
      day: "12",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
    b.push({
      Id: 22,
      time: "19:00",
      description: "Jantar para os career path's de IA e WEB",
      day: "13",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
    c.push({
      Id: 22,
      time: "19:00",
      description: "Jantar para os career path's de IA e WEB",
      day: "14",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
  }
  if (careerPath != undefined && careerPath.code == "IOT" || careerPath.code == "NET") {
    b.push({
      Id: 22,
      time: "12:15",
      description: "Almoço para os career path's de IOT e NET",
      day: "13",
      name: "Almoço",
      place: "Cantina do ISEC"
    })
    c.push({
      Id: 22,
      time: "12:15",
      description: "Almoço para os career path's de IOT e NET",
      day: "14",
      name: "Almoço",
      place: "Cantina do ISEC"
    })
    d.push({
      Id: 22,
      time: "12:15",
      description: "Almoço para os career path's de IOT e NET",
      day: "15",
      name: "Almoço",
      place: "Cantina do ISEC"
    })
    a.push({
      Id: 22,
      time: "19:30",
      description: "Jantar para os career path's de IOT e NET ",
      day: "12",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
    b.push({
      Id: 22,
      time: "19:30",
      description: "Jantar para os career path's de IOT e NET",
      day: "13",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
    c.push({
      Id: 22,
      time: "19:30",
      description: "Jantar para os career path de IOT e NET",
      day: "14",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
  }
  if (careerPath != undefined && careerPath.code == "DS" || careerPath.code == "MOB") {
    b.push({
      Id: 22,
      time: "12:45",
      description: "Almoço para os career paths de DS e MOB ",
      day: "13",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
    c.push({
      Id: 22,
      time: "12:45",
      description: "Almoço para os career paths de DS e MOB ",
      day: "13",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
    d.push({
      Id: 22,
      time: "12:45",
      description: "Almoço para os career paths de DS e MOB ",
      day: "13",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
    a.push({
      Id: 22,
      time: "20:00",
      description: "Jantar para os career paths de DS e MOB ",
      day: "12",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
    b.push({
      Id: 22,
      time: "20:00",
      description: "Jantar para os career paths de DS e MOB ",
      day: "13",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
    c.push({
      Id: 22,
      time: "20:00",
      description: "Jantar para os career paths de DS e MOB ",
      day: "14",
      name: "Jantar",
      place: "Cantina do ISEC"
    });
  }

  a.push({
    Id: 48,
    time: "21:00",
    description:
      "Festarola do evento",
    name: "Festarola",
    Enrolled: 700,
    MaxAttendees: 300,
    day: "12",
    place: "Pavilhão multiusos"
  });
  a.push({
    Id: 47,
    time: "14:00",
    description:
      "Bem-vindo ao ENEI’19! Para receberes a tua credencial e o teu kit de participação, dirige-te ao nosso balcão de check-in. Para o encontrares basta consultares o mapa do evento na app do ENEI’19 ou dirige-te a um dos nossos voluntários ou membros da organização, é certo eles ajudarem-te!",
    name: "Boas vindas e Check-in",
    Enrolled: 700,
    MaxAttendees: 300,
    day: "12",
    place: "Dep. Física e Matemática"
  });
  a.push({
    Id: 46,
    time: "17:30",
    description:
      "A sessão de abertura vai-se realizar no nosso auditório principal. Poderás ver a apresentação das várias atividades que irão decorrer no evento.",
    name: "Sessão de Abertura",

    Enrolled: 700,
    MaxAttendees: 300,
    day: "12",
    place: "Auditório principal"
  });
  b.push({
    Id: 49,
    time: "08:00",
    description:
      "Pronto para começar o dia em grande? Vem tomar o pequeno-almoço!",
    Enrolled: 700,
    MaxAttendees: 300,
    name: "Pequeno-Almoço",
    day: "13",
    place: "Cantina do ISEC"
  });
  c.push({
    Id: 49,
    time: "08:00",
    description:
      "Pronto para começar o dia em grande? Vem tomar o pequeno-almoço!",
    Enrolled: 700,
    MaxAttendees: 300,
    name: "Pequeno-Almoço",
    day: "13",
    place: "Cantina do ISEC"
  });
  d.push({
    Id: 49,
    time: "08:00",
    description:
      "Pronto para começar o dia em grande? Vem tomar o pequeno-almoço!",
    Enrolled: 700,
    MaxAttendees: 300,
    name: "Pequeno-Almoço",
    day: "13",
    place: "Cantina do ISEC"
  });
  c.push({
    Id: 95,
    time: "20:00",
    description:
      "Queres ficar a conhecer pessoalmente algumas das empresas líderes de mercado na área de informática? Então o jantar empresarial é a oportunidade perfeita para ti! Manda-nos o teu CV e habilita-te a ganhar um jantar no hotel Quinta das Lágrimas acompanhado pelas tuas empresas favoritas.",
    Enrolled: 700,
    MaxAttendees: 300,
    name: "Jantar Empresarial",
    day: "14",
    place: "Hotel Quinta das Lágrimas"
  });
  for (let key in result["12"]) {
    a.push({
      Id: result["12"][key].Id,
      time: result["12"][key].time,
      timeEnd: result["12"][key].timeEnd,
      imageUrl: result["12"][key].imageUrl,
      description: result["12"][key].description,
      name: result["12"][key].name,
      Enrolled: result["12"][key].Enrolled,
      MaxAttendees: result["12"][key].MaxAttendees,
      day: result["12"][key].day,
      place: result["12"][key].LocalRoom
    });
  }

  for (let key in result["13"]) {
    b.push({
      Id: result["13"][key].Id,
      time: result["13"][key].time,
      timeEnd: result["13"][key].timeEnd,
      imageUrl: result["13"][key].imageUrl,
      description: result["13"][key].description,
      name: result["13"][key].name,
      Enrolled: result["13"][key].Enrolled,
      MaxAttendees: result["13"][key].MaxAttendees,
      day: result["13"][key].day,
      place: result["13"][key].LocalRoom
    });
  }
  for (let key in result["14"]) {
    c.push({
      Id: result["14"][key].Id,
      time: result["14"][key].time,
      timeEnd: result["14"][key].timeEnd,
      imageUrl: result["14"][key].imageUrl,
      description: result["14"][key].description,
      name: result["14"][key].name,
      Enrolled: result["14"][key].Enrolled,
      MaxAttendees: result["14"][key].MaxAttendees,
      day: result["14"][key].day,
      place: result["14"][key].LocalRoom
    });
  }

  for (let key in result["15"]) {
    d.push({
      Id: result["15"][key].Id,
      time: result["15"][key].time,
      timeEnd: result["15"][key].timeEnd,
      imageUrl: result["15"][key].imageUrl,
      description: result["15"][key].description,
      name: result["15"][key].name,
      Enrolled: result["15"][key].Enrolled,
      MaxAttendees: result["15"][key].MaxAttendees,
      day: result["15"][key].day,
      place: result["15"][key].LocalRoom
    });
  }
  a = _.sortBy(a, function (o) {
    return o.time;
  });
  b = _.sortBy(b, function (o) {
    return o.time;
  });
  c = _.sortBy(c, function (o) {
    return o.time;
  });
  d = _.sortBy(d, function (o) {
    return o.time;
  });

  console.log(alimentacao);

  console.log("career path");
  console.log(careerPath);
  console.log("career path");
  return { a, b, c, d, ab: alimentacao, acc: acesso, al: alojamento };
}

export function getEvents(user, careerPath, token) {
  return dispatch => {
    console.log("careerrrrrr");
    console.log(careerPath);
    var result = getE(user, careerPath, token);
    console.log(result);
    console.log("putaaaaaaa");

    dispatch({
      type: GET_EVENTS,
      events: result.a,
      day1: result.a,
      day2: result.b,
      day3: result.c,
      day4: result.d,
      alimentacao: result.ab,
      acesso: result.acc,
      alojamento: result.al
    });
  };
}

export function resetPassword(token, password) {
  var type = 0;
  axios.defaults.baseURL = "https://tickets.enei.pt/internal/api";

  if (validator.validate(password)) {

    type = 0 //

  } else {

    type = 1;

  }

  var type;

  return dispatch => {
    axios
      .get(`/User/RecoverPassword?input=${password}+&type=${type}`)
      .then(function (response) {

        Alert.alert("Sucesso!", "Foi enviado um email com o pedido de recuperação.");
      })
      .catch(() => {
        Alert.alert("Error!!", "Ocorreu um erro.")
      })

  }
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
     
        Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique se possui conexão à internet e tente novamente." );
        dispatch({
          type: API_LOGIN,
          logged: false,
          failedAttempt: true,
          tokenData: "error",
          loadingLogin: false,
        });
      })
      .catch(err => {
        dispatch({
          type: API_LOGIN,
          logged: false,
          failedAttempt: true,
          tokenData: "error",
          loadingLogin: false,
        });
       
      })
      .then(res => res.json())
      .then(parsed => {
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
          console.log(parsed)
          var obj = {
            access_token: parsed.access_token,
            expirationDateToken: Math.round(new Date().getTime() / 1000) + (parsed.expires_in - 2),
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
      })
      .catch(err=>{
        dispatch({
          type: API_LOGIN,
          logged: false,
          failedAttempt: true,
          tokenData: "error",
          loadingLogin: false,
        });
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
          .then(function (res) {
            let obj = JSON.parse(res._bodyText);
            console.log(obj);
            axios.defaults.baseURL = "https://api.enei.pt";
            axios
              .post("/api/loginQR", {
                Qrcode: obj.Code,
                token: newToken.access_token
              })
              .then(a => {

                dispatch({
                  type: LOGIN_INTERNAL,
                  internalToken: a.data.token
                });

                axios.defaults.headers.common = {
                  Authorization: `bearer ${a.data.token}`
                };

                axios.defaults.baseURL = "https://api.enei.pt";

                axios.get(`/api/Teams/u/${obj.Code}`).then(v => {

                  console.log("sucesso cenas aqui!");
                  console.log(v);

                  axios.defaults.headers.common = {
                    Authorization: `bearer ${a.data.token}`
                  };
                  axios.defaults.baseURL = "https://api.enei.pt";

                  axios
                    .get(`/api/EventLocsVisited/t/${v.data.id}`)
                    .then(c => {

                      console.log("sucesso!");

                      console.log(c);

                      dispatch({
                        type: GET_LOCS_VISITED,
                        locais: c.data
                      });

                    })
                    .catch(p => {
                      console.log(p);
                      // Alert.alert("ERRO!", "erro a obter os locais visitados");
                    });

                  dispatch({
                    type: GET_TEAM,
                    team: v.data
                  });
                });
                var result = getE(obj, "", token);

                return dispatch => {
                  dispatch({
                    type: GET_EVENTS,
                    events: result.a,
                    day1: result.a,
                    day2: result.b,
                    day3: result.c,
                    day4: result.d,
                    alimentacao: result.ab,
                    acesso: result.acc,
                    alojamento: result.al
                  });
                };
              })
              .catch(p => {
                console.log(p);
                Alert.alert(
                  "Erro",
                  "Existiu um erro a obter o token... Contacta a comissão se vires esta mensagem de erro."
                );
              });

            dispatch({
              type: LOGIN_INTERNAL,
              internalToken: "error"
            });

            dispatch({
              type: USER_INFO,
              user: obj,
              onHold: false,
              logged: true,
              token: newToken
            });
          })
          .catch(function (res) {
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
          logged: false,
          onHold: false,
          userDetails: u,
          token: false
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
