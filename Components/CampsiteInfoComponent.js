import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { render } from 'react-dom';
import { CAMPSITES } from '../Shared/campsites';

function RenderCampsite({campsite}) {   
    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}> 
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
            </Card>
        );
    }
    return <View />;// returns an empty view if campsites returns false
}

class CampsiteInfo extends Component{
    constructor(props) {
        super(props);
    this.state = {
        campsite: CAMPSITES
    };
    }
    static navigationOptions ={// sets the titles during navigation
        title: 'Campsite Information'
    }
        render(){
            const campsiteId =this.props.navigation.getParam('campsiteId');
            const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0]
    return <RenderCampsite campsite={campsite} />; //now renders the filtered campsite in view
    }
}

export default CampsiteInfo;