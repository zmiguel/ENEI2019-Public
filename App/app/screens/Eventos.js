import * as React from "react";

import {View, 
    StyleSheet, 
    Dimensions, 
    Text, 
    Button, 
    ScrollView, 
    Image, 
    TouchableOpacity,
    FlatList
} from "react-native";

import {TabView, TabBar, SceneMap} from "react-native-tab-view";

import rallyImg from '../assets/rallyTascas.jpg';

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as Actions from "../store/actions"; //Import your actionss
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;


import PTRView from "react-native-pull-to-refresh";

class Eventos extends React.Component {
    
_update=()=> {
    this.props.getAllEvents(this.props.internalToken);
    this.props.getEventLocsVisited(this.props.team.id,this.props.internalToken);
}
    state = {
        index: 0,
        routes: [
            {key: "first", title: "Festarola"},
            {key: "second", title: "Febrada"},
            {key: "third", title: "Rally"},
            {key: "fourth", title: "Peddy"}
        ]
    };

    componentDidMount(){
        this.props.getAllEvents(this.props.internalToken);
        this.props.getEventLocsVisited(this.props.team.id,this.props.internalToken);
    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <PTRView onRefresh={this._update}>
            <View style={styles.container}>
                <ScrollView styles={styles.scroll}>
                <FlatList
  data={this.props.eventsInternal}
  renderItem={({item}) => 
  <View>
  <TouchableOpacity onPress={() => navigate('eventDetail',{ info: item })}>
  <View style={styles.cardContainer}>
      <Image
          style={{
              flex: 1,
              width: undefined,
              height: undefined
          }}
          resizeMode="contain"
          source={{uri: item.imagem}}
  
      >
      </Image>
      <View style={styles.cardDesc}>
          <Text style={styles.cardDescText}>{item.nome}</Text>
          <Text style={styles.cardHours}>{item.horas}</Text>
          </View>
  </View>
  </TouchableOpacity>
</View>}
/>
               
           
         
            
                </ScrollView>
            </View>
            </PTRView>
        );
    }
}

const styles = StyleSheet.create({
    cardHours:{
        textAlign:'center',
        color:'white',
        margin:10,
       
       // width:'20%'
    },

    cardDesc:{
        //alignSelf:'center',
        backgroundColor:'#CC1A17',
       // flex:1,
        flexDirection:'row',
       

    },
    cardDescText:{
        fontWeight:'bold',
        color:'white',
        fontSize:18,
       
       width:'45%',
        margin:10

    },
    container: {
        backgroundColor: '#eee',
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        paddingBottom:20
     
    },


    scroll: {
        flex: 1,
    },

    cardContainer: {
        flex: 1,
        //flexDirection: 'row',
        //padding: 10,
        margin: 20,
        marginBottom:0,
        backgroundColor: '#fff',
        height: SCREEN_WIDTH * 0.62,
        borderRadius: 5,
        //borderWidth: 2,
    },

    scene: {
        flex: 1
    }
});
function mapStateToProps(state, props) {
    return {
      token: state.apiReducer.token,
      user: state.apiReducer.user,
      logged: state.apiReducer.logged,
      userDetails: state.apiReducer.userDetails,
      onHold: state.apiReducer.onHold,
      bilhete: state.apiReducer.bilhete,
      alimentacao: state.apiReducer.alimentacao,
      alojamento: state.apiReducer.alojamento,
      acesso: state.apiReducer.acesso,
      team: state.apiReducer.team,
      internalToken: state.apiReducer.internalToken,
      eventsInternal:state.apiReducer.eventsInternal
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Eventos);