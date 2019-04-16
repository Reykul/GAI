import { createSwitchNavigator } from '@react-navigation/core';
import { createBrowserApp } from '@react-navigation/web';
import HomeScreen from '../containers/screens/HomeScreen';
import * as routes from '../constants/routes';

const navigator = createSwitchNavigator(
  {
    [routes.HOME_SCREEN]: {
      screen: HomeScreen,
      path: '',
    },
  },
  {
    initialRouteName: routes.HOME_SCREEN,
    defaultNavigationOptions: {
      headerTitle: 'Cars',
    },
  },
);

const RootNavigator = createBrowserApp(navigator);

export default RootNavigator;
