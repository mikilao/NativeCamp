import React, {Component} from 'react';
import { FlatList } from 'react-native';
import {CAMPSITES} from '../Shared/campsites';
import { ListItem } from 'react-native-elements';


class Directory extends Component {
    constructor(props){
        super(props);
        this.state={
            campsites: CAMPSITES
        };
    }
    static navigationOptions = { //sets a method for navigation options
        title: 'Directory'
    };
render() {
    const { navigate } = this.props.navigation; //how we navigate
  
    const renderDirectoryItem = ({item}) => {//will iterate through campsites from the flatlist
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})} //directing where to navigate 
                leftAvatar={{ source: require('./images/react-lake.jpg')}}
            />
        );
    };

    return (
        <FlatList 
            data={this.state.campsites}//reads everything from campsites file
            renderItem={renderDirectoryItem}// render each item in campsites
            keyExtractor={item => item.id.toString()}//pulls each id number and sets it as the unique key
        />
    );
  }
}

export default Directory;