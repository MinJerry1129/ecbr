/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Typography} from '../../../styles';
import {distanceLatLonInKm} from '../../../services/maps/distanceCoordinate';
import ModalAddresMap from './components/modalAddresMap';
import {googleSearchAddres} from '../../../services/maps/geocoderService';
import {SafeAreaView} from 'react-native-safe-area-context';

const CustomerAddressMap = ({navigation, route}) => {
  const [address, setAddress] = useState(route?.params?.address);
  const [coordinates] = useState(route?.params?.coordinates);
  const [locationInit, setLocationInit] = useState();
  const [load, setLoad] = useState(false);
  const [location, setLocation] = useState(null);
  const maxRadius = 1000;
  const [modal, setModal] = useState(false);
  const markerIcon = require('../../../assets/images/markerBlue.png');

  // console.log('Hey CustomerAddresMap ... ');

  useEffect(() => {
    return () => {
      setModal(false);
      setLoad(false);
    };
  }, []);

  // Coordenadas de Endereço
  useEffect(() => {
    if (
      address &&
      address.geometry &&
      address.geometry.location &&
      !coordinates?.edit
    ) {
      if (
        locationInit === null ||
        address?.geometry?.location.lat !== locationInit?.latitude ||
        address?.geometry?.location.lng !== locationInit?.longitude
      ) {
        setLocationInit({
          latitude: address.geometry.location.lat,
          longitude: address.geometry.location.lng,
          latitudeDelta: 0.00738,
          longitudeDelta: 0.004543,
        });
      }

      if (
        location === null ||
        address?.geometry?.location?.lat !== location.latitude ||
        address.geometry.location.lat !== location.latitude
      ) {
        setLocation({
          latitude: address.geometry.location.lat,
          longitude: address.geometry.location.lng,
          latitudeDelta: 0.00738,
          longitudeDelta: 0.004543,
        });
      }
    }
  }, [address]);

  // Apenas informado a localização
  useEffect(() => {
    if (coordinates && coordinates.longitude) {
      setLocationInit({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.00738,
        longitudeDelta: 0.004543,
      });

      setLocation({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.00738,
        longitudeDelta: 0.004543,
      });

      if (coordinates && coordinates.edit) {
        confirmLocation(coordinates.latitude, coordinates.longitude);
      } else {
        getCoordToAddres(coordinates.latitude, coordinates.longitude);
      }
    }

    if (coordinates && coordinates.edit) {
      confirmLocation();
    }
  }, []);

  const goListAddress = () => {
    setModal(false);
    navigation.navigate('Customer', {
      screen: 'CustomerAddress',
      params: {},
    });
  };

  const getCoordToAddres = async (latitude, longitude) => {
    let response = await googleSearchAddres(null, latitude, longitude);
    if (response && response.length > 0) {
      // console.log('Alterando Edereço ...');

      if (address && address.number) {
        // console.log('address number', address);
        setAddress({
          ...address,
          ...{
            number: address?.number || '',
            geometry: {
              location: {
                lat: latitude,
                lng: longitude,
              },
            },
          },
        });
      } else {
        if (address) {
          setAddress({
            ...address,
            ...{
              geometry: {
                location: {
                  lat: latitude,
                  lng: longitude,
                },
              },
            },
          });
        } else {
          setAddress({
            ...response[0],
            ...{
              geometry: {
                location: {
                  lat: latitude,
                  lng: longitude,
                },
              },
            },
          });
        }
      }
    }
  };

  const changeCoordinate = region => {
    if (modal === false) {
      const ditance = maximumRadius(region);
      if (ditance * 1000 > maxRadius) {
        setLocation(locationInit);
      } else {
        // console.log('Modificando coordenadas', region);
        setLocation(region);
      }
    }
  };

  const maximumRadius = region => {
    let distKm = distanceLatLonInKm(locationInit, region);
    return distKm;
  };

  const confirmLocation = async (latitude = null, longitude = null) => {
    try {
      setLoad(true);
      let lat = latitude || location.latitude;
      let lng = longitude || location.longitude;
      await getCoordToAddres(lat, lng);

      setLoad(false);
      setModal(true);
    } catch (err) {
      setLoad(false);
    }
  };

  const goBack = () => {
    goListAddress();
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      {location !== null ? (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => goListAddress()}>
            <ModalAddresMap
              modal={setModal}
              address={address}
              edit={coordinates?.edit}
              returnList={goListAddress}
              back={goBack}
              navigation={navigation}
              coordinate={locationInit}
            />
          </Modal>
          <View style={styles.header}>
            <Icon
              name="navigate-before"
              size={40}
              color={Colors.PRIMARY}
              onPress={() => goListAddress()}
            />
            <Text style={styles.txtHeader}>
              {modal === true
                ? 'Novo endereço'
                : address?.addressRoute + `${address?.streetNumber || ''}`}
            </Text>
            {!modal || modal === false ? (
              <Icon
                name="my-location"
                size={30}
                color={Colors.PRIMARY}
                style={{marginRight: 10}}
              />
            ) : null}
          </View>
          <View
            style={modal === true ? styles.containerToModal : styles.container}>
            {locationInit && locationInit.latitude ? (
              <MapView
                provider={PROVIDER_GOOGLE}
                scrollEnabled={!modal}
                style={[styles.map, {marginTop: 0}]}
                initialRegion={locationInit}
                region={location}
                onRegionChangeComplete={region => {
                  changeCoordinate(region);
                }}>
                {!modal || modal === false ? (
                  <Circle
                    center={locationInit}
                    radius={maxRadius}
                    strokeColor={Colors.WHITE}
                    fillColor={'rgba(74, 95, 237, 0.1)'}
                  />
                ) : null}
              </MapView>
            ) : null}

            {locationInit && locationInit.latitude ? (
              <View pointerEvents="none" style={styles.markerAbsolute}>
                {!modal || modal === false ? (
                  <View style={styles.customMarker}>
                    <Text style={styles.mapInfo1}>Você está aqui?</Text>
                    <Text style={styles.mapInfo2}>Ajuste a localização</Text>
                  </View>
                ) : null}

                <Image
                  pointerEvents="none"
                  source={markerIcon}
                  resizeMode="contain"
                  style={[
                    styles.markerIcon,
                    modal === true ? styles.markerIconSmall : null,
                  ]}
                />
              </View>
            ) : null}

            {locationInit &&
            locationInit.latitude &&
            (!modal || modal === false) ? (
              <SafeAreaView style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btnConfirm}
                  onPress={() => confirmLocation()}>
                  {!load || load === false ? (
                    <Text style={styles.btnTitle}>Confirmar</Text>
                  ) : (
                    <ActivityIndicator
                      size="small"
                      color={Colors.WHITE}
                      style={{padding: 10}}
                    />
                  )}
                </TouchableOpacity>
              </SafeAreaView>
            ) : null}
          </View>
        </>
      ) : null}
    </View>
  );
};

export default React.memo(CustomerAddressMap);

const styles = StyleSheet.create({
  txtHeader: {
    flexGrow: 1,
    textAlign: 'center',
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginRight: 30,
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  containerToModal: {
    height: 80,
    width: Dimensions.get('window').width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnConfirm: {
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_15,
    paddingVertical: 20,
    textAlign: 'center',
  },
  markerIcon: {
    width: 45,
    height: 45,
    marginTop: -30,
  },
  markerIconSmall: {
    width: 25,
    height: 25,
    marginTop: 0,
  },
  markerAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  customMarker: {
    top: -40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 8,
    elevation: 5,
  },
  mapInfo1: {
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_15,
  },
  mapInfo2: {
    color: Colors.GREY_LIGHT,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_13,
  },
});
