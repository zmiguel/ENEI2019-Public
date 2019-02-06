import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);




export default class Eventos extends React.Component { 
  
  state = {
  index: 0,
  routes: [
    { key: 'first', title: 'Sex 12' },
    { key: 'second', title: 'Sab 13' },
    { key: 'second', title: 'Dom 14' },
    { key: 'second', title: 'Seg 15' },

  ],
};

render() {
  return (
    <TabView
      navigationState={this.state}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
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