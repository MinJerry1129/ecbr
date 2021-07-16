/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';

import { connect } from 'react-redux';
import LootieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import { Colors } from '../../../styles';

import { getAddress } from '../../../store/actions/user';
import { isAuthenticated } from '../../../services/userAuth';
import { getCurrentPosition } from '../../../store/actions/location';
import LocationCurrent from '../../../services/location/locationCurrent';
import { googleSearchAddres } from '../../../services/maps/geocoderService';
import { seacrhDeliveryAddress } from '../../../services/service/delivery/address';

import Address from './components/Address';
import SearchAddress from './components/searchAddress';
import ListAddressView from './components/listAddress';
import ConfirmAddress from './components/confirmAddress';
import FetchingAddress from './components/FetchingAddress';
import NotPermissionGps from './components/NotPermissionGps';
import ModalSearchAddress from './components/modalSearchAddress';
/** Load */
import loaderLootie from '../../../assets/animations/loader.json';

const CustomerAddress = ({
  route,
  navigation,
  coords,
  onLocation,
  onAddress,
}) => {
  const [item, setItem] = useState(null);
  const [addAddres, setAddAddres] = useState(false);
  const [modalLoad, setModalLoad] = useState(false);
  const [listAddress, setListAddress] = useState([]);
  const [newRegister, setNewRegister] = useState(false);
  const [searchAddres, setSearchAddres] = useState(false);
  const [redirectPayment, setRedirectPayment] = useState(false);
  const [userLocalAddress, setUserLocalAddress] = useState(null);
  const [notPermissionGps, setNotPermissionGps] = useState(false);
  const [modalSearchAddress, setModalSearchAddress] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setItem(null);
      onLocation();
      listAdd();
      payRedirectLoad();
      setAddAddres(false);
      activeHeader();
      setTimeout(() => {
        getCoord();
      }, 1000);
    }, []),
  );

  const getCoord = async () => {
    let coordinates;

    if (!coords) {
      const result = await LocationCurrent().getLocation();
      if (result) {
        coordinates = result;
      } else {
        setNotPermissionGps(true);
        return;
      }
    } else {
      coordinates = coords;
    }

    let response = await googleSearchAddres(
      null,
      coordinates.latitude,
      coordinates.longitude,
    );

    setUserLocalAddress(response[0]);
  };

  const activeHeader = () => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name="navigate-before"
          size={40}
          color={Colors.PRIMARY}
          onPress={() => navigation.navigate('Home', { screen: 'Home' })}
        />
      ),
    });
  };

  const payRedirectLoad = () => {
    let redirect = route.params?.redirectPayment ?? false;
    let newRegisterParam = route.params?.newRegister ?? false;

    if (redirect) {
      setRedirectPayment(redirect);
    }

    if (newRegisterParam) {
      setNewRegister(newRegisterParam);
    }
  };

  const listAdd = async () => {
    setSearchAddres(true);
    const { user: user } = await isAuthenticated();
    const resultList = await seacrhDeliveryAddress({ customer: user._id });
    if (resultList !== null) {
      setListAddress(resultList);
    } else {
      setListAddress([]);
    }

    onAddress();

    setSearchAddres(false);
  };

  const screenDetailPayment = () => {
    try {
      navigation.navigate('Shopping', {
        screen: 'DetailPayment',
      });
    } catch (err) { }
  };

  const closeConfirm = () => {
    if (redirectPayment) {
      screenDetailPayment();
      return;
    }

    setModalLoad(false);
    setSearchAddres(false);
    listAdd();
  };

  const goHome = () => {
    try {
      navigation.navigate('Home', { screen: 'Home' });
    } catch (err) { }
  };

  const editItem = edit => {
    setItem(edit);
    if (edit && edit.location && edit.location.coordinates) {
      navigation.navigate('Customer', {
        screen: 'CustomerAddressMap',
        params: {
          address: null,
          coordinates: {
            latitude: edit.location.coordinates[1],
            longitude: edit.location.coordinates[0],
            edit: edit,
          },
        },
      });
    }
  };

  const closeSearch = () => {
    setAddAddres(false);
  };

  const openModalNumber = async () => {
    try {
      if (notPermissionGps) {
        await Linking.openSettings();
        goHome();
        return;
      }

      if (!userLocalAddress) {
        getCoord();

        Alert.alert(
          'Oops',
          'Não encontramos sua localização. Verifique se o gps esta habilitado!',
        );

        return;
      }
      setModalSearchAddress(true);
    } catch (err) {
      setModalSearchAddress(false);
    }
  };

  const goMap = async (address = null) => {
    try {
      if (address) {
        setModalSearchAddress(false);
        navigation.navigate('Customer', {
          screen: 'CustomerAddressMap',
          params: {
            address: {
              ...address,
              ...{ number: address?.number || null },
            },
            coordinates: null,
          },
        });
      }
    } catch (err) { }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <StatusBar barStyle="dark-content" />
      {addAddres === false ? (
        <View style={styles.container}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalLoad}
            onRequestClose={() => setModalLoad(false)}>
            <ConfirmAddress
              navigation={navigation}
              close={closeConfirm}
              item={searchAddres ? null : item}
            />
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalSearchAddress}
            onRequestClose={() => setModalSearchAddress(false)}>
            <ModalSearchAddress
              address={userLocalAddress}
              modalVisible={setModalSearchAddress}
              openMap={goMap}
            />
          </Modal>
          <View style={{ marginHorizontal: 15 }}>
            <View style={styles.header}>
              <Icon
                name="navigate-before"
                size={40}
                color={Colors.PRIMARY}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.txtHeader}>Novo endereço</Text>
            </View>

            {newRegister && (
              <View style={styles.msgContainer}>
                <Text style={styles.txtMsg}>
                  Para Continuar sua compra cadastre um endereço
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.searchContainer}
              onPress={() => setAddAddres(true)}>
              <Icon name="search" size={35} style={styles.iconImg} />
              <Text style={styles.placeHolderAddress}>Digite um endereço</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.containerGps}>
              <View style={styles.containerGpsIcon}>
                <Icon name="gps-fixed" size={20} color={Colors.PRIMARY} />
              </View>
              <TouchableOpacity
                style={styles.contentGps}
                onPress={() => openModalNumber()}>
                <View style={styles.containerTextLocationCurrent}>
                  <Text style={styles.atualLocationText}>
                    {notPermissionGps
                      ? 'Conceda a permissão de uso do GPS'
                      : 'Usar localização atual'}
                  </Text>
                </View>
                <FetchingAddress
                  userLocalAddress={userLocalAddress}
                  notPermissionGps={notPermissionGps}
                />
                <Address
                  userLocalAddress={userLocalAddress}
                  notPermissionGps={notPermissionGps}
                />
                <NotPermissionGps notPermissionGps={notPermissionGps} />
              </TouchableOpacity>
            </View>

            {searchAddres === false ? (
              <ListAddressView
                listAddress={listAddress}
                reload={listAdd}
                goRedirect={goHome}
                edit={editItem}
              />
            ) : (
                <View style={styles.lotieContainer}>
                  <LootieView
                    source={loaderLootie}
                    style={{ height: 100 }}
                    resizeMode="contain"
                    loop
                    autoPlay
                  />
                </View>
              )}
          </View>
        </View>
      ) : null}
      {addAddres === true ? (
        <SearchAddress
          navigation={navigation}
          closeSearch={closeSearch}
          addAddres={setAddAddres}
        />
      ) : null}
    </SafeAreaView>
  );
};

const mapStateToProps = ({ location }) => {
  return {
    coords: location.coords,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLocation: () => dispatch(getCurrentPosition()),
    onAddress: () => dispatch(getAddress()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerAddress);
