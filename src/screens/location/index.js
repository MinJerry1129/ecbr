/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {runtimePermission} from '../../utils/locationPermission';
import {searchAddress} from '../../services/maps/geocoderService';
import styles from './styles';

import {connect} from 'react-redux';
import {setCoordinates} from '../../store/actions/location';
import {getUser} from '../../store/actions/user';
import Load from '../../components/shared/load';
import {StorageSet} from '../../services/deviceStorage';
import {Colors} from '../../styles';

const Location = ({navigation, onLocation, onUserAuth}) => {
  const [isLocation, setIsLocation] = useState(true);
  const [address, setAddress] = useState('');
  const [listAddress, setListAddress] = useState([]);
  const [modalLoad, setModalLoad] = useState(false);

  const imgBackground = require('../../assets/images/locationmap.jpg');
  const iconMarker = require('../../assets/images/marker.png');
  const iconRoute = require('../../assets/images/route.png');

  useEffect(() => {
    runtime();

    return () => {
      setModalLoad(false);
    };
  }, []);

  useEffect(() => {
    const search = async () => {
      const resultAddress = await searchAddress(address);
      setListAddress(resultAddress);
    };

    if (address.length > 7) {
      search();
    }
  }, [address]);

  const runtime = async () => {
    setModalLoad(true);
    const isPermition = await runtimePermission(false);
    if (isPermition) {
      Geolocation.getCurrentPosition(geoSuccess, geoFailure, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      });
    } else {
      setModalLoad(false);
      setIsLocation(false);
      Alert.alert('Não foi possível acessar localização!!');
    }
  };

  const geoSuccess = async position => {
    await StorageSet('LOCATION', position.coords);
    setModalLoad(false);
    goHome();
  };

  const geoFailure = error => {
    console.log('Falhou a pegar localização', error);
    setModalLoad(false);
    setIsLocation(false);
  };

  const goHome = () => {
    //navigation.navigate('Home', {screen: 'Home'});
    onUserAuth();
  };

  const addressCoordinate = async item => {
    const coordsResult = item.geometry.bounds.northeast;
    if (
      coordsResult !== undefined &&
      coordsResult !== null &&
      coordsResult !== ''
    ) {
      await StorageSet('LOCATION', coordsResult);
      onLocation(coordsResult);
    }
    navigation.navigate('Home', {screen: 'Home'});
  };

  const locationText = () => {
    return (
      <>
        <Text style={styles.txtInfo}>Escolha um endereço de entrega</Text>
        <View style={styles.addressContainer}>
          <Icon name="place" size={20} style={styles.markerLocation} />

          <TextInput
            style={styles.input}
            placeholder="Digite um endereço"
            placeholderTextColor={Colors.DARK}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.locationCurrent}
          onPress={() => runtime()}>
          <Image
            style={styles.markerLocation}
            resizeMode="contain"
            source={iconRoute}
          />
          <Text style={styles.txtCurrent}>Localização Atual</Text>
        </TouchableOpacity>

        <FlatList
          style={styles.flatList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={listAddress}
          keyExtractor={item => `${item.place_id}`}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardAddress}
              activeOpacity={0.5}
              onPress={() => addressCoordinate(item)}>
              <Text style={styles.txtAddress}>{item.formatted_address}</Text>
              <View style={styles.dividerLocation} />
            </TouchableOpacity>
          )}
        />
      </>
    );
  };

  const locationGps = () => {
    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalLoad}
          onRequestClose={() => setModalLoad(true)}>
          <Load title="Processando Informação" subTitle="Um momento..." />
        </Modal>
        <ImageBackground style={styles.background} source={imgBackground}>
          <View style={styles.header} />
          <View style={styles.footer}>
            <Image
              style={styles.iconMarker}
              resizeMode="contain"
              source={iconMarker}
            />
          </View>
        </ImageBackground>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {isLocation ? locationGps() : locationText()}
    </View>
  );
};

const mapStateToProps = ({location}) => {
  return {
    coords: location.coords,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLocation: coords => dispatch(setCoordinates(coords)),
    onUserAuth: () => dispatch(getUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Location);
