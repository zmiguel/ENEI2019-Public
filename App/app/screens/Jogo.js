import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Button,
  TouchableOpacity,
  FlatList,
  Linking
} from "react-native";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import Modal from "react-native-modal";

import IconF from "react-native-vector-icons/Foundation";
import IconFA from "react-native-vector-icons/FontAwesome5";
import { ScrollView, ViewPagerAndroid } from "react-native-gesture-handler";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

import FitImage from "react-native-fit-image";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import PTRView from "react-native-pull-to-refresh";
import * as Actions from "../store/actions"; //Import your actionss

class Jogo extends React.Component {
 
 


  handleClick = (link) => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };

  state = {
    progress: 20,
    progressWithOnComplete: 0,
    progressCustomized: 0,
    isModalVisible: false, 
    cromo:{}
  };
  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value
    });
  };
  _update = () => {
    this.props.getCromos(this.props.user, this.props.internalToken);
  };
  _toggleModal = (item) => {
    this.setState({ isModalVisible: !this.state.isModalVisible , cromo: item});
    console.log("assd");
  };

  componentDidMount() {
    this.props.getCromos(this.props.user, this.props.internalToken);
  }
  render() {
    const { navigate } = this.props.navigation;

    const progressCustomStyles = {
      backgroundColor: "red",
      borderRadius: 0,
      borderColor: "orange"
    };

    const barWidth = Dimensions.get("screen").width - 30;

    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.isModalVisible}
          animationInTiming={1000}
          animationOutTiming={800}
          onBackdropPress={()=>this.setState({isModalVisible:false})}
        >
          <View
            style={{
              flex: 1,

              alignContent: "center",
              margin: SCREEN_WIDTH * 0.1,
              backgroundColor: "white",
              marginBottom: SCREEN_HEIGHT * 0.1,
              marginTop: SCREEN_HEIGHT * 0.1,
              maxHeight: 400
            }}
          >
            <ImageBackground
              opacity={0.5}
              source={require("../assets/img/bg_3.jpg")}
              style={{
                width: "96%",
                height: "97.5%",
                margin: 10
              }}
            >
              <View style={{ width: "100%", margin: -10 }}>
                <View style={{ width: 30 }}>
                  <Button
                    onPress={()=>this.setState({isModalVisible:false})}
                    title="X"
                    color="#CC1A17"
                    accessibilityLabel=""
                  />
                </View>
              </View>

              {  this.state.cromo.unlocked &&
              <View
                style={{
                  flex: 1,
                  alignContent: "center",
                  width: "96%",
                  alignItems: "center"
                }}
              >
                <View style={{ paddingTop: 25, width: "40%" }}>
                
                  <FitImage
                    source={{
                      uri: this.state.cromo.logo}}
                    style={styles.fitImage}
                  />
                  
                </View>
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.6)",
                    width: "100%",
                    marginTop: 35
                  }}
                >
                  <Text style={{ padding: 10 }}>
                   {this.state.cromo.descMostrar}
                  </Text>
                </View>
                <View style={{ width: "100%", marginTop: 10 }}>
                  <TouchableOpacity onPress={()=>this.handleClick(this.state.cromo.websiteCromo)} >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "#CC1A17"
                      }}
                    >
                      website
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              }

{ this.state.cromo.unlocked!= true &&
              <View
                style={{
                  flex: 1,
                  alignContent: "center",
                  width: "96%",
                  alignItems: "center"
                }}
              >
                <View style={{ paddingTop: 25, width: "40%" }}>
                
                  <FitImage
                    source={{uri:"https://i.imgur.com/LrOOupY.png"}}
                    style={styles.fitImage}
                  />
                  
                </View>
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.6)",
                    width: "100%",
                    marginTop: 35
                  }}
                >
                  <Text style={{ padding: 10 }}>
                   {this.state.cromo.descMostrar}
                  </Text>
                </View>
                <View style={{ width: "100%", marginTop: 10 }}>
                 
                </View>
              </View>
              }

            </ImageBackground>
          </View>
        </Modal>

        <PTRView onRefresh={this._update}>
    
        <View style={{ height: 50, backgroundColor: "#eeeeee" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              flexDirection: "row"
            }}
          >
       
            <View
              style={{
                width: SCREEN_WIDTH * 0.7,
                flex: 1,
                flexDirection: "row",
                margin: 10,
                marginLeft: SCREEN_WIDTH * 0.1
              }}
            >
              <IconFA name="trophy" size={30} />
              {this.props.cromos!= undefined &&
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}
              >
                { this.props.cromos.pontuacao}
              </Text>
              }
              <Text style={{ margin: 5 }}>pontos</Text>
            </View>
            <View
              style={{
                width: SCREEN_WIDTH * 0.3,
                marginTop: 8,
                marginRight: SCREEN_WIDTH * 0.1
              }}
            >
              <Button
                onPress={()=>this.handleClick("https://enei.pt/jogoenei")}
                title="Prémios"
                color="#CC1A17"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </View>
        <View style={styles.progress}>
          <View style={{ alignItems: "center" }} />
          <View
            style={{
              backgroundColor: "#FDFDFD",
              shadowColor: "#000",
              shadowOffset: { height: 2, width: 0, shadowRadius: 1 },
              elevation: 3
            }}
          >
            <View
              style={{
                flex: 1,
                margin: 20,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
             {this.props.cromos!= undefined &&
              <Text style={{ fontWeight: "bold" }}> { this.props.cromos.pontuacao}</Text>}
              {this.props.cromos!= undefined &&
              <ProgressBarAnimated
                width={barWidth * 0.7}
                value={this.props.cromos.pontuacao*100/1024}
                backgroundColorOnComplete="#CC2A17"
              />}
              <Text style={{ fontWeight: "bold" }}>1024</Text>
            </View>
          </View>
        </View>
         <ScrollView
          style={{ backgroundColor: "#eeeeee", marginTop: 10 }}
          horizontal={true}
        >
          <ScrollView>
            <View style={styles.cromosContainer}>{this.props.cromos!=undefined &&
              <FlatList
                data={this.props.cromos.cromos}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>this._toggleModal(item)}>
                    <View style={styles.cromo}>{
                      item.unlocked &&
                   
                      <ImageBackground
                        source={{uri:item.img}}
                        style={styles.imageBg}
                      >
                        <View style={[styles.triangle, this.props.style]} />
                        <Text style={styles.points}>{item.pontos}</Text>
                      
                        <Text style={styles.number}>{item.id-1}</Text>
                      </ImageBackground>
                       }
                       {
                      !item.unlocked &&
                   
                      <ImageBackground
                        source={require('../assets/img/jogo/enei_black_2.png')}
                        style={styles.imageBg}
                      >
                        <View style={[styles.triangle, this.props.style]} />
                        <Text style={styles.points}>{item.pontos}</Text>
                       
                        <Text style={styles.number}>{item.id-1}</Text>
                      </ImageBackground>
                       }
                    </View>
                  </TouchableOpacity>
                )}
                numColumns={5} // Número de colunas
              />}
            </View>
          </ScrollView>
        </ScrollView>
        </PTRView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fitImage: {},
  points: {
    marginTop: -25,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#CC1A17",
  //  backgroundColor:"#cc1a17",
  },

  cromosContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginLeft: 10,
    marginRight: 10
  },
  cromo: {
    backgroundColor: "white",
    margin: 3,
    height: 200,
    width: 130,
    borderRadius: 0
  },
  imageBg: {
    height: 190,
    margin: 5
  },
  label: {
    margin: 10
  },
  progress: {
    backgroundColor: "#eeeeee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 1
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    textAlign: "center"
  },
  titleContainer: {
    margin: 10
  },
  header: {
    backgroundColor: "#CC2A17",

    //alignItems:'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 5
  },
  container: {
    flex: 1,
    backgroundColor: "#eeeeee"
    // alignItems: 'center',
    //justifyContent: 'space-around',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 67,
    borderRightWidth: 0,
    borderBottomWidth: 20,
    transform: [{ rotate: "180deg" }],
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white"
  },
  triangleNumber: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 67,
    borderRightWidth: 0,
    borderBottomWidth: 20,
    transform: [{ rotate: "0deg" }],
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    marginLeft: 54,
    marginTop: 156
  },
  number: {
    marginTop: -13,
    marginLeft: 100,
    textAlign: "center",

    color:'#cc1a17'
  }
});

function mapStateToProps(state, props) {
  return {
    token: state.apiReducer.token,
    user: state.apiReducer.user,

    internalToken: state.apiReducer.internalToken,
    cromos: state.apiReducer.cromos
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jogo);
