import { ScrollView, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


export default class Contact extends Component {

    static navigationOptions = {// sets the titles during navigation
        title: 'Contact us'
    }
    sendMail(){
        MailComposer.composeAsync({
            receipients: ['fake@numcapsite.co'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        })
    }
    render() {
        return (
            <ScrollView>
                 <Animatable.View animation='fadeInDown' duration={2000} delay={1000} >
                <Card title='Contact Information'
                    wrapperStyle={{ margin: 20 }}>
                    <Text >
                        1 Nucamp Way </Text>
                    <Text style={marginBottom = 10}>    Seattle, WA 98001  U.S.A. </Text>

                    <Text> Phone: 1-206-555-1234 </Text>
                    <Text> Email: campsites@nucamp.com</Text>
                
                <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: '#5637DD', margin: 20}}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />}
                            onPress={() => this.sendMail()}
                        />
                </Card>
</Animatable.View>
            </ScrollView>
        )
    }
}