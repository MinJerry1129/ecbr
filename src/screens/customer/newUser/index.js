/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import styles from './styles';
import { createLog } from '../../../services/service/Log';
import {
  StorageMultGet,
  StorageGet,
  StorageSet,
} from '../../../services/deviceStorage';
import { validateEmail } from '../../../utils';
import {
  customerCurrent,
  updateCustomer,
  createCustomer,
  listCustomerSearch,
} from '../../../services/service/customer';
import { updatePersonOne, createPerson } from '../../../services/service/Person';
import { getUniqueId } from 'react-native-device-info';
import { connect } from 'react-redux';
import { getUser } from '../../../store/actions/user';
import { Colors } from '../../../styles';

const NewUser = ({ navigation, onUserAuth, route }) => {
  const [modalLoad, setModalLoad] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState();
  const [type, setType] = useState();

  const widthScreen = Dimensions.get('screen').width;
  const leftLogin = useRef(new Animated.Value(100)).current;
  const leftOtherLogin = useRef(new Animated.Value(0)).current;
  const input_email = useRef();

  const log = (err, originError) => {
    try {
      createLog({
        typeSystem: 'MOBILE',
        typeLog: 'ERROR',
        description: err,
        category: 'newUser',
        originError: originError,
      });
    } catch (_err) {
      return false;
    }
  };

  useEffect(() => {
    const isInfo = async () => {
      let params = await StorageMultGet([
        'nameUser',
        'phoneUser',
        'emailUser',
        '_idUser',
      ]);

      if (!params._idUser && !params.phoneUser) {
        navigation.navigate('Login', {
          screen: 'login',
        });
        return;
      }

      if (!params._idUser) {
        await newUser(params);
        settingAnimated(0);
      }

      if (params.nameUser) {
        setName(params.nameUser);
      }

      if (params.emailUser) {
        setEmail(params.emailUser);
      }

      if (params.phoneUser) {
        setPhone(params.phoneUser);
      }

      if (validateName(params.nameUser) === false) {
        return;
      }

      settingAnimated(-widthScreen);

      if (!validateEmail(params.emailUser)) {
        setType('email');
        return;
      }

      settingAnimated(-widthScreen);

      if (`${params.phoneUser || ''}`.length < 10) {
        setType('phone');
        return;
      }

      return true;
    };

    isInfo();
  }, []);

  useEffect(() => {
    if (validateName(name)) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }

    if (validateEmail(email.replace(/\s/g, ''))) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }

    if (phone.length < 10) {
      setIsValidPhone(false);
    } else {
      setIsValidPhone(true);
    }
  }, [name, email, phone]);

  const validateName = value => {
    // let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let regName = /^[a-zA-Z].{6,}$/;
    let validName = `${value || ''}`.replace(/[0-9]/g, '');

    if (validName.length >= 6 && regName.test(value.trim())) {
      return true;
    }

    return false;
  };

  const settingAnimated = useCallback(
    toValue => {
      Keyboard.dismiss();
      Animated.parallel([
        Animated.timing(leftLogin, {
          toValue: toValue,
          useNativeDriver: false,
          duration: 400,
        }),
        Animated.timing(leftOtherLogin, {
          toValue: toValue,
          useNativeDriver: false,
          duration: 400,
        }),
      ]).start();
    },
    [leftLogin, leftOtherLogin],
  );

  useEffect(() => {
    settingAnimated(0);
  }, [settingAnimated]);

  if (modalLoad) {
    return (
      <View style={[styles.container, styles.loader]}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  const saveNameNextEmail = async () => {
    if (!name) {
      return;
    }

    setModalLoad(true);

    let response = await saveinfoUser({
      name: name.trim(),
      status: true,
    });

    if (!response) {
      Alert.alert('Oops', 'Não foi possível salvar Nome');
      log('Não foi possível salvar Nome', 'newUser');
      return;
    }

    setModalLoad(false);
    settingAnimated(-widthScreen);
    if (!email) {
      setType('email');
    } else {
      await auth();
    }
  };

  const saveEmailNextPhone = async () => {
    if (!email) {
      return;
    }
    setModalLoad(true);

    let userSearch = await listCustomerSearch({
      email: email,
    });

    if (userSearch && userSearch._id) {
      setModalLoad(false);
      log('Este e-mail já se encontra cadastrado', 'newUser');
      return Alert.alert('Oops', 'Este e-mail já se encontra cadastrado');
    }

    let response = await saveinfoUser({
      email: email.trim(),
      status: true,
    });

    if (!response) {
      setModalLoad(false);
      log('Não foi possível salvar E-mail', 'newUser');
      Alert.alert('Oops', 'Não foi possível salvar E-mail');
      return;
    }

    if (isValidPhone) {
      await auth();
      return;
    }

    setModalLoad(false);
    settingAnimated(-widthScreen);
    setType('phone');
  };

  const lastStep = async () => {
    if (!isValidPhone) {
      return;
    }

    setModalLoad(true);
    let phoneValue = `55${phone.replace(/\D/g, '')}`;

    let userSearch = await listCustomerSearch({
      phone: `${phone.replace(/\D/g, '')}`,
    });

    if (userSearch && userSearch._id) {
      setModalLoad(false);
      log('Este número já se encontra cadastrado', 'newUser');
      return Alert.alert('Oops', 'Este número já se encontra cadastrado');
    }

    let response = await saveinfoUser({
      phone: phoneValue,
      status: true,
    });

    if (!response) {
      log('Não foi possível salvar Telefone', 'newUser');
      Alert.alert('Oops', 'Não foi possível salvar Telefone');
      setModalLoad(false);
      return;
    }

    await auth();
  };

  const auth = async () => {
    let userId = await StorageGet('_idUser');
    let userResponse = await customerCurrent(userId);
    if (userResponse && userResponse._id) {
      await StorageSet('CUSTOMER', { user: userResponse, guest: false });
      onUserAuth();
    }

    setModalLoad(false);
  };

  const saveinfoUser = async params => {
    try {
      let userResponse = null;

      if (!user || user === null || !user._id) {
        let userId = await StorageGet('_idUser');
        if (!userId) {
          log('UserId não encontrado no StorageGet', 'newUser');
          navigation.navigate('Login', {
            screen: 'login',
          });
          return;
        }

        userResponse = await customerCurrent(userId);
        setUser(userResponse);
      } else {
        userResponse = user;
      }

      if (userResponse && userResponse._id && userResponse.person) {
        let uniqueId = getUniqueId();

        if (userResponse.device !== uniqueId) {
          await updateCustomer(userResponse._id, {
            device: uniqueId,
          });

          let devices = userResponse.person?.devices ?? [];

          devices.push(uniqueId);
          await updatePersonOne(userResponse.person._id, {
            devices: devices,
            status: true,
          });
        }

        await updateCustomer(userResponse._id, params);
        await updatePersonOne(userResponse.person._id, params);
        return true;
      }

      return false;
    } catch (err) {
      log(err, 'newUser');
      return false;
    }
  };

  const newUser = async params => {
    try {
      setModalLoad(true);
      let userSearch = await listCustomerSearch({
        phone: `${params?.phoneUser.replace(/\D/g, '')}`,
      });

      if (userSearch && userSearch._id) {
        await StorageSet('_idUser', `${userSearch._id}`);
        setModalLoad(false);
        return;
      }

      let uniqueId = getUniqueId();
      let person = await createPerson({
        phone: `${params?.phoneUser.replace(/\D/g, '')}`,
        devices: [uniqueId],
        status: true,
      });

      if (!person || !person._id) {
        setModalLoad(false);
        log('Erro ao criar Person', 'newUser');
        navigation.navigate('Login', {
          screen: 'login',
        });
        return;
      }

      let userCreate = await createCustomer({
        device: uniqueId,
        person: person._id,
        status: true,
        phone: `${params?.phoneUser.replace(/\D/g, '')}`,
      });

      if (!userCreate || !userCreate._id) {
        setModalLoad(false);
        log('Erro ao criar User', 'newUser');
        navigation.navigate('Login', { screen: 'login' });
        return;
      }

      await StorageSet('_idUser', `${userCreate._id}`);
      setModalLoad(false);
      return;
    } catch (err) {
      log(err, 'newUser');
      setModalLoad(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.keyboardBox}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.BoxAnimated}>
              <Animated.View style={[styles.boxRegister, { left: leftLogin }]}>
                <TouchableOpacity style={styles.jump} onPress={() => auth()}>
                  <Text style={styles.jumpText}>Pular</Text>
                </TouchableOpacity>
                <View style={styles.containerData}>
                  <Text style={styles.Title}>
                    Falta pouco para fazer um lanchinho, antes precisamos do seu
                    <Text style={[styles.Title, styles.TitleMain]}>
                      {' nome completo'}
                    </Text>
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={setName}
                    autoFocus={true}
                    placeholder="Digite seu nome"
                    placeholderTextColor={Colors.DARK}
                  />
                  <TouchableOpacity
                    disabled={!isValidName}
                    style={[
                      styles.btn,
                      isValidName ? styles.boxSave : styles.boxSaveDisable,
                    ]}
                    onPress={() => saveNameNextEmail()}>
                    <Text
                      style={[
                        styles.boxSaveText,
                        isValidName
                          ? styles.boxSaveTextActive
                          : styles.boxSaveTextDisable,
                      ]}>
                      Continuar
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>

              <Animated.View
                style={[styles.boxRegister, { left: leftOtherLogin }]}>
                {type === 'email' ? (
                  <>
                    <TouchableOpacity
                      style={styles.jump}
                      onPress={() => auth()}>
                      <Text style={styles.jumpText}>Pular</Text>
                    </TouchableOpacity>
                    <View style={styles.containerData}>
                      <View style={styles.boxTitle}>
                        <Text style={styles.Title}>
                          E para começar, o seu
                          <Text style={[styles.Title, styles.TitleMain]}>
                            {' endereço de email'}
                          </Text>
                        </Text>
                      </View>
                      <TextInput
                        ref={input_email}
                        style={styles.textInput}
                        autoFocus={true}
                        onChangeText={setEmail}
                        placeholder="Informe E-mail"
                        autoCapitalize="none"
                        placeholderTextColor={Colors.DARK}
                      />
                      <TouchableOpacity
                        disabled={!isValidEmail}
                        style={[
                          styles.btn,
                          isValidEmail ? styles.boxSave : styles.boxSaveDisable,
                        ]}
                        onPress={() => saveEmailNextPhone()}>
                        <Text
                          style={[
                            styles.boxSaveText,
                            isValidEmail
                              ? styles.boxSaveTextActive
                              : styles.boxSaveTextDisable,
                          ]}>
                          Continuar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}
                {type === 'phone' ? (
                  <>
                    <TouchableOpacity
                      style={styles.jump}
                      onPress={() => auth()}>
                      <Text style={styles.jumpText}>Pular</Text>
                    </TouchableOpacity>
                    <View style={styles.containerData}>
                      <View>
                        <View style={styles.boxTitle}>
                          <Text style={styles.Title}>
                            E para começar, o número do seu{' '}
                            <Text style={[styles.Title, styles.TitleMain]}>
                              telefone
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View style={styles.boxPhone}>
                        <View style={styles.brazilPhone}>
                          <Image
                            source={require('../../../assets/images/br.png')}
                          />
                          <Text style={styles.phoneTag}>+55</Text>
                        </View>
                        <TextInputMask
                          type={'cel-phone'}
                          autoFocus={true}
                          style={styles.inputPhone}
                          value={phone}
                          onChangeText={setPhone}
                          placeholder="Celular"
                          placeholderTextColor="#999a99"
                          keyboardType="phone-pad"
                          options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) ',
                          }}
                        />
                      </View>
                      <TouchableOpacity
                        disabled={!isValidPhone}
                        style={[
                          styles.btn,
                          isValidPhone ? styles.boxSave : styles.boxSaveDisable,
                        ]}
                        onPress={() => lastStep()}>
                        <Text
                          style={[
                            styles.boxSaveText,
                            isValidPhone
                              ? styles.boxSaveTextActive
                              : styles.boxSaveTextDisable,
                          ]}>
                          SALVAR
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onUserAuth: () => dispatch(getUser()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(NewUser);
