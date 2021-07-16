/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { replaceSpecialChars } from '../../../../utils';
import { Colors, Typography } from '../../../../styles';
import NotResultDelivery from '../../../../components/shared/notResultDelivery';

import {
  createDeliveryAddress,
  updateDeliveryAddress,
} from '../../../../services/service/delivery/address';
import { isAuthenticated } from '../../../../services/userAuth';
import { StorageSet } from '../../../../services/deviceStorage';
import { listCompany } from '../../../../services/service/company';

const ModalAddresMap = ({
  modal,
  address,
  edit,
  back,
  navigation,
  coordinate,
}) => {
  const markerIcon = require('../../../../assets/images/markerBlue.png');
  const [isResults, setIsResults] = useState(true);
  const [number, setNumber] = useState(edit?.number?.toString() || '');
  const [complement, setComplement] = useState(edit?.complement || '');
  const [reference, setReference] = useState(edit?.referencePoint || '');
  const [category, setCategory] = useState(edit?.category || '');
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!edit?.number && `${address?.number || ''}`.length > 0) {
      setNumber(`${address.number}`);
    }

    return () => {
      modal(false);
    };
  }, []);

  const save = async () => {
    try {
      setLoad(true);
      if (!reference || reference.trim().length < 5) {
        Alert.alert('Verifique os Dados enviados!!', 'Informe uma referência');
        setLoad(false);
        return;
      }

      if (!complement || complement.trim().length < 5) {
        Alert.alert(
          'Verifique os Dados enviados!!',
          'Informe um complemento válido',
        );
        setLoad(false);
        return;
      }

      if (!category) {
        Alert.alert(
          'Verifique os Dados enviados!',
          'Selecione Casa ou Trabalho',
        );
        setLoad(false);
        return;
      }

      const companyResult = await listCompany({
        delivery: '',
        latitude: address?.geometry?.location?.lat,
        longitude: address?.geometry?.location?.lng,
      });

      if (companyResult === null || companyResult.length <= 0) {
        setIsResults(false);
        return;
      }

      const { user: customer } = await isAuthenticated();
      if (edit && edit._id) {
        editItem(customer); // Editar informações
        return;
      }

      const formatedNumber = replaceSpecialChars(number);

      let result = await createDeliveryAddress({
        customer: customer?._id,
        formatedNumber,
        complement,
        referencePoint: reference,
        category,
        address: address?.formatted_address,
        addressRoute: `${address?.addressRoute || ''}`.replace(',', ''),
        addressRegion: `${address?.addressComplement || ''}`,
        latitude: address?.geometry?.location?.lat,
        longitude: address?.geometry?.location?.lng,
        city: `${address?.city}`,
      });

      if (!result || !result._id) {
        Alert.alert(
          'Verifique os Dados enviados!!',
          'Não foi possível salvar endereço',
        );
        setLoad(false);
        return;
      }

      await StorageSet('@addressUser', result);
      setLoad(false);
      return goHome();
    } catch (err) {
      // console.log('Oops fail save', err);
      setLoad(false);
    }
  };

  const editItem = async customer => {
    try {
      const formatedNumber = replaceSpecialChars(number);

      let result = await updateDeliveryAddress(edit._id, {
        customer: customer._id,
        formatedNumber,
        complement,
        referencePoint: reference,
        category,
        address: address?.formatted_address,
        addressRoute: `${address?.addressRoute || ''}`.replace(',', ''),
        addressRegion: `${address?.addressComplement || ''}`,
        latitude: address?.geometry?.location?.lat,
        longitude: address?.geometry?.location?.lng,
        city: `${address?.city}`,
      });

      if (!result || !result._id) {
        Alert.alert(
          'Verifique os Dados enviados!!',
          'Não foi possível Editar endereço',
        );
        setLoad(false);
        return;
      }

      await StorageSet('@addressUser', result);
      setLoad(false);
      // returnList();
      return goHome();
    } catch (err) {
      // console.log('Oops fail edit', err);
      setLoad(false);
    }
  };

  const goBack = () => {
    modal(false);
    navigation.navigate('Customer', {
      screen: 'CustomerAddress',
      params: {},
    });
  };

  const goHome = () => {
    modal(false);
    return navigation.navigate('Home', { screen: 'Home' });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isResults === false ? <NotResultDelivery close={back} /> : null}
      {isResults === true && address && address.addressRoute ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={0}
          enabled>
          <ScrollView
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Icon
                  name="navigate-before"
                  size={40}
                  color={Colors.PRIMARY}
                  onPress={() => goBack()}
                />
                <Text style={styles.txtHeader}>Novo endereço</Text>
              </View>
              <View style={styles.mapContainer}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  zoomControlEnabled={false}
                  zoomEnabled={false}
                  scrollEnabled={false}
                  style={styles.map}
                  initialRegion={coordinate}
                />
                <View pointerEvents="none" style={styles.markerAbsolute}>
                  <Image
                    pointerEvents="none"
                    source={markerIcon}
                    resizeMode="contain"
                    style={styles.markerIconSmall}
                  />
                </View>
              </View>
              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1 }}>
                  <View style={styles.txtAddressHeader}>
                    <Text style={styles.txtRoute}>
                      {`${address?.addressRoute || ''}`.replace(',', '')}
                    </Text>
                    <Text style={styles.txtAddresComplement}>
                      {address.addressComplement}
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputNumber}>
                      <TextInput
                        placeholder="Número"
                        placeholderTextColor={Colors.GREY}
                        style={[styles.inputFlex, styles.textInput]}
                        value={number}
                        onChangeText={setNumber}
                        keyboardType={'numeric'}
                      />
                      <Text numberOfLines={1} style={styles.txtError}>
                        {number && number.length <= 0
                          ? 'Informe o Número'
                          : null}
                      </Text>
                    </View>

                    <View style={styles.inputFlex}>
                      <TextInput
                        placeholder=" Apt / Bloco / Casa"
                        placeholderTextColor={Colors.GREY}
                        style={[styles.inputFlex, styles.textInput]}
                        value={complement}
                        onChangeText={setComplement}
                      />
                      <Text numberOfLines={1} style={styles.txtError}>
                        {complement && complement.length < 5
                          ? 'Informe um complemento válido'
                          : null}
                      </Text>
                    </View>
                  </View>

                  <View style={(styles.inputFlex, { marginTop: 10 })}>
                    <TextInput
                      placeholder="Ponto de Referência"
                      placeholderTextColor={Colors.GREY}
                      style={styles.textInput}
                      value={reference}
                      onChangeText={setReference}
                    />
                    <Text numberOfLines={1} style={styles.txtError}>
                      {reference && reference.length < 5
                        ? 'Informe uma referência válida'
                        : null}
                    </Text>
                  </View>

                  <View style={styles.boxTypeAddress}>
                    <Text style={styles.titleFavorite}>Salvar como:</Text>
                    <View style={styles.favoriteOption}>
                      <TouchableOpacity
                        style={[
                          styles.optionContainer,
                          styles.mr10,
                          category === 'HOME'
                            ? styles.optionContainerSelect
                            : null,
                        ]}
                        onPress={() => setCategory('HOME')}>
                        <View>
                          <Icon
                            name={'home'}
                            size={30}
                            style={
                              category === 'HOME'
                                ? styles.colorWhite
                                : styles.colorGrey
                            }
                          />
                        </View>
                        <Text
                          style={[
                            styles.txtOption,
                            category === 'HOME'
                              ? styles.colorWhite
                              : styles.colorGrey,
                          ]}>
                          Casa
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.optionContainer,
                          styles.ml10,
                          category === 'WORK'
                            ? styles.optionContainerSelect
                            : null,
                        ]}
                        onPress={() => setCategory('WORK')}>
                        <View>
                          <Icon
                            name={'business'}
                            size={30}
                            style={
                              category === 'WORK'
                                ? styles.colorWhite
                                : styles.colorGrey
                            }
                          />
                        </View>
                        <Text
                          style={[
                            styles.txtOption,
                            category === 'WORK'
                              ? styles.colorWhite
                              : styles.colorGrey,
                          ]}>
                          Trabalho
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
          <SafeAreaView style={styles.btnSaveBox}>
            <TouchableOpacity
              style={styles.btnSave}
              onPress={() => save()}
              disabled={load}>
              {!load || load === false ? (
                <Text style={styles.txtBtnSave}>Adicionar</Text>
              ) : (
                  <ActivityIndicator size="small" color={Colors.WHITE} />
                )}
            </TouchableOpacity>
          </SafeAreaView>
        </KeyboardAvoidingView>
      ) : null}
    </SafeAreaView>
  );
};

export default React.memo(ModalAddresMap);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  contentMap: {
    height: 100,
    // opacity: 1,
  },
  txtHeader: {
    flexGrow: 1,
    textAlign: 'center',
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginRight: 30,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  content: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  txtRoute: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.BLACK,
    marginBottom: 5,
  },
  txtAddresComplement: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_11,
    color: Colors.GRAY_DARK,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputFlex: {
    flex: 1,
    minHeight: 50,
    color: Colors.DARK,
  },
  inputNumber: {
    minHeight: 50,
    minWidth: 120,
    color: Colors.DARK,
    marginRight: 20,
  },
  txtAddressHeader: {
    borderBottomWidth: 0.5,
    borderColor: Colors.GREY,
  },
  textInput: {
    borderBottomWidth: 0.5,
    borderColor: Colors.GREY,
    paddingVertical: 10,
    minHeight: 50,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_13,
    color: Colors.BLACK,
  },
  txtError: {
    color: Colors.ALERT,
  },
  titleFavorite: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.BLACK,
    marginVertical: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  favoriteOption: {
    flexDirection: 'row',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
    flex: 1,
    height: 42,
  },
  optionContainerSelect: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.PRIMARY,
  },
  ml10: {
    marginLeft: 10,
  },
  mr10: {
    marginRight: 10,
  },
  txtOption: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_17,
    color: Colors.GREY,
    marginLeft: 10,
  },
  colorWhite: {
    color: Colors.PRIMARY,
  },
  colorGrey: {
    color: Colors.GREY,
  },
  btnSave: {
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 53,
    borderRadius: 10,
  },
  txtBtnSave: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.WHITE,
  },
  btnSaveBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    marginTop: 10,
    marginBottom: 10,
  },
  boxTypeAddress: {
    marginBottom: 40,
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
  mapContainer: {
    width: '100%',
    height: 90,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerIconSmall: {
    width: 30,
    height: 30,
    marginTop: 0,
  },
});
