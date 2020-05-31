import {ScrollView, Text, ListItem} from 'react-native';
import React, { Component } from 'react';
import {Card} from 'react-native-elements';
import {PARTNERS} from '../Shared/partners';
import { createStackNavigator } from 'react-navigation';
import Home from './HomeComponent'
import Contact from './ContactComponent';
import Directory from './DirectoryComponent'

const AboutNavigator = createStackNavigator(
    { Home: {screen: Home},
     Directory: {screen: Directory},
     Contact: {screen: Contact},
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
class About extends Component {
    constructor(props){
        super(props);
        this.state={
       //     partner=PARTNERS
        }
    }

    static navigationOptions ={// sets the titles during navigation
        title: 'About'
    }
    render(){
    /*    const renderPartner = {{item}}  => {
            return(
            <ListItem
            ></ListItem>
             ) }*/
        return (
        <ScrollView>
          
   

        </ScrollView>
        )
    }
}
export default About;