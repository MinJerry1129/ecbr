import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Platform,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import BtnApple from '../../../components/login/btnApple';
import BtnGoogle from '../../../components/login/btnGoogle';
// import BtnFacebook from '../../components/login/btnFacebook';

import packageJson from '../../../../package.json';
import { Typography, Colors } from '../../../styles';

import userAuth from '../../../services/userAuth';
import {
  StorageSet,
  StorageMultGet,
  StorageCleanAll,
} from '../../../services/deviceStorage';

import { seacrhDeliveryAddress } from '../../../services/service/delivery/address';

const socialMediaLogin = ({
  settingAnimated,
  navigation,
  onUserAuth,
  log,
  setModalLoad,
}) => {
  const widthScreen = Dimensions.get('screen').width;

  const signIn = async (getUserAuth, loginType) => {
    try {
      setModalLoad(true);
      await StorageCleanAll();

      const result = await userAuth(getUserAuth, loginType);

      if (result === false) {
        setModalLoad(false);
        log('Não foi possível autenticar', 'login-signIn');
        return Alert.alert('Não foi possível autenticar');
      }

      if (loginType === 'guest') {
        setModalLoad(true);
        await StorageSet('@addressUser', result);
        onUserAuth();
        return;
      }

      let params = await StorageMultGet(['nameUser', 'phoneUser', 'emailUser']);
      setModalLoad(true);

      let addresResponse = await seacrhDeliveryAddress({
        customer: result?._id,
        main: true,
      });

      if (addresResponse && addresResponse.length > 0) {
        await StorageSet('@addressUser', addresResponse[0]);
      }

      if (!params.nameUser || !params.phoneUser || !params.emailUser) {
        setModalLoad(false);
        log('NewUser', 'login-signIn');
        navigation.navigate('NewUser', {
          screen: 'NewUser',
          params: {
            type: 'email',
          },
        });

        return;
      }

      await StorageSet('CUSTOMER', { user: result, guest: false });
      setModalLoad(false);
      onUserAuth();
    } catch (err) {
      log(err, 'login-signIn');
    }
  };

  const authGuest = async () => {
    await signIn({}, 'guest');
  };

  return (
    <>
      <Image
        style={styles.economizeHeader}
        source={require('../../../assets/images/login/header.png')}
        resizeMode="stretch"
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.center}>
            <Image
              style={styles.economizeBrand}
              source={require('../../../assets/images/login/logo_ecbr.png')}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>Como deseja continuar?</Text>
            <TouchableOpacity
              onPress={() => settingAnimated(-widthScreen)}
              style={styles.loginPhone}>
              <Text style={styles.loginPhoneText}>Celular</Text>
            </TouchableOpacity>
            <View style={styles.boxOptionsLogin}>
              {Platform.OS === 'ios' && parseInt(Platform.Version, 10) > 12 ? (
                <BtnApple navigation={navigation} onPress={signIn} />
              ) : null}
              <BtnGoogle navigation={navigation} onPress={signIn} />
              {/* <BtnFacebook navigation={navigation} onPress={signIn} /> */}
            </View>
          </View>
        </ScrollView>
      </View>
      <SafeAreaView>
        <TouchableOpacity onPress={() => authGuest()} style={styles.otherLogin}>
          <Text style={styles.otherLoginText}>Continuar como convidado</Text>
        </TouchableOpacity>
        <View style={styles.viewVersion}>
          <Text style={styles.txtVersion}>Versão {packageJson.version}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default socialMediaLogin;

const styles = StyleSheet.create({
  economizeHeader: {
    width: '100%',
    height: '48%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  economizeBrand: {
    marginTop: 10,
    width: '90%',
    height: '10%',
  },
  subtitle: {
    fontSize: Typography.FONT_SIZE_21,
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    color: Colors.BLACK,
    marginTop: 40,
  },
  loginPhone: {
    flexShrink: 1,
    width: '80%',
    height: 42,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    borderWidth: 0.3,
    borderColor: Colors.GREY_LIGHT,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginPhoneText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.BLACK,
  },
  boxOptionsLogin: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  otherLogin: {
    alignSelf: 'center',
  },
  otherLoginText: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_15,
  },
  viewVersion: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    marginTop: 15,
  },
  txtVersion: {
    fontSize: Typography.FONT_SIZE_10,
  },
});
