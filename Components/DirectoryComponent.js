import React, {Component} from 'react';
import { FlatList } from 'react-native';

import { Tile } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../Shared/baseUrl';

const mapStateToProps = state =>{//redux
    return{
        campsites: state.campsites
    }
}


class Directory extends Component {
    
    static navigationOptions = { //sets a method for navigation options
        title: 'Directory'
    };
render() {
    const { navigate } = this.props.navigation; //how we navigate
  
    const renderDirectoryItem = ({item}) => {//will iterate through campsites from the flatlist
        return (
            <Tile
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})} //directing where to navigate 
                image= {{uri:baseUrl + item.image}}
                //leftAvatar={{ source: require('./images/react-lake.jpg')}}
            />
        );
    };

    return (
        <FlatList 
            data={this.props.campsites.campsites}//reads everything from campsites file
            renderItem={renderDirectoryItem}// render each item in campsites
            keyExtractor={item => item.id.toString()}//pulls each id number and sets it as the unique key
        />
    );
  }
  
}


export default connect(mapStateToProps)( Directory);