import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions';

 class Calendar extends React.Component {
  constructor(props) {
        
    super(props);

    this.state = {
        token:{valid:false},
        logged:true,
        onHold:true,
        user:{}
    };

 
}
componentDidMount() {


  this.props.hold();
  //this.props.logoutUser();
  //console.log(this.props.token);

  this.props.getUserInfo(this.props.token);


  //console.log('logged:'+this.props.logged);

  //console.log(this.props)

  //console.log(this.props.user)
  
}

  render() {
    const { navigate } = this.props.navigation;
    
    if(this.props.user.Name!=undefined){
      
      console.log(this.props.user.Name)

      return (
     
        <View style={styles.container}>
          <Text style={styles.title}>a{this.props.user.Name}</Text>
        </View>
      );
    }
  
    return (
     
      <View style={styles.container}>
        <Text style={styles.title}>fk</Text>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

function mapStateToProps(state, props) {
    
  return {

      token: state.apiReducer.token,  
      loggedIn: state.apiReducer.loggedIn,
      onHold: state.apiReducer.onHold,
      logged:state.apiReducer.logged,
      user:state.apiReducer.user
  
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);