/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography, Colors } from '../../../../styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import { isAuthenticated } from '../../../../services/userAuth';
import { StorageSet } from '../../../../services/deviceStorage';
import {
  createDeliveryAddress,
  updateDeliveryAddress,
} from '../../../../services/service/delivery/address';
import Load from '../../../../components/shared/load';
import { geoCodeReverse } from '../../../../services/maps/geocoderService';
import { listCompany } from '../../../../services/service/company';
import NotResultDelivery from '../../../../components/shared/notResultDelivery';
import confirmStyles from './confirmStyles';
import { replaceSpecialChars } from '../../../../utils';

const ConfirmAddress = ({ navigation, close, item }) => {
  const markerIcon = require('../../../../assets/images/markerBlue.png');
  const [customer, setCustomer] = useState(false);
  const [address, setAddres] = useState('');
  const [modalLoad, setModalLoad] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [isResults, setIsResults] = useState(true);

  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [reference, setReference] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    setItens();
  }, []);

  useEffect(() => {
    const isCustomer = async () => {
      const { user: user } = await isAuthenticated();
      if (!user) {
        navigation.navigate('Splash');
        return;
      }
      setCustomer(user);
    };

    isCustomer();
  }, []);

  const setItens = async () => {
    if (item && item._id) {
      setComplement(`${item.complement || ''}`);
      setReference(`${item.referencePoint || ''}`);
      setCategory(`${item.category}`);
      setNumber(`${item.number || ''}`);
    }
  };

  const geoReverseLoad = async (latitude, longitude) => {
    setBtnLoad(true);
    const geoResult = await geoCodeReverse(latitude, longitude);
    setBtnLoad(false);

    if (geoResult && geoResult !== null) {
      setAddres(geoResult);
    }
  };

  const [coordinate, setCoordinate] = useState({
    latitude: -16.722011,
    longitude: -49.264993,
  });

  const goBack = () => {
    close();
  };

  const changeCoordinate = region => {
    setCoordinate({
      latitude: region.latitude,
      longitude: region.longitude,
    });

    geoReverseLoad(region.latitude, region.longitude);
  };

  const saveAddres = async () => {
    setModalLoad(true);

    if (address.length <= 2) {
      Alert.alert(
        'Verifique os Dados enviados!!',
        'Informe uma descrição para o endereço',
      );
      setModalLoad(false);
      return;
    }

    if (!reference || reference.trim().length < 1) {
      Alert.alert('Verifique os Dados enviados!!', 'Informe uma referência');
      setModalLoad(false);
      return;
    }

    if (!complement || complement.trim().length < 1) {
      Alert.alert(
        'Verifique os Dados enviados!!',
        'Informe um complemento válido',
      );
      setModalLoad(false);
      return;
    }

    if (!category) {
      Alert.alert('Verifique os Dados enviados!', 'Selecione Casa ou Trabalho');
      setModalLoad(false);
      return;
    }

    // Consultar se existe estabelecimentos atendendo aquela região
    const companyResult = await listCompany({
      delivery: '',
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    let result = null;
    if (companyResult !== null && companyResult.length) {
      const formatedNumber = replaceSpecialChars(number);
      if (item && item._id) {
        result = await updateDeliveryAddress(item._id, {
          customer: customer._id,
          formatedNumber,
          complement,
          referencePoint: reference,
          category,
          address: address,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        });
      } else {
        result = await createDeliveryAddress({
          customer: customer._id,
          formatedNumber,
          complement,
          referencePoint: reference,
          category,
          address: address,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        });
      }
      setModalLoad(false);
    } else {
      setIsResults(false);
      setModalLoad(false);
      return;
    }

    if (result) {
      await StorageSet('@addressUser', result);
      close();
    } else {
      Alert.alert(
        'Não foi possível salvar endereço, por favor tente mais tarde!!',
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      {isResults === false ? <NotResultDelivery close={close} /> : null}
      {isResults === true ? (
        <View style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalLoad}
              onRequestClose={() => setModalLoad(false)}>
              <Load />
            </Modal>

            <View style={styles.header}>
              <Icon
                name="navigate-before"
                size={40}
                color={Colors.GRAY_DARK}
                onPress={() => goBack()}
              />
              <Text style={styles.txtHeader}>Novo endereço</Text>
            </View>
            <ScrollView style={styles.content}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                keyboardVerticalOffset={0}>
                <View style={styles.mapContainer}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    zoomControlEnabled={true}
                    zoomEnabled={true}
                    style={styles.map}
                    initialRegion={{
                      latitude: coordinate.latitude,
                      longitude: coordinate.longitude,
                      latitudeDelta: 0.0009,
                      longitudeDelta: 0.0009,
                    }}
                    onRegionChangeComplete={region => {
                      changeCoordinate(region);
                    }}
                  />
                  <View pointerEvents="none" style={styles.markerAbsolute}>
                    <Image pointerEvents="none" source={markerIcon} />
                  </View>
                </View>

                <TextInput
                  placeholder="Localização"
                  placeholderTextColor={confirmStyles.placeholderColor}
                  style={confirmStyles.textInput}
                  value={address}
                  editable={false}
                  onChangeText={setAddres}
                />

                <View style={confirmStyles.inputContainer}>
                  <View style={[confirmStyles.inputFlex]}>
                    <TextInput
                      placeholder="Número"
                      placeholderTextColor={Colors.GREY}
                      style={[confirmStyles.inputFlex, confirmStyles.textInput]}
                      value={number}
                      onChangeText={setNumber}
                      keyboardType={'numeric'}
                    />
                    <Text numberOfLines={1} style={confirmStyles.txtError}>
                      {number && number.length <= 0 ? 'Informe o Número' : null}
                    </Text>
                  </View>
                  <View style={[confirmStyles.inputFlex]}>
                    <TextInput
                      placeholder="Complemento\quadra\lote"
                      placeholderTextColor={Colors.GREY}
                      style={[confirmStyles.inputFlex, confirmStyles.textInput]}
                      value={complement}
                      onChangeText={setComplement}
                    />
                    <Text numberOfLines={1} style={confirmStyles.txtError}>
                      {complement && complement.length < 5
                        ? 'Informe um complemento válido'
                        : null}
                    </Text>
                  </View>
                </View>

                <View style={[confirmStyles.inputFlex]}>
                  <TextInput
                    placeholder="Ponto de Referência"
                    placeholderTextColor={Colors.GREY}
                    style={confirmStyles.textInput}
                    value={reference}
                    onChangeText={setReference}
                  />
                  <Text numberOfLines={1} style={confirmStyles.txtError}>
                    {reference && reference.length < 5
                      ? 'Informe uma referência válida'
                      : null}
                  </Text>
                </View>
                <View>
                  <Text style={confirmStyles.titleFavorite}>Salvar como:</Text>
                  <View style={confirmStyles.favoriteOption}>
                    <TouchableOpacity
                      style={[
                        confirmStyles.optionContainer,
                        confirmStyles.mr10,
                        category === 'HOME'
                          ? confirmStyles.optionContainerSelect
                          : null,
                      ]}
                      onPress={() => setCategory('HOME')}>
                      <View>
                        <Icon
                          name={'home'}
                          size={35}
                          style={
                            category === 'HOME'
                              ? confirmStyles.colorWhite
                              : confirmStyles.colorGrey
                          }
                        />
                      </View>
                      <Text
                        style={[
                          confirmStyles.txtOption,
                          category === 'HOME'
                            ? confirmStyles.colorWhite
                            : confirmStyles.colorGrey,
                        ]}>
                        Casa
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        confirmStyles.optionContainer,
                        confirmStyles.ml10,
                        category === 'WORK'
                          ? confirmStyles.optionContainerSelect
                          : null,
                      ]}
                      onPress={() => setCategory('WORK')}>
                      <View>
                        <Icon
                          name={'business'}
                          size={35}
                          style={
                            category === 'WORK'
                              ? confirmStyles.colorWhite
                              : confirmStyles.colorGrey
                          }
                        />
                      </View>
                      <Text
                        style={[
                          confirmStyles.txtOption,
                          category === 'WORK'
                            ? confirmStyles.colorWhite
                            : confirmStyles.colorGrey,
                        ]}>
                        Trabalho
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
            <View style={styles.address}>
              <TouchableOpacity onPress={() => saveAddres()}>
                <LinearGradient
                  colors={['#00c0f3', Colors.PRIMARY]}
                  style={styles.btnAddress}>
                  <Text style={styles.txtAddress}>
                    {!item || !item._id ? 'Adicionar' : 'Editar'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      ) : null}
    </View>
  );
};

export default ConfirmAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  txtHeader: {
    flexGrow: 1,
    textAlign: 'center',
    color: Colors.GRAY_DARK,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginRight: 30,
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  mapContainer: {
    marginTop: 20,
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerIcon: {
    width: 80,
    height: 80,
  },
  contaienrForm: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  inputText: {
    color: Colors.DARK,
  },
  btnFotter: {
    marginHorizontal: 10,
    justifyContent: 'flex-end',
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
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  btnAddress: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  txtAddress: {
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.WHITE,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  },
});
