import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ImageBackground,
  Dimensions,
  Button,
  TouchableOpacity
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Modal from "react-native-modal";


import IconF from "react-native-vector-icons/Foundation"
import IconFA from "react-native-vector-icons/FontAwesome5"
import { ScrollView, ViewPagerAndroid } from 'react-native-gesture-handler';


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

import FitImage from 'react-native-fit-image';
export default class Jogo extends React.Component {
state = {
      progress: 20,
      progressWithOnComplete: 0,
      progressCustomized: 0,
      isModalVisible: false,
    } ;
    increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });   
  }

  _toggleModal = () =>{
    this.setState({ isModalVisible: !this.state.isModalVisible });
     console.log("assd")
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
       
       <Modal 
       isVisible={this.state.isModalVisible}
       animationInTiming={1000}
       animationOutTiming={800}
      
       
       >
     
       
                <View style={{ 
                  flex:1,
               
                  alignContent:'center', 
              margin :SCREEN_WIDTH*0.1,
              backgroundColor:'white',
                  marginBottom:SCREEN_HEIGHT*0.1,
                  marginTop:SCREEN_HEIGHT*0.1,
                  maxHeight:400
                  }}>
              
               <ImageBackground 
                    opacity={0.5}
                  source={require('../assets/img/bg_3.jpg')}
                  style={{
                    width:'96%',
                    height:'97.5%',
                    margin:10
                  }}
                >
                      <View style={{width:'100%' ,margin:-10}}>
                      <View style={{width:30}}><Button
                    
                    onPress={this._toggleModal}
                     title="X"
                     color="#CC1A17"
                     accessibilityLabel="Learn more about this purple button"
                    />
                    </View>
                     </View>
                     <View style={{flex:1, alignContent:'center', width:'96%', alignItems:'center'}}>
                      <View style={{paddingTop:25,width:'40%',}}>
                      <FitImage
  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/CSW_Gradiente_rgb.png' }}
  style={styles.fitImage}
/>  
                      </View>
                      <View style={{backgroundColor:'rgba(255,255,255,0.6)', width:'100%', marginTop:35}}>
                      <Text style={{padding:10}}>A CRITICAL Software fornece sistemas e serviços de software para segurança e
aplicações essenciais aos negócios, ajudando a garantir que os clientes atendam aos requisitos mais exigentes de qualidade - padrões de segurança, desempenho e fiabilidade</Text>
                     </View>
                     <View style={{width:'100%', marginTop:10}}><TouchableOpacity><Text style={{textAlign:'center', fontWeight:'bold', fontSize:18, color:'#CC1A17'}}>website</Text></TouchableOpacity></View>
                     </View>
                    
                   
                </ImageBackground>
             
               
           
                </View>
             
              
           </Modal>

        <View style={styles.header}>
          <View style={styles.titleContainer}>
             <Text style={styles.title}>Jogo do ENEI'19</Text>
           
          </View>
                    
          
        
        </View> 
        <View style={{ height:50, backgroundColor:'white'}}>
            <View style={{flex:1, justifyContent:'space-around', flexDirection:'row'}}>
                <View style={{width:SCREEN_WIDTH*0.7, flex:1, flexDirection:'row',margin:10, marginLeft:SCREEN_WIDTH*0.10}}>
                <IconFA name="trophy" size={30}/>
                    <Text style={{fontWeight:'bold', fontSize:20,marginLeft:10}}>45</Text>
                    <Text style={{margin:5}}>pontos</Text>
                </View>
                <View style={{width:SCREEN_WIDTH*0.3, marginTop:8, marginRight:SCREEN_WIDTH*0.1}}>
                <Button
onPress={this._toggleModal}
 title="Prémios"
 color="#CC1A17"
 accessibilityLabel="Learn more about this purple button"
/>
                </View>
              
            </View>
             
            </View>
        <View style={styles.progress}>
          <View style={{ alignItems:'center'}}>
            
          
              
                
          </View>
          <View style={{backgroundColor:'#FDFDFD', shadowColor:"#000", shadowOffset:{height:2, width:0, shadowRadius:1}, elevation:3,}}>
          <View style={{flex:1,margin: 20, alignItems:'center',flexDirection:'row', justifyContent: 'space-around',}}>
          <Text style={{fontWeight:'bold'}} > 1 </Text>
              <ProgressBarAnimated
                width={barWidth*0.7}
                value={this.state.progress}
                backgroundColorOnComplete="#CC2A17"
                />
            <Text style={{fontWeight:'bold'}}> 2 </Text>
          </View>
          </View>
        </View>
        <ScrollView style={{backgroundColor:'#eeeeee',marginTop:10}} horizontal={true}> 
            <ScrollView>
            <View style={styles.cromosContainer}>

            
        

        <TouchableOpacity onPress={this._toggleModal}>
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
               
               
               
                </TouchableOpacity>
                
               
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
                    <Text style={styles.number}>4</Text>
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
                    <Text style={styles.number}>6</Text>
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
                    <Text style={styles.number}>7</Text>
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
                    <Text style={styles.number}>8</Text>
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
                    <Text style={styles.number}>9</Text>
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
                    <Text style={styles.number}>10</Text>
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
                    <Text style={styles.number}>11</Text>
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
                    <Text style={styles.number}>12</Text>
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
                    <Text style={styles.number}>13</Text>
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
                    <Text style={styles.number}>14</Text>
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
                    <Text style={styles.number}>15</Text>
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
                    <Text style={styles.number}>16</Text>
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
                    <Text style={styles.number}>17</Text>
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
                    <Text style={styles.number}>18</Text>
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
                    <Text style={styles.number}>19</Text>
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
                    <Text style={styles.number}>20</Text>
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
                    <Text style={styles.number}>21</Text>
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
                    <Text style={styles.number}>22</Text>
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
                    <Text style={styles.number}>23</Text>
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

    fitImage:{
     
  
    },
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
       
        height:190,
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
    textAlign:'center'
    
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
    marginTop:156
  },
  number:{
      marginTop:-18,
      marginLeft:103,
      textAlign: 'center'
  }
});