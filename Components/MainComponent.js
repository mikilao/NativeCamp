import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import {View }from 'react-native'
import { CAMPSITES } from '../Shared/campsites';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          campsites: CAMPSITES,
          selectedCampsite: null
        };
    }
    onCampsiteSelect(campsiteId) {// how to handle when a campsite is clicked
        this.setState({selectedCampsite: campsiteId})//updates the states
    }

    render() {
       return ( 
        <View style={{flex: 1}}>
                <Directory campsites={this.state.campsites} onPress={campsiteId => this.onCampsiteSelect(campsiteId)} />
                <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />
            </View>
    )
}
}

export default Main;