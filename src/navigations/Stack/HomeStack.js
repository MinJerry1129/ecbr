import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderIcon} from '../../components';
import HeaderSearch from '../../components/shared/Header/headerSearch';

import Home from '../../screens/home';

import {Colors} from '../../styles';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: () => (
              <HeaderIcon navigation={navigation} color={Colors.PRIMARY} />
            ),
            headerTitle: () => {},
            headerRight: () => <HeaderSearch navigation={navigation} />,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
