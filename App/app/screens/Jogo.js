import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ImageBackground,
  Dimensions,
  Button
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';


import IconF from "react-native-vector-icons/Foundation"
import IconFA from "react-native-vector-icons/FontAwesome5"
import { ScrollView } from 'react-native-gesture-handler';


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;


export default class Jogo extends React.Component {
state = {
      progress: 20,
      progressWithOnComplete: 0,
      progressCustomized: 0,
    } ;
    increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });   
  }
  render() {
    
    const { navigate } = this.props.navigation;


  const progressCustomStyles = {
    backgroundColor: 'red', 
    borderRadius: 0,
    borderColor: 'orange',
  };   
  const barWidth = Dimensions.get('screen').width - 30;
    return (


      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
             <Text style={styles.title}>Jogo do ENEI'19</Text>
           
          </View>
            <View>
             
            </View>          
          
        
        </View> 
        <View style={styles.progress}>
          <View style={{ alignItems:'center'}}>
            <View>
            
              <Text style={styles.label}>Progresso no Jogo</Text>
            </View>
          
              
                
          </View>
          <View style={{backgroundColor:'#FDFDFD', shadowColor:"#000", shadowOffset:{height:2, width:0, shadowRadius:1}, elevation:3,}}>
          <View style={{flex:1,margin: 20, alignItems:'center',flexDirection:'row', justifyContent: 'space-around',}}>
          <IconFA name="hourglass" size={15}/>  
              <ProgressBarAnimated
                width={barWidth*0.7}
                value={this.state.progress}
                backgroundColorOnComplete="#CC2A17"
                />
              <IconFA name="hourglass" size={15}/>
          </View>
          </View>
        </View>
        <ScrollView style={{backgroundColor:'#eeeeee',marginTop:10}} horizontal={true}> 
            <ScrollView>
            <View style={styles.cromosContainer}>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/critical.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>0</Text>
                </ImageBackground>
                
        
      
                </View>
               
               
               
               
                
               
                <View style={styles.cromo}>
                <ImageBackground 
                  source={require('../assets/img/jogo/novabase.png')}
                 
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>1</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                 
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>2</Text>
                </ImageBackground>
                
        
      
                </View>
                
                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>3</Text>
                </ImageBackground>
                
        
      
                </View>

                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>04</Text>
                </ImageBackground>
                
        
      
                </View>

              <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>5</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
               
         
             </View>
             <View style={styles.cromosContainer}>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>0</Text>
                </ImageBackground>
                
        
      
                </View>
               
               
               
               
                
               
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/ubiwhere.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>1</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>2</Text>
                </ImageBackground>
                
        
      
                </View>
                
                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>3</Text>
                </ImageBackground>
                
        
      
                </View>

                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>04</Text>
                </ImageBackground>
                
        
      
                </View>

              <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>5</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
               
         
             </View>
            
             <View style={styles.cromosContainer}>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>0</Text>
                </ImageBackground>
                
        
      
                </View>
               
               
               
               
                
               
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>1</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>2</Text>
                </ImageBackground>
                
        
      
                </View>
                
                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>3</Text>
                </ImageBackground>
                
        
      
                </View>

                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>04</Text>
                </ImageBackground>
                
        
      
                </View>

              <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>5</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
               
         
             </View>
            
             <View style={styles.cromosContainer}>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                 
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>0</Text>
                </ImageBackground>
                
        
      
                </View>
               
               
               
               
                
               
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>1</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>2</Text>
                </ImageBackground>
                
        
      
                </View>
                
                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>3</Text>
                </ImageBackground>
                
        
      
                </View>

                <View style={styles.cromo}>
                <ImageBackground 
                  
                 source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>04</Text>
                </ImageBackground>
                
        
      
                </View>

              <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>5</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
                <View style={styles.cromo}>
                <ImageBackground 
                  
                  source={require('../assets/img/jogo/enei_black_2.png')}
                  style={styles.imageBg}
                >
                    <View style={[styles.triangle, this.props.style]} />
                    <Text style={styles.points}>15</Text>
                    <View style={[styles.triangleNumber, this.props.style]} />
                    <Text style={styles.number}>01</Text>
                </ImageBackground>
                
        
      
                </View>
               
         
             </View>
        
            
               
         
            
             
      
            
             </ScrollView>
      
          </ScrollView>
       
       
      </View>
    
    );
  
  }

}

const styles = StyleSheet.create({
    points:{
        marginTop:-25,
        marginLeft:10,
        fontWeight:'bold',
        color:'#CC1A17'
    },

    cromosContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-around',
        marginLeft:10,
        marginRight:10,
    },
    cromo:
        {
            backgroundColor:'white', 
           margin:3,
            height:200, 
            width:130, 
            borderRadius:0}
    ,
    imageBg:{
       
        height:'97%',
        margin:5
    },
  label:{
    margin:10
  },
  progress:{
    backgroundColor:'#eeeeee',
    shadowColor:'#000',
    shadowOffset:{width:0, height:2},
    shadowRadius:1,
    elevation:1,
  },
  title:{
    fontWeight:'bold',
    fontSize:25,
    color:'white',
    
  },
  titleContainer:{
  
    margin:10,
  },
  header:{
    backgroundColor:'#CC2A17',

    //alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{width:0, height:2},
    shadowRadius:1,
    elevation:5,
    
  },
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
   // alignItems: 'center',
    //justifyContent: 'space-around',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth:67,
    borderRightWidth: 0,
    borderBottomWidth: 20,
    transform: [{ rotate: '180deg'}],
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white'
  },
  triangleNumber: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth:67,
    borderRightWidth: 0,
    borderBottomWidth: 20,
    transform: [{ rotate: '0deg'}],
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    marginLeft:54,
    marginTop:155
  },
  number:{
      marginTop:-18,
      marginLeft:103,
      textAlign: 'center'
  }
});