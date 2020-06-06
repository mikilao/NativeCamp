import { ScrollView, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../Shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        partners: state.partners
    }
}

function Mission() {

    return (
        <Card title='Our Mission'
            wrapperStyle={{ margin: 20 }}>
            <Text >
                We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
                </Text>
        </Card>
    )
}


class About extends Component {
    /*constructor(props){
        super(props);
        this.state={
            partner: PARTNERS
        }
    }*/


    static navigationOptions = {// sets the titles during navigation
        title: 'About'
    }

    render() {


        const renderPartner = ({ item }) => {//will iterate through campsites from the flatlist
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                />
            );
        };
        if (this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card title="Community Partners">
                        <Loading />
                    </Card>

                </ScrollView>
            )
        }
        if (this.props.partners.errMess) {
            return (

                <ScrollView>
                    <Mission />
                    <Card title="Community Partners">
                        <Text>{this.props.partners.errMess}</Text>
                    </Card>

                </ScrollView>
            )
        }
        return (
            <ScrollView>
                <Mission />
                <Card title="Community Partners">
                    <FlatList data={this.props.partners.partners}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderPartner} />
                </Card>

            </ScrollView>
        )
    }
}
export default connect(mapStateToProps)(About);