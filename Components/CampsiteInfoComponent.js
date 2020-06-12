import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder} from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../Shared/baseUrl';
import { Rating } from 'react-native-elements';
import { postFavorite, postComment } from '../Redux/ActionCreator';



const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    }
}
const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text))
    
};

function RenderCampsite( props ) {
    const { campsite } = props;
    const recognizeDrag = ({dx}) => (dx <-200) ? true : false; //pt1 of gestures determine direction with neg # = true or false
    
    const panRespond = PanResponder.create({//pt 2 of gestures
        onStartShouldSetPanResponder:()=> true, //activate the pan responder to respond to gestures
        onPanResponderEnd: (e, gestureState)=>{
            console.log('pan responder end', gestureState); 
             if(recognizeDrag(gestureState)){
                 Alert.alert(
                     'Add fav',
                     'Are you sure you wish to add ' + campsite.name),
                     [
                         {
                         text: 'Cancel',
                         style: 'cancel',
                         onPress: ()=> console.log("Cancel?")
                     },
                     {
                         text: 'OK',
                         onPress: () => props.favorite ? console.log('Alreadt set as favorite') :props.markFavorite()
                     } 
                     ], {cancelable:false}
           
        }      
return true;
        }
    })
    if (campsite) {
        return (
            <Animatable.View 
            animation='fadeInDown' 
            duration={2000} 
            delay={1000}
            {...panRespond.panHandlers}//last step to connect the gestures
             >
            <Card
                featuredTitle={campsite.name}
                image={{ uri: baseUrl + campsite.image }}>
                <Text style={{ margin: 10 }}>
                    {campsite.description}
                </Text>
                <View style={styles.cardRow}>
                    <Icon
                        name={props.favorite ? "heart" : 'heart-o'} // ternary operator
                        type='font-awesome'
                        color='#f50'
                        raised
                        reverse
                        onPress={() => props.favorite ? console.log("favorited already") : props.markFavorite()}
                    />
                    <Icon
                        name={'pencil'} 
                        type='font-awesome'
                        color='#5637DD'
                        raised
                        reverse
                        style={styles.cardItem}
                        onPress={() => props.onShowModal()}
                    />
                </View>
            </Card>
            </Animatable.View>
        );
    }
    return <View />;// returns an empty view if campsites returns false
}
function RenderComments({ comments }) {
    const renderCommentItem = ({ item }) => {
        return (
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }} > {item.text}</Text>
                <Rating
                showRating= {5}
                startingValue= {5}
                
                 style={{ paddingVertical:'5%', alignItems:"flex-start" }}
                 imageSize ={30}
                 /> 
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };
    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000} >
        <Card
            title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()} />
        </Card>
        </Animatable.View>
    );
}
class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating:5,
            author: '',
            text: ''

        }
    }
    
    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }
    handleComment(campsiteId){
        this.props.postComment(campsiteId, this.state.rating, this.state.author, this.state.text)
        this.toggleModal()
       // console.log(this.state.JSON.stringify())

    }
    resetForm() {
        this.setState({
            rating:5,
            author: '',
            text: '',
            showModal: false
        });
    } 

  

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }
    static navigationOptions = {// sets the titles during navigation
        title: 'Campsite Information'
    }
    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');//???
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                />


                <RenderComments comments={comments} />
                <Modal
                    animationType={'fade'}
                    transparent={false} //opaque
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}// connected to the back button
                >
                    <View style={styles.modal}>
                        <Rating                          
                         startingValue= {this.state.rating}
                        imageSize={40}
                         text
                         style={{paddingVertical: 10}}
                         onFinishRating={(rating)=>this.setState({rating: rating})} 
                         />
                       <Input 
                        
                       placeholder="Author"
                       leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                       leftIconContainerStyle={{paddingRight:10}}
                       onChangeText={(rating)=>this.setState({rating: rating})}
                       value 
                       />

                       <Input  
                       placeholder="Comment"
                       leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                       leftIconContainerStyle={{paddingRight:10}}
                       onChangeText={(text)=>this.setState({text:text})}
                       value 
                       />
                      
                        
                        <View style={{margin:10}}>
                             <Button 
                                title='submit'
                                color='#5637DD'
                                onPress={()=> {
                                    this.handleComment(campsiteId);
                                    this.resetForm();
                                }
                                } 
                             />
                        <View style={{margin:10}}>
                        <Button
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color='#808080'
                            title='Cancel'
                        />
                        </View>
                        </View>
                    </View>
                </Modal>
                </ScrollView>
        );
    }
}
const styles =StyleSheet.create({
    cardRow:{
        alignItems:'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: "row",
        margin: 20
    },
    cardItem:{
        flex:1,
        margin: 10
        },
    modal:{
        justifyContent: 'center',
       margin: 20
        }
})

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);