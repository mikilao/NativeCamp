import {ScrollView, Text, ListItem, FlatList} from 'react-native';
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
class Mission extends Component{
    render(){
        return(
              <Card title='Mission'
            wrapperStyle={{margin: 20}}>
                <Text >
                We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
                </Text>
            </Card>
        )
    }
}

class About extends Component {
    constructor(props){
        super(props);
        this.state={
            partner: PARTNERS
        }
    }

    static navigationOptions ={// sets the titles during navigation
        title: 'About'
    } 
    
    render(){
       
  
        const renderPartner = ({item}) => {//will iterate through campsites from the flatlist
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: require('./images/bootstrap-logo.png')}}
                />
            );
        };
    return(
        <ScrollView>
            <Mission />
            <Card title="Community Partners">
                <FlatList data={this.state.partner}
                keyExtractor={item => item.id.toString()}
                    renderItem={renderPartner} />
                        </Card>

        </ScrollView>
        )
    }
}
export default About;