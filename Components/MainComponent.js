import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import {View, Platform }from 'react-native';
import { createStackNavigator } from 'react-navigation'

const DirectoryNavigator = createStackNavigator(
    {//chose which components are available 
        Directory:{screen: Directory},
        CampsiteInfo:{screen: CampsiteInfo}
    },
    {//Header
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle:{
                backgroundColor: '#563700'
            },
            headerTintColor: '#fff',
            headerTitleStyle:{
                color: '#fff'
            }
        }
    }
)
class Main extends Component {
  
   // onCampsiteSelect(campsiteId) {// how to handle when a campsite is clicked
     //   this.setState({selectedCampsite: campsiteId})//updates the states
    //}

    render() {
       return ( 
        <View style={{flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                
                <DirectoryNavigator />             
              </View>
    )
}
}

export default Main;