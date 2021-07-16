/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Colors, Typography } from '../../../../styles';
import InputIcon from '../../../../components/shared/input/inputIcon';
import {
  googleSearchAddres,
  googlePlaceAutoComplete,
} from '../../../../services/maps/geocoderService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';
import LootieView from 'lottie-react-native';
import loaderLootie from '../../../../assets/animations/loader.json';
import LocationPermission from '../../../../services/permissions/locationPermission';
import ModalSearchAddress from './modalSearchAddress';
import LocationCurrent from '../../../../services/location/locationCurrent';

let timer = null;

const SearchAddress = ({ navigation, closeSearch, addAddres }) => {
  const [txtAddress, setTxtAddress] = useState('');
  const [loadIcon, setLoadIcon] = useState(false);
  const [searchAddres, setSearchAddres] = useState(false);
  const [listSearchAddress, setListSearchAddress] = useState([]);
  const [notResults, setNotResults] = useState(false);
  const [modalLoad, setModalLoad] = useState(false);
  const [addresCurrent, setAddressCurrent] = useState(null);
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name="navigate-before"
          size={40}
          color={Colors.GRAY_DARK}
          onPress={() => closeSearch()}
        />
      ),
    });

    checkUserCoords();
  }, []);

  useEffect(() => {
    setNotResults(false);
    if (txtAddress.length === 0) {
      setSearchAddres(false);
      return;
    }

    if (txtAddress.length <= 3) {
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      searchList();
    }, 700);
  }, [txtAddress]);

  const checkUserCoords = async () => {
    let coord = await LocationCurrent().getLocation();

    if (coord && coord.latitude && coord.longitude) {
      setUserCoords(coord);
    } else {
      setUserCoords(null);
    }
  };

  const cleanTxtAddress = () => {
    setTxtAddress('');
    addAddres(false);
  };

  const searchList = async () => {
    try {
      setSearchAddres(true);
      setLoadIcon(true);

      let resultAddress = await googlePlaceAutoComplete(txtAddress, userCoords);

      if (resultAddress && resultAddress.error && resultAddress.code === 2) {
        Alert.alert('Ooops', 'Falha ao buscar. Verifique sua conexão ...');
        setLoadIcon(false);
        return;
      }

      if (
        resultAddress !== undefined &&
        resultAddress !== null &&
        !resultAddress.error &&
        resultAddress.length > 0
      ) {
        setListSearchAddress(resultAddress);
      } else if (resultAddress && resultAddress.length === 0) {
        setNotResults(true);
        setListSearchAddress([]);
      }

      setLoadIcon(false);
    } catch (err) {
      setLoadIcon(false);
    }
  };

  const openModalNumber = async item => {
    try {
      setLoadIcon(true);
      let response = await googleSearchAddres(`place_id=${item.place_id}`);

      if (!response || response.length <= 0) {
        return Alert.alert('Não foi possível localizar coordenadas ...');
      }

      let itemResponse = response[0];
      setAddressCurrent({
        ...item,
        ...{
          address: itemResponse.address,
          geometry: itemResponse.geometry,
          formatted_address: itemResponse.formatted_address,
          streetNumber: itemResponse.streetNumber,
          city: itemResponse.city,
        },
      });
      setLoadIcon(false);

      if (
        itemResponse.streetNumber &&
        `${itemResponse.streetNumber}`.length > 0
      ) {
        goMap(itemResponse);
        return;
      }

      setModalLoad(true);
    } catch (err) {
      setLoadIcon(false);
      setModalLoad(false);
    }
  };

  const goMap = async (item = null) => {
    try {
      setModalLoad(false);
      setAddressCurrent(item);

      let resultAddress = [];
      setLoadIcon(true);

      if (item && item.place_id && `${item.number || ''}`.length > 0) {
        const txt =
          `${item.streetNumber || ''} ` +
          `${item.addressRoute} ${item.addressComplement}`;
        resultAddress = await googleSearchAddres(txt);
      } else {
        resultAddress = await googleSearchAddres(`place_id=${item.place_id}`);
      }

      if (
        resultAddress !== undefined &&
        resultAddress !== null &&
        !resultAddress.error &&
        resultAddress.length > 0
      ) {
        setListSearchAddress(resultAddress);
        setAddressCurrent({
          ...resultAddress[0],
          ...{ number: item?.number || null },
        });

        navigation.navigate('Customer', {
          screen: 'CustomerAddressMap',
          params: {
            address: {
              ...resultAddress[0],
              ...{ number: item?.number || null },
            },
            coordinates: null,
          },
        });
      } else if (resultAddress && resultAddress.length === 0) {
        setNotResults(true);
      }

      setLoadIcon(false);
    } catch (err) {
      setLoadIcon(false);
    }
  };

  const mapCoordinate = async () => {
    try {
      setLoadIcon(true);
      const isLocation = await LocationPermission().isPermission();
      if (isLocation === false) {
        let isPermission = await LocationPermission().setPermission();
        if (isPermission === false) {
          return Alert.alert(
            'Por Favor ative o GPS e permita que o EconomizeBr acesse sua localização',
          );
        }
      }

      let coord = await LocationCurrent().getLocation();
      setLoadIcon(true);

      if (!coord || !coord.latitude) {
        Alert.alert(
          'Não conseguimos identificar sua localização por favor ative o GPS',
        );
      }

      navigation.navigate('Customer', {
        screen: 'CustomerAddressMap',
        params: {
          address: null,
          coordinates: coord,
        },
      });
    } catch (err) {
      setLoadIcon(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={searchStyle.container}>
        <SafeAreaView style={searchStyle.container}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalLoad}
            onRequestClose={() => setModalLoad(false)}>
            <ModalSearchAddress
              address={addresCurrent}
              modalVisible={setModalLoad}
              openMap={goMap}
            />
          </Modal>
          <View style={styles.headerSearch}>
            <Icon
              name="navigate-before"
              size={40}
              color={Colors.PRIMARY}
              onPress={() => addAddres(false)}
            />
          </View>
          <View style={searchStyle.inputContainer}>
            <InputIcon
              value={txtAddress}
              load={loadIcon}
              setValue={setTxtAddress}
              iconImg="search"
              iconClean={cleanTxtAddress}
              params={{
                autoFocus: true,
              }}
            />
          </View>

          {loadIcon === true ? (
            <View style={searchStyle.laderContainer}>
              <LootieView
                source={loaderLootie}
                style={searchStyle.loaderChat}
                resizeMode="cover"
                loop
                autoPlay
              />
            </View>
          ) : null}

          {notResults === true ? (
            <View style={searchStyle.contentNoResults}>
              <Text style={searchStyle.txtMessage1}>
                Não encontramos esse endereço
              </Text>
              <Text style={searchStyle.txtMessage2}>
                Verifique o que você digitou e tente de novo ou busque pelo mapa
              </Text>
              <TouchableOpacity onPress={() => mapCoordinate()}>
                <Text style={searchStyle.txtMessage3}>Buscar pelo mapa</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {searchAddres && loadIcon === false && listSearchAddress ? (
            <>
              <FlatList
                data={listSearchAddress}
                keyExtractor={item => `${item.place_id || Math.random()}`}
                contentContainerStyle={styles.flatStyle}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.boxCard}>
                    <TouchableOpacity
                      style={styles.cardList}
                      onPress={() => openModalNumber(item)}>
                      <View style={styles.textContent}>
                        <Text style={styles.txtAddressSearch}>
                          {item.addressRoute}
                        </Text>
                        <Text style={styles.txtComplement}>
                          {item.addressComplement}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />

              {notResults === false ? (
                <View style={searchStyle.newOptions}>
                  <View style={searchStyle.noMap}>
                    <Text style={searchStyle.txtNoMap}>
                      Não achou seu endereço ?
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={searchStyle.btnMap}
                    onPress={() => mapCoordinate()}>
                    <Text style={searchStyle.txtBtnMap}>Buscar pelo mapa</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          ) : null}
        </SafeAreaView>
      </View>
    </>
  );
};

const searchStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  newOptions: {
    flexGrow: 1,
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  noMap: {
    borderColor: Colors.GREY_LIGHT,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  txtNoMap: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK,
  },
  btnMap: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.GREY_LIGHT,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  txtBtnMap: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.PRIMARY,
  },
  laderContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderChat: {
    width: 78,
    height: 98,
  },
  contentNoResults: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtMessage1: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BLACK,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  txtMessage2: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.GREY,
    marginBottom: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  txtMessage3: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.PRIMARY,
    marginBottom: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default SearchAddress;
