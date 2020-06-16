import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {
        title: 'Login'
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) { //remember me check box
            SecureStore.setItemAsync('userinfo', JSON.stringify( //saves the userinfo gets save to secure store
                {username: this.state.username, password: this.state.password}))//converts the user info into a string
                .catch(error => console.log('user info Not saved ', error));
        } else {
            SecureStore.deleteItemAsync('userinfo') //removes any data stored under 'userInfo'
                .catch(error => console.log('Could not delete user info', error));
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo') //checks if there is saved data 
            .then(userdata => { //if so it will return that data
                const userinfo = JSON.parse(userdata); //parse changes back to a JS object
                if (userinfo) {// updates the state withth stored date
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                
                <Input
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />

                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        color='#5637DD'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});

export default Login;