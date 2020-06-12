import React, {Component} from 'react';
import { FlatList, View, Text} from 'react-native';
import Loading from './LoadingComponent';
import { Tile } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
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
            <Animatable.View animation='fadeInRightBig' duration={2000} > 
            <Tile
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})} //directing where to navigate 
                imageSrc= {{uri:baseUrl + item.image}}
                //leftAvatar={{ source: require('./images/react-lake.jpg')}}
            />
            </Animatable.View>
        );
    };

        if(this.props.campsites.isLoading){
            return <Loading />;
            }
        if(this.props.campsites.errMess){
            return(
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            )
        }
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