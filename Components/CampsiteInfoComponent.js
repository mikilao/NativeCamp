import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../Shared/baseUrl';

const mapStateToProps = state =>{
    return{
        campsites: state.campsites,
        comments: state.comments
    }
}

function RenderCampsite({props}) {   
    const {campsite} = props; 

    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}> 
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
               < Icon 
               name= {props.favorite ? "heart":'heart-o'} // ternary operator
               type='font-awesome'
               color='#f50'
                raised
              reverse
               onPress={() => props.favorite ? console.log("favorited already"): props.markFavorite()}
               />
            </Card>
        );
    }
    return <View />;// returns an empty view if campsites returns false
}
function RenderComments({comments}) {   
   const renderCommentItem = ({item}) => {
       return(
           <View style = {{margin:10}}>
               <Text style={{fontSize: 14}} > {item.text}</Text>
               <Text style={{fontSize: 12}} > {item.rating}</Text>
               <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
           </View>
       );
   };
        return (
            <Card
                title="Comments">
               <FlatList
               data ={comments}
               renderItem={renderCommentItem}
               keyExtractor={item => item.id.toString()} />
            </Card>
        );
    }
class CampsiteInfo extends Component{
    constructor(props) {
        super(props);
    this.state = {
      
        favorite: false
    };
}
markFavorite() {
    this.setState({favorite: true});
}
    static navigationOptions ={// sets the titles during navigation
        title: 'Campsite Information'
    }
        render(){
            const campsiteId = this.props.navigation.getParam('campsiteId');//???
            const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
            const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
    return (
        <ScrollView>
       <RenderCampsite campsite={campsite}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                    

    <RenderComments comments={comments} /></ScrollView>
    );
}
}

export default connect(mapStateToProps)( CampsiteInfo);