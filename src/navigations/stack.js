import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors, Typography } from '../styles';
import { HeaderIcon, HeaderBack, HeaderBackOrder } from '../components';

import Splash from '../screens/splash';
import Connectivity from '../screens/connectivity';
// RestaurantStack
import Restaurant from '../screens/restaurant';
import RestaurantProduct from '../screens/restaurant/product';
import RestaurantDetails from '../screens/restaurant/details';
import RestaurantProductDetails from '../screens/restaurant/ProductDetails';
// AccessoriesStack
import Accessories from '../screens/accessories';
import AccessoriesProduct from '../screens/accessories/product';
import AccessoriesDetails from '../screens/accessories/details';
import AccessoriesProductDetails from '../screens/accessories/ProductDetails';
// Market
import Product from '../screens/supermarket/product';
import ProductDetails from '../screens/supermarket/ProductDetails';
import Supermarket from '../screens/supermarket';
import SupermarketDetails from '../screens/supermarket/details';
// Settings
import CustomerAddress from '../screens/customer/address';
import CustomerEdit from '../screens/customer/edit';
import Location from '../screens/location';
import Login from '../screens/login';
import NewUser from '../screens/customer/newUser';
// Shopping
import DetailPayment from '../screens/detailPayment';
import Order from '../screens/order';
import Payment from '../screens/payment';
import PaymentMethods from '../screens/paymentMethods';
import PaymentStatus from '../screens/paymentStatus';
import PaymentStatusItems from '../screens/paymentStatus/card/items';
import Schedule from '../screens/shopping/schedule';
import ChatPayment from '../screens/paymentStatus/ChatPayment';
import Coupon from '../screens/coupon';
import CouponRules from '../screens/coupon/couponRules';
import TipOtherValue from '../screens/tipOtherValue';
// Search
import Search from '../screens/search';
// Favorite
import Favorite from '../screens/favorites';

// Estabelecimentos Cupom
import CompaniesCoupon from '../screens/companiesCoupon';

// Termos
import Terms from '../screens/terms';
import TermsDescription from '../screens/termsDescription';

//Suporte
import Support from '../screens/support';

const Stack = createStackNavigator();

// Import Stacks
import HomeStack from './Stack/HomeStack';
import PermissionsStack from './Stack/PermissionStack';
import customerAddressMap from '../screens/customer/address/customerAddressMap';

const CustomerStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTintColor: Colors.WHITE,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_BOLD,
        },
      }}>
      <Stack.Screen
        name="CustomerAddress"
        component={CustomerAddress}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="CustomerAddressMap"
        component={customerAddressMap}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="CustomerEdit"
        component={CustomerEdit}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
};

const LocationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTintColor: Colors.WHITE,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_BOLD,
        },
      }}>
      <Stack.Screen
        name="Location"
        component={Location}
        options={{ title: 'Localização' }}
      />
    </Stack.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
    </Stack.Navigator>
  );
};

const TermsStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ title: 'Termos de Uso' }}
      />
    </Stack.Navigator>
  );
};

const TermsDescriptionStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="TermsDescription"
        component={TermsDescription}
        options={{ title: 'Termos de Uso' }}
      />
    </Stack.Navigator>
  );
};

const NewUserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTintColor: Colors.WHITE,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_BOLD,
        },
      }}>
      <Stack.Screen
        name="NewUser"
        component={NewUser}
        options={{ title: 'Registro de usuário' }}
      />
    </Stack.Navigator>
  );
};

const RestaurantStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTintColor: Colors.WHITE,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_MEDIUM,
        },
      }}>
      <Stack.Screen
        name="Restaurant"
        component={Restaurant}
        options={{
          unmountOnBlur: true,
          title: 'Restaurantes',
          headerLeft: () => <HeaderBack navigation={navigation} />,
          headerTintColor: Colors.WHITE,
          headerTitleStyle: {
            fontFamily: Typography.FONT_FAMILY_MEDIUM,
            fontSize: Typography.FONT_SIZE_20,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="RestaurantProduct"
        component={RestaurantProduct}
        options={{ unmountOnBlur: true, title: 'Produtos', headerShown: false }}
      />
      <Stack.Screen
        name="RestaurantDetails"
        component={RestaurantDetails}
        options={{
          unmountOnBlur: true,
          title: 'Detalhe do produto',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RestaurantProductDetails"
        component={RestaurantProductDetails}
        options={{
          unmountOnBlur: true,
          title: 'Detalhe do produto',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AccessoriesStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTintColor: Colors.WHITE,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_MEDIUM,
        },
      }}>
      <Stack.Screen
        name="Accessories"
        component={Accessories}
        options={{
          unmountOnBlur: true,
          title: 'Acessórios',
          headerLeft: () => <HeaderBack navigation={navigation} />,
          headerTintColor: Colors.WHITE,
          headerTitleStyle: {
            fontFamily: Typography.FONT_FAMILY_MEDIUM,
            fontSize: Typography.FONT_SIZE_20,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="AccessoriesProduct"
        component={AccessoriesProduct}
        options={{ unmountOnBlur: true, title: 'Acessórios', headerShown: false }}
      />
      <Stack.Screen
        name="AccessoriesDetails"
        component={AccessoriesDetails}
        options={{
          unmountOnBlur: true,
          title: 'Detalhe do acessório',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccessoriesProductDetails"
        component={AccessoriesProductDetails}
        options={{
          unmountOnBlur: true,
          title: 'Detalhe do acessório',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ShoppingStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTintColor: Colors.WHITE,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_BOLD,
        },
        options: {
          unmountOnBlur: true,
        },
      }}>
      <Stack.Screen
        name="Coupon"
        component={Coupon}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="CouponRules"
        component={CouponRules}
        options={{
          title: 'Cupom',
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="TipOtherValue"
        component={TipOtherValue}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="DetailPayment"
        component={DetailPayment}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="MyOrder"
        component={Order}
        options={{
          unmountOnBlur: true,
          title: 'Meus pedidos',
          headerLeft: () => <HeaderBack navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          unmountOnBlur: true,
          title: 'Pagamentos',
        }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="PaymentStatus"
        component={PaymentStatus}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="PaymentStatusItems"
        component={PaymentStatusItems}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="Schedule"
        headerMode="none"
        component={Schedule}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
};

const SplashStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  );
};

const ConnectivityStack = () => {
  return (
    <Stack.Navigator initialRouteName="Connectivity" headerMode="none">
      <Stack.Screen name="Connectivity" component={Connectivity} />
    </Stack.Navigator>
  );
};

const FavoriteStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Favorites" headerMode="none">
      <Stack.Screen
        name="Favorites"
        component={Favorite}
        options={{
          unmountOnBlur: true,
          title: 'Favoritos',
          headerLeft: () => <HeaderBack navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

const CompaniesCouponStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="CompaniesCoupon" headerMode="none">
      <Stack.Screen
        name="CompaniesCoupon"
        component={CompaniesCoupon}
        options={{
          unmountOnBlur: true,
          title: 'Estabelecimentos',
          headerLeft: () => <HeaderBack navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

const SupermarketStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTintColor: Colors.WHITE,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_BOLD,
        },
      }}>
      <Stack.Screen
        name="Product"
        component={Product}
        options={{ unmountOnBlur: true, title: 'Produtos', headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          title: 'Detalhes do produtos',
          headerLeft: () => <HeaderBack navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Supermarket"
        component={Supermarket}
        options={{
          unmountOnBlur: true,
          title: 'Mercado',
          headerLeft: () => <HeaderBack navigation={navigation} />,
          headerTintColor: Colors.WHITE,
          headerTitleStyle: {
            fontFamily: Typography.FONT_FAMILY_BOLD,
            fontSize: Typography.FONT_SIZE_21,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="SupermarketDetails"
        component={SupermarketDetails}
        options={{
          headerShown: false,
          title: 'Mercado',
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
};

const globalNavigationOptions = {
  headerStyle: {
    backgroundColor: '#1B7FD0',
  },
  headerLeftContainerStyle: {
    marginLeft: 10,
  },

  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
};

const SupportStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTintColor: Colors.WHITE,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_BOLD,
        },
      }}>
      <Stack.Screen
        name="ChatPayment"
        component={ChatPayment}
        options={{
          ...globalNavigationOptions,
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
};

const SearchStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTintColor: Colors.WHITE,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_BOLD,
        },
      }}>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Busca',
          unmountOnBlur: true,
          headerLeft: () => <HeaderBack navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export {
  CustomerStack,
  LocationStack,
  NewUserStack,
  LoginStack,
  PermissionsStack,
  HomeStack,
  RestaurantStack,
  ShoppingStack,
  SplashStack,
  ConnectivityStack,
  SupermarketStack,
  SupportStack,
  SearchStack,
  FavoriteStack,
  CompaniesCouponStack,
  TermsStack,
  TermsDescriptionStack,
  AccessoriesStack,
};
