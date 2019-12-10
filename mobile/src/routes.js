import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import SignIn from '~/pages/SignIn';
import Checkin from '~/pages/Checkin';
import HelpOrder from '~/pages/HelpOrder/List';
import Question from '~/pages/HelpOrder/Question';
import Answer from '~/pages/HelpOrder/Answer';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: SignIn,
        App: createBottomTabNavigator(
          {
            Checkin,
            HelpOrder: {
              screen: createStackNavigator(
                {
                  HelpOrder,
                  Question,
                  Answer,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir Ajuda',
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999999',
              style: {
                backgroundColor: '#fff',
                // marginBottom: 8,
                paddingBottom: 8,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
