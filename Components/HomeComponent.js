import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../Shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state =>{
    return{
        campsites: state.campsites,
        partners: state.partners,
        promotions: state.promotions
    }
}

function RenderItem(props) {
    const {item}= props;
    if(props.isLoading){
        return <Loading />
    }
    if(props.errMess){
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                <Text
                    style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}


class Home extends Component {

   constructor(props){//for animation
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0)//means 0%: start
        }
   }
animate(){
    Animated.timing(
        this.state.scaleValue,
        {
            toValue: 1, //means 100%: end
            duration: 1500// 1.5 sec
        }
    ).start();
}
componentDidMount(){
    this.animate()


}
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <Animated.ScrollView style={{ transform:[{scale: this.state.scaleValue}]}}>
                  <RenderItem
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess} 
                />                
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess} 
                /></Animated.ScrollView>
               
                 );
    }
}

export default connect(mapStateToProps)(Home);