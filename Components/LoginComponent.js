import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, AsyncStorage } from 'react-native';
import { Input, CheckBox, Button, Icon, Gallery } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {ImageManipulator} from 'expo-image-manipulator';
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';
import { baseUrl } from '../Shared/baseUrl';



class LoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon:({tintColor})=>{ //1st step of bottom tab nav
            <Icon
            name='sign-in'
            type='font=awesome'
            iconStyle={{color: tintColor}}
            />

        }
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
                        icon={
                            <Icon
                            name='sign-in'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{marginRight: 10}}
                            />
                        }
                        buttonStyle={{backgroundColor:'#5637DD'}} //change the color of the button
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}//routing to the register screen
                        title='Register'
                        type='clear'// no bkgd color
                        icon={
                            <Icon
                            name='user-plus'
                            type='font-awesome'
                            color='blue'
                            iconStyle={{marginRight: 10}}
                            />
                        }
                        buttonStyle={{color: 'blue'}}

                    />
                </View>
            </View>
        );
    }
}
class RegisterTab extends Component{// bottom tab nav

    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }
    static navigationOptions = {
        title: 'Register',
        tabBarIcon:({tintColor})=>{ //1st step of bottom tab nav
            <Icon
            name='user-plus'
            type='font=awesome'
            iconStyle={{color: tintColor}}
            />

        }
    }
    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA); //asking for permissions for camera req.
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') { // status is being checked for granted permission
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true, //editor screen
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled ) {
                console.log(capturedImage );
               // this.setState({imageUrl: capturedImage.uri});
               this.processImage(capturedImage.uri)
            }
        }
    }
    processImage = async(imgUrl) => {
        const processedImage = await ImageManipulator.manipulateAsync(
            imgUrl,
            [{resize:{ width: 400 }}],
            { format: 'PNG' }
          );
          console.log(processedImage);
          this.setState( {imageUrl: processedImage.uri })
         
          const { imageUri}= Camera.takePictureAsync()
        
    }
    getImageFromGallery = async() => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
          const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(cameraRollPermission.status ==='granted'){
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
            apsect: [1 ,1]
            })
            if(!capturedImage.cancelled){
                console.log(capturedImage);
                this.processImage(capturedImage.uri)
            }
        }
    }
    handleRegister() {
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
    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View stye={styles.imageContainer}>
                        <Image
                         source={{ uri:this.state.imageUrl }}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                        <Button 
                        title='Gallery'
                        onPress={this.getImageFromGallery}/>
                    </View>
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
                 <Input
                    placeholder='First Name'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={firstname => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                 <Input
                    placeholder='Last Name'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={lastname=> this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                 <Input
                    placeholder='Email'
                    leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
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
                        onPress={() => this.handleRegister()}
                        title='Register'
                        icon={
                            <Icon
                            name='user-plus'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{marginRight: 10}}
                            />
                        }
                        buttonStyle={{backgroundColor:'#5637DD'}} //change the color of the button
                    />
                </View>
           
                
            </View>
            </ScrollView>
        )
    }
}
const Login= createBottomTabNavigator(
    {
        Login: LoginTab,
        Register: RegisterTab
    },
    {
        tabBarOptions:{
            activeBackgroundColor: '#5637DD',
            inactiveBackgroundColor: '#CEC8FF',
            activeTintColor: '#fff',
            inactiveTintColor: '#808080',//gray
            labelStyle: {fontSize: 16}
        }
    }
)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight:40,
        marginLeft: 40
    },
    imageContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly',
        margin: 10
    },
    image:{
        width: 60,
        height: 60
    }
});

export default Login;