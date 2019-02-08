import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);


const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const FourthRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);





export default class Eventos extends React.Component { 
  
  state = {
  index: 0,
  routes: [
    { key: 'first', title: 'Festarola' },
    { key: 'second', title: 'Febrada' },
    { key: 'third', title: 'Rally' },
    { key: 'fourth', title: 'Peddy' },

  ],
};

render() {
  return (
    <TabView
      navigationState={this.state}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third:ThirdRoute,
        fourth: FourthRoute
      })}
      onIndexChange={index => this.setState({ index })}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  );
}
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});