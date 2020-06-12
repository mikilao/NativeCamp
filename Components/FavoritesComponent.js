import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../Shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import {deleteFavorite} from '../Redux/ActionCreator';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favorites: state.favorites
    }
}
const mapDispatchToProps = {    deleteFavorite: campsiteId => (deleteFavorite(campsiteId))};

class Favorites extends Component {
    static navigationOptions = {
        title: "My Favorites"
    }
    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({ item }) => {
            const rightButton = [{
                text: 'delete',
                type: 'delete',
                onPress: () =>{
                    Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you want to delete' + item.name +'?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log(item.name + 'Not Deleted'),
                            },
                            {
                                text: 'OK',
                                onPress: () => this.props.deleteFavorite(item.id)
                            }
                        ],
                        {cancelable: false}
                    )
                } 
            }];
            return (
                <Swipeout right={rightButton} autoClose={true}>
                      <Animatable.View animation='fadeInRightBig' duration={2000} > 
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                /></Animatable.View>
                </Swipeout>
            );
        };
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text> {this.props.campsites.errMess}</Text>
                </View>
            )
        }
        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        return (
            <FlatList
                data={this.props.campsites.campsites.filter(//returns just the campsites id with the favorite attr.
                    campsite => this.props.favorites.includes(campsite.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}

            />
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);