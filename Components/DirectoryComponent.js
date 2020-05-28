import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Directory(props) {

    const renderDirectoryItem = ({item}) => {//will iterate through campsites from the flatlist
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                onPress={() => props.onPress(item.id)}
                leftAvatar={{ source: require('./images/react-lake.jpg')}}
            />
        );
    };

    return (
        <FlatList 
            data={props.campsites}//reads everything from campsites file
            renderItem={renderDirectoryItem}// render each item in campsites
            keyExtractor={item => item.id.toString()}//pulls each id number and sets it as the unique key
        />
    );
}

export default Directory;