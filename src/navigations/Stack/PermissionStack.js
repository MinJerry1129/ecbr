import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Notification from '../../screens/permissions/notification';
import LocationPermission from '../../screens/permissions/location';

const Stack = createStackNavigator();

const PermissionsStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Notification">
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          headerStatusBarHeight: 0,
        }}
      />
      <Stack.Screen
        name="Location"
        component={LocationPermission}
        options={{
          title: 'SEJA BEM-VINDO',
          headerLeft: () => {},
          headerTitleStyle: {
            textAlign: 'center',
            fontSize: 15,
            fontFamily:
              Platform.OS === 'ios' ? 'Roboto-Regular' : 'Roboto-Medium',
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default PermissionsStack;
