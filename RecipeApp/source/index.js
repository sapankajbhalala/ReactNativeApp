import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from './screens/LoginScreen';
import RecepiListComponent from './RecepiListComponent';

const detailNavigation = createBottomTabNavigator(
  {
    'RecipeList': { 'screen': RecepiListComponent,
      navigationOptions: { title: "List" }
    },
    'Map': { 'screen': RecepiListComponent },
    'Profile': { 'screen': RecepiListComponent }
    ,
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
