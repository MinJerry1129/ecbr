/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import {getUser} from '../store/actions/user';
import {DrawerContent} from './Drawer';
import {
  CustomerStack,
  PermissionsStack,
  HomeStack,
  // LocationStack,
  LoginStack,
  RestaurantStack,
  ShoppingStack,
  SplashStack,
  SupermarketStack,
  SupportStack,
  NewUserStack,
  SearchStack,
  ConnectivityStack,
  FavoriteStack,
  CompaniesCouponStack,
  TermsStack,
  TermsDescriptionStack,
  AccessoriesStack,
} from './stack';
import {createLog} from '../services/service/Log';
import api from '../services/api';

const Drawer = createDrawerNavigator();

const Routes = props => {
  let address = props.address;
  let onUserAuth = props.onUserAuth;
  let userAuth = props.userAuth;
  let guest = props.guest;

  const getHistoryNavigationAndSave = async history => {
    try {
      if (userAuth && history) {
        await api.post('/acess-flow/create', {
          customer: userAuth._id,
          person: userAuth.person._id,
          version: userAuth.appVersion,
          device: userAuth.device,
          history: JSON.stringify(history),
        });
      }
    } catch (err) {
      await createLog({
        typeSystem: 'MOBILE',
        typeLog: 'ERROR',
        description: 'Erro ao salvar o histórico de navegação',
        category: 'Nav Customer',
        originError: 'navigations-index',
      });
    }
  };

  useEffect(() => {
    onUserAuth();
  }, []);

  return (
    <NavigationContainer
      onStateChange={({history}) => getHistoryNavigationAndSave(history)}>
      <Drawer.Navigator
        drawerContent={props => (
          <DrawerContent
            {...props}
            address={address}
            onUserAuth={onUserAuth}
            userAuth={userAuth}
            guest={guest}
          />
        )}>
        {!props.userAuth || props.userAuth === null || !props.userAuth?._id ? (
          <>
            <Drawer.Screen
              name="Splash"
              component={SplashStack}
              optins={{
                gestureEnabled: false,
                unmountOnBlur: true,
                drawerLabel: () => null,
              }}
            />
            <Drawer.Screen
              name="Permissions"
              component={PermissionsStack}
              options={{
                gestureEnabled: false,
                unmountOnBlur: true,
                drawerLabel: () => null,
              }}
            />
            <Drawer.Screen
              name="Login"
              component={LoginStack}
              options={{
                gestureEnabled: false,
                unmountOnBlur: true,
                drawerLabel: () => null,
              }}
            />
            <Drawer.Screen
              name="NewUser"
              component={NewUserStack}
              options={{
                gestureEnabled: false,
                unmountOnBlur: true,
                drawerLabel: () => null,
              }}
            />
            {/* <Drawer.Screen
              name="Location"
              component={LocationStack}
              options={{
                gestureEnabled: false,
                unmountOnBlur: true,
              }}
            /> */}
            <Drawer.Screen
              name="Connectivity"
              component={ConnectivityStack}
              optins={{
                gestureEnabled: false,
                unmountOnBlur: true,
                drawerLabel: () => null,
              }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="Terms"
              component={TermsStack}
              options={{
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="TermsDescriptionStack"
              component={TermsDescriptionStack}
              options={{
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="Home"
              component={HomeStack}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="Search"
              component={SearchStack}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="Restaurant"
              component={RestaurantStack}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="Accessories"
              component={AccessoriesStack}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="Favorites"
              component={FavoriteStack}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="CompaniesCoupon"
              component={CompaniesCouponStack}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="Shopping"
              component={ShoppingStack}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="Supermarket"
              component={SupermarketStack}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen name="Support" component={SupportStack} />
            <Drawer.Screen
              name="Customer"
              component={CustomerStack}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="Connectivity"
              component={ConnectivityStack}
              optins={{
                gestureEnabled: false,
                unmountOnBlur: true,
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const formatAddress = address => {
  if (address !== null && address.length > 5) {
    try {
      return address.substr(0, 20).split(' - ', 1)[0];
    } catch (err) {
      return address.substr(0, 20);
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onUserAuth: () => dispatch(getUser()),
  };
};

const mapStateToProps = ({user: user}) => {
  return {
    address: formatAddress(user?.addres ?? ''),
    userAuth: user?.user ?? null,
    guest: user?.guest ?? null,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
