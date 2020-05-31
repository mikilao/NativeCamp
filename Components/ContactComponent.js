import {ScrollView, Text} from 'react-native';
import {Card} from 'react-native-elements'
import React, { Component } from 'react';
import {createDrawerNavigator, createStackNavigator } from 'react-navigation'
import Home from './HomeComponent';
import About from './AboutComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';

const ContactNavigator = createStackNavigator(
    { Home: {screen: Home},
     Directory: {screen: Directory},
     About: {screen: About}
     
     
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
 );
export default class Contact extends Component {

    static navigationOptions ={// sets the titles during navigation
        title: 'Contact us'
    }
    render(){
        return (
        <ScrollView>
            <Card title='Contact Information'
            wrapperStyle={{margin: 20}}>
                <Text >
                1 Nucamp Way </Text>
                        <Text style={marginBottom=10}>    Seattle, WA 98001  U.S.A. </Text>

                           <Text> Phone: 1-206-555-1234 </Text>
                           <Text> Email: campsites@nucamp.com
                </Text>
            </Card>
            <ContactNavigator />
        </ScrollView>
        )
    }
}