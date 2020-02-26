import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from './screens/LoginScreen';
import RecepiListComponent from './RecepiListComponent';
import MapComponent from './MapComponent';

const detailNavigation = createBottomTabNavigator(
  {
    'RecipeList': { 'screen': RecepiListComponent,
      navigationOptions: { 
        tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/list.png')}></Image>
      ),
      title: "List" }
    },
    'Map': { 'screen': MapComponent,
    navigationOptions: { 
      tabBarIcon: ({ tintColor }) => (
      <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/map.png')}></Image>
    ),
    title: "Map" }
  },
    'Profile': { 'screen': RecepiListComponent 
    ,
    navigationOptions: { 
      tabBarIcon: ({ tintColor }) => (
      <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/account.png')}></Image>
    ),
    title: "Profile" }
  }
    ,
  },
  {
    tabBarPosition: 'bottom'
  }
);
const Router = createSwitchNavigator(
  {
    LoginScreen,
    detailNavigation
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);
export default createAppContainer(Router);
