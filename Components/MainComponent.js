import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import {View, Platform }from 'react-native';
import {createDrawerNavigator, createStackNavigator } from 'react-navigation'
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';


const DirectoryNavigator = createStackNavigator(
    {//chose which components are available 
        Directory:{screen: Directory},
        CampsiteInfo:{screen: CampsiteInfo}
    },
    {//Header
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);
const ContactNavigator = createStackNavigator(
    { Home: {screen: Home},
     Directory: {screen: Directory},
     About: {screen: About},
     CampsiteInfo:{screen: CampsiteInfo}
 },
  {//Header
     initialRouteName: 'Contact',
     navigationOptions: {
         headerStyle:{
             backgroundColor: '#5637DD'
         },
         headerTintColor: '#fff',
         headerTitleStyle:{
             color: '#fff'
         }
     }
 }
 );
const AboutNavigator = createStackNavigator(
    { About: {screen: About}
 },
  {//Header
   initialRouteName: 'About',
     navigationOptions: {
         headerStyle:{
             backgroundColor: '#5637DD'
         },
         headerTintColor: '#fff',
         headerTitleStyle:{
             color: '#fff'
         }
     }
 }
 );
const HomeNavigator = createStackNavigator(
    {//chose which components are available 
       Home: {screen: Home},
    
    },
    {//Header
               navigationOptions: {
            headerStyle:{
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle:{
                color: '#fff'
            }
        }
    }
)
const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },//changes the screen from a collapsable menu 
        Directory: { screen: DirectoryNavigator },
        About: {screen: AboutNavigator},
        Contact: {screen: ContactNavigator}
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);


class Main extends Component {
  
   // onCampsiteSelect(campsiteId) {// how to handle when a campsite is clicked
     //  this.setState({selectedCampsite: campsiteId})//updates the states
  //  }

    render() {
       return ( 
        <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                 
                <MainNavigator />            
              </View>
    )
}
}

export default Main;