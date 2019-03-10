import { AsyncStorage } from "react-native";

import { NetInfo } from "react-native";

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
  OPEN_MODAL
} from "./actionTypes"; //Import the actions types constant we defined in our actions

import moment from "moment";

import { compose } from "redux";
import tap from "lodash/fp/tap";
import flow from "lodash/fp/flow";
import groupBy from "lodash/fp/groupBy";
import { colors } from "react-native-elements";

const axios = require("axios");

axios.defaults.baseURL = "http://enei2019.uingress.com/internal/api";

//http://enei2019.uingress.com/internal/api/Attendee/Edit

const map = require("lodash/fp/map").convert({ cap: false });

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
  axios.defaults.headers.common = {
    Authorization: `bearer ${token.access_token}`
  };

  return dispatch => {
    axios
      .post("/Attendee/Edit", user)
      .then(a => {
        console.log(a);
        alert("guardado com sucesso");
        dispatch({
          type: UPDATE_USER
          // guests: response.data
        });
      })
      .catch(b => {
        alert("Erro a guardar os dados");
      });
  };
}
function getCareerPath(sessions) {
  careerPath = "Sem Career Path";
  careerColor = "white";

  for (let key in sessions) {
    if (sessions[key].Name == "IA") {
      careerPath = "Artificial Inteligence";
      careerColor='#CC1A17'
    }
    if (sessions[key].Name == "IOT") {
      careerPath = "Internet of Things";
      careerColor= "green"
    }
    if (sessions[key].Name == "WEB") {
      careerPath = "Web Development";
      careerColor="purple"
    }
    if (sessions[key].Name == "NET") {
      careerPath = "Networking and Security";
      careerColor="blue"
    }
    if (sessions[key].Name == "MOB") {
      careerPath = "Mobile Development";
      careerColor="orange"
    }
    if(sessions[key].Name=="DS"){
      careerPath="Data Science"
      careerColor="yellow"
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

//inscrição em palestra através de ID
export function signSession(token, idSession) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${token.access_token}`
  };

  var obj = {
    IdSession: idSession,
    Direction: 0
  };

  return dispatch => {
    //adiciona participante a uma palestra
    axios
      .post("/Session/AddAttendee", obj)
      //se não existir erro na chamada...
      .then(a => {
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

              alert("Inscrição efectuada com sucesso");

              //obter informações pessoais:
              axios
                .get("/Attendee/Detail")

                .catch(error => {
                  alert(error);
                })
                .then(sucess => {
                  dispatch({
                    type: SIGN_SESSION,
                    sessions: response.data,
                    Blocks: cenas,
                    changeGuestList: false,
                    careerPath: careerPath,
                    user: sucess.data
                  });
                });
            })
            .catch(function(error) {
              alert("Erro a obter sessões disponíveis!!");

              console.log(error);
            });
        } else {
          alert("Erro a inscrever na palestra");
          dispatch({
            type: SIGN_SESSION,
            waitChangeGuest: false
          });
        }
      })
      .catch(b => {
        alert("Erro a inscrever na palestra");
      });
  };
}

export function getSessions(token) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${token.access_token}`
  };

  return dispatch => {
    axios.defaults.baseURL = "http://enei2019.uingress.com/internal/api";

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
  };
}

export function getAvailableGuestlists(token) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${token.access_token}`
  };

  return dispatch => {
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
  
  //http://enei2019.uingress.com/internal/api/Attendee/ChangeGuestlist/

  axios.defaults.headers.common = {
    Authorization: `bearer ${token.access_token}`
  };

  return dispatch => {
    var full = `/Attendee/ChangeGuestlist/${guestID}`;

    axios
      .get(full)
      .then(function(response) {
        console.log(response)
        axios.defaults.baseURL = "http://enei2019.uingress.com/internal/api";

        axios.defaults.headers.common = {
          Authorization: `bearer ${token.access_token}`
        };

        axios
          .get("/Attendee/AvailableSessions")

          .then(function(response) {
            // handle success
            //console.log(response);

            var cenas = [];
            c= getCareerPath(response.data);
            const result = flow(
              groupBy("SessionStart")
              // map((Id) => ({Id})),
              //tap(console.log)
            )(response.data);

            for (let key in result) {
              result[key].option = 0;
              cenas.push(result[key]);
              console.log();
            }
            console.log(cenas);
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
  //http://enei2019.uingress.com/internal/api/Attendee/AvailableSessions

  axios.defaults.baseURL = "http://enei2019.uingress.com/internal/api";

  axios.defaults.headers.common = {
    Authorization: `bearer ${token.access_token}`
  };

  return dispatch => {
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
      });
  };
}

export function getEvents(user) {
  return dispatch => {
    let events = [];
    console.log("chegou aqui");
var i=0
    for (let key in user.Sessions) {
      events.push({
        key:i++,
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
   

    const result = flow(
      groupBy("day")
     
    )(events);

  
      var cenas=[];
    for (let key in result) {
      cenas.push(result[key]);
      console.log();
    }
    console.log(".--------")
    console.log(cenas);
    console.log(".--------")
    
    var a=[], b=[],c=[],d=[]
    
    for (let key in cenas[0]) {
      a.push({
        time:cenas[0][key].time ,
        timeEnd: cenas[0][key].timeEnd,
        imageUrl:cenas[0][key].imageUrl,
        description: cenas[0][key].description,
        name:cenas[0][key].name,
        Enrolled: cenas[0][key].Enrolled,
        MaxAttendees: cenas[0][key].MaxAttendees,
        day: cenas[0][key].day
      });
    }
    for (let key in cenas[1]) {
      b.push({
        time:cenas[1][key].time ,
        timeEnd: cenas[1][key].timeEnd,
        imageUrl:cenas[1][key].imageUrl,
        description: cenas[1][key].description,
        name:cenas[1][key].name,
        Enrolled: cenas[1][key].Enrolled,
        MaxAttendees: cenas[1][key].MaxAttendees,
        day: cenas[1][key].day
      });
    }
    for (let key in cenas[2]) {
      c.push({
        time:cenas[2][key].time ,
        timeEnd: cenas[2][key].timeEnd,
        imageUrl:cenas[2][key].imageUrl,
        description: cenas[2][key].description,
        name:cenas[2][key].name,
        Enrolled: cenas[2][key].Enrolled,
        MaxAttendees: cenas[2][key].MaxAttendees,
        day: cenas[2][key].day
      });
    }

    for (let key in cenas[3]) {
      d.push({
        time:cenas[3][key].time ,
        timeEnd: cenas[3][key].timeEnd,
        imageUrl:cenas[3][key].imageUrl,
        description: cenas[3][key].description,
        name:cenas[3][key].name,
        Enrolled: cenas[3][key].Enrolled,
        MaxAttendees: cenas[3][key].MaxAttendees,
        day: cenas[3][key].day
      });
    }
    dispatch({

      type: GET_EVENTS,
      events:a,
      day1:a,
      day2:b,
      day3:c,
      day4:d

    });
  };
}

const saveToken = async token => {
  try {
    await AsyncStorage.setItem("refreshToken", token.refreshToken).catch(
      a => {}
    );
    await AsyncStorage.setItem("userToken", token.access_token).catch(a => {});
    await AsyncStorage.setItem(
      "expirationDateToken",
      token.expirationDateToken.toString()
    ).catch(a => {});
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

const getToken = async () => {
  obj = {};
  try {
    obj.access_token = (await AsyncStorage.getItem("userToken")) || "none";
    obj.expirationDateToken =
      (await AsyncStorage.getItem("expirationDateToken")) || "none";
    obj.refreshToken = (await AsyncStorage.getItem("refreshToken")) || "none";
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return obj;
};

const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("expirationDateToken");
    await AsyncStorage.removeItem("refreshToken");
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

const renewToken = refresh => {};

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

    fetch("http://enei2019.uingress.com/internal/api/token", {
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
          tokenData: "error"
        });
      })
      .then(res => res.json())
      .then(parsed => {
        if (
          parsed.error_description ==
          "Provided username and password is incorrect"
        ) {
          dispatch({
            type: API_LOGIN,
            logged: false,
            failedAttempt: true,
            token: obj,
            user: { Name: "Henrique" }
          });
        }
        var obj = {
          access_token: parsed.access_token,
          expirationDateToken: Math.round(new Date().getTime() / 1000) + 3598,
          refreshToken: parsed.refresh_token,
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

    console.log('Chamada "getUserInfo"');

    var obj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    };

    fetch("http://enei2019.uingress.com/internal/api/Attendee/Detail", obj)
      .then(function(res) {
        console.log(res);
        let obj = JSON.parse(res._bodyText);

        dispatch({ type: USER_INFO, user: obj, onHold: false, logged: true });
      })
      .catch(function(res) {
        console.log("erro");
        //  dispatch({ type: USER_INFO,onHold:false});
        alert("Erro a obter a informação pessoal.");
      });
  };
}

export function logoutUser() {
  return dispatch => {
    deleteToken()
      .then(a => {
        console.log("token apagado");
        dispatch({
          type: LOGOUT_USER,
          loggedIn: false,
          tokenData: "error",
          token: false
        });
      })
      .catch(err => {
        console.log("errors");
      });
  };
}

//
function refreshToken() {
  refresh = a.refreshToken;

  //chamar funçao para renovar
  console.log("expirou");

  var details = {
    grant_type: "refresh_token",
    refresh_token: refresh
  };

  var formBody = [];

  for (var property in details) {
    var encodedKey = encodeURIComponent(property);

    var encodedValue = encodeURIComponent(details[property]);

    formBody.push(encodedKey + "=" + encodedValue);
  }

  formBody = formBody.join("&");

  fetch("http://enei2019.uingress.com/internal/api/token", {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },

    body: formBody
  })
    .then(res => res.json())
    .then(parsed => {
      console.log(parsed);

      if (parsed.error == "invalid_grant") {
        console.log(formBody);
        dispatch({ type: CHECK_USER, token: "", logged: false, onHold: false });
      } else {
        var obj = {
          access_token: parsed.access_token,
          expirationDateToken: Math.round(new Date().getTime() / 1000) + 3598,
          refreshToken: parsed.refresh_token,
          valid: true
        };

        // deleteToken();
        saveToken(obj).then(a => {
          console.log("Token guardado");
          console.log(obj);
          dispatch({
            type: CHECK_USER,
            token: obj,
            logged: true,
            onHold: false
          });
        });
      }
    })
    .catch(a => {
      console.log("erro na api");
      dispatch({ type: CHECK_USER, token: "", logged: false, onHold: false });
    });
}

refreshLogin = async (user, pass) => {
  console.log("login");

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

  fetch("http://enei2019.uingress.com/internal/api/token", {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },

    body: formBody
  })
    .catch(err => {
      console.log(err);

      alert("error");
    })
    .then(res => res.json())
    .then(parsed => {
      if (
        parsed.error_description ==
        "Provided username and password is incorrect"
      ) {
        console.error("cenas da vida");
      } else {
        console.log(parsed);

        var obj = {
          access_token: parsed.access_token,
          expirationDateToken: Math.round(new Date().getTime() / 1000) + 3598,
          refreshToken: parsed.refresh_token,
          valid: true
        };

        go();
        return obj;
      }
    });
};

go = t => {
  dispatch({
    type: CHECK_USER,
    logged: true,
    onHold: false,
    user: { Name: "Henrique" },
    token: t
  });
};

export function checkUser(userDetails) {
  var u = userDetails;

  return dispatch => {
    //verifica se existe utilizador em memória
    if (
      userDetails.username != undefined &&
      userDetails.username != "" &&
      userDetails.password != undefined &&
      userDetails.password != ""
    ) {
      //verifica a validade do token
      if (
        Math.round(new Date().getTime() / 1000) >=
        userDetails.token.expirationDateToken
      ) {
        var details = {
          username: userDetails.username,
          password: userDetails.password,
          grant_type: "password"
        };

        var formBody = [];

        for (var property in details) {
          var encodedKey = encodeURIComponent(property);

          var encodedValue = encodeURIComponent(details[property]);

          formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch("http://enei2019.uingress.com/internal/api/token", {
          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          body: formBody
        })
          .catch(err => {
            alert("Erro a validar o utilizador");
          })
          .then(res => res.json())
          .then(parsed => {
            if (
              parsed.error_description ==
              "Provided username and password is incorrect"
            ) {
              alert("Ups, password ou utilizador errada");
            } else {
              console.log(parsed);

              var obj = {
                access_token: parsed.access_token,
                expirationDateToken:
                  Math.round(new Date().getTime() / 1000) + 3598,
                refreshToken: parsed.refresh_token,
                valid: true
              };

              dispatch({
                type: CHECK_USER,
                logged: true,
                onHold: false,
                userDetails: u,
                token: obj
              });
            }
          });
      } else {
        console.log(
          "Tempo restante token: " +
            Math.round(
              (userDetails.token.expirationDateToken -
                Math.round(new Date().getTime() / 1000)) /
                60
            ) +
            " Minutos"
        );

        //dispatch home
        dispatch({
          type: CHECK_USER,
          logged: true,
          onHold: false,
          user: { Name: "Henrique" },
          userDetails: u
        });
      }
    }
    //utilizador não existe em memória
    else {
      dispatch({
        type: CHECK_USER,
        logged: false,
        onHold: false,
        userDetails: u
      });
      //dispatch menu de login
    }
  };
}
