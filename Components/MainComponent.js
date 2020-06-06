import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation'
import Home from './HomeComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Contact from './ContactComponent';
import SafeAreaView from 'react-native-safe-area-view';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../Redux/ActionCreator'

const mapDispatchToProps = {//redux
    fetchCampsites,
    fetchComments,
    fetchPartners,
    fetchPromotions
}

const DirectoryNavigator = createStackNavigator(
    {//chose which components are available 
        Directory: {
            screen: Directory, // to set nav settingfor just directory
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={StyleSheet.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {//Header
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);
const ContactNavigator = createStackNavigator(
    {
        Home: { screen: Home },
        /* Directory: {screen: Directory},
         About: {screen: About},
         CampsiteInfo:{screen: CampsiteInfo}*/
        Contact: { screen: Contact }
    },
    {//Header

        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={StyleSheet.stackIcon}
                onPress={() => navigation.toggleDrawer()} />
        })
    }
);
const ReservationNavigator = createStackNavigator(
    {
        Home: { screen: Home },
        /* Directory: {screen: Directory},
         About: {screen: About},
         CampsiteInfo:{screen: CampsiteInfo}*/
        Reservation: { screen: Reservation }
    },
    {//Header

        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={StyleSheet.stackIcon}
                onPress={() => navigation.toggleDrawer()} />
        })
    }
);
const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {//Header

        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={StyleSheet.stackIcon}
                onPress={() => navigation.toggleDrawer()} />
        })
    }
);
const HomeNavigator = createStackNavigator(
    {//chose which components are available 
        Home: { screen: Home },

    },
    {//Header
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={StyleSheet.stackIcon}
                onPress={() => navigation.toggleDrawer()} />

        })
    }
)

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView // recommended settings
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}> NuCamp</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);
const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {

                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },//changes the screen from a collapsable menu 
        Directory: {
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: "Contact Us",
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Reservation: {
            screen: ReservationNavigator,
            navigationOptions: {
                drawerLabel: "Reserve Campsite",
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='tree'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
    },
    {
        drawerBackgroundColor: '#CEC8FF',
        contentComponent: CustomDrawerContentComponent //render the new drawer content
    }
);


class Main extends Component {

    // onCampsiteSelect(campsiteId) {// how to handle when a campsite is clicked
    //  this.setState({selectedCampsite: campsiteId})//updates the states
    //  }
    componentDidMount() {//call the action creators
        this.props.fetchPromotions(),
            this.props.fetchCampsites(),
            this.props.fetchPartners(),
            this.props.fetchComments()

    }
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>

                <MainNavigator />
            </View>
        )
    }
}
//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});
export default connect(null, mapDispatchToProps)(Main)