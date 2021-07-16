import React, {useEffect, useState} from 'react';
import {StorageClean} from '../../services/deviceStorage';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import styles from './styles';
import iconNotificacao from '../../assets/images/Notificacao.png';
import {Colors} from '../../styles';
import LinearGradient from 'react-native-linear-gradient';
import {getAuthenticated} from '../../services/userAuth';
import {updateCustomer} from '../../services/service/customer';
import {getUser} from '../../store/actions/user';
import {connect} from 'react-redux';
import {StorageSet} from '../../services/deviceStorage';

const Terms = ({navigation, onUserAuth}) => {
  const [show, setShow] = useState(false);
  const [customer, setCustomer] = useState(false);
  const logo = require('../../assets/images/logo_splash.png');

  const go = async status => {
    try {
      if (status) {
        const user = await updateCustomer(customer._id, {
          termsNotAccepted: false,
        });
        await StorageSet('CUSTOMER', {user: user, guest: false});
        navigation.navigate('Home', {screen: 'Home'});
      } else {
        await StorageClean('CUSTOMER');
        onUserAuth();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkAceptedTerms = async () => {
      const resultUser = await getAuthenticated();

      if (resultUser === false) {
        navigation.navigate('Login', {
          screen: 'login',
        });
        return;
      }

      setCustomer(resultUser.user);

      if (resultUser.user.termsNotAccepted === true) {
        setShow(true);
      } else {
        navigation.navigate('Home', {screen: 'Home'});
      }
    };

    checkAceptedTerms();
  }, [navigation, show]);

  const goTermsDescription = () => {
    try {
      navigation.navigate('TermsDescriptionStack', {
        screen: 'TermsDescription',
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!show || show === false ? (
        <View style={styles.containerShow}>
          <Image style={styles.logoShow} resizeMode="contain" source={logo} />
        </View>
      ) : (
        <>
          <StatusBar barStyle={'dark-content'} />
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <LinearGradient
              colors={Colors.GRADIENTE_GREY}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.container}>
              <View style={styles.content}>
                <Text style={styles.txtHeader}>Entre e economize</Text>
                <View style={styles.icon}>
                  <Image source={iconNotificacao} style={styles.sizeIcon} />
                </View>
                <Text style={styles.txtHeader}>Aceitar termos</Text>
                <Text style={styles.description}>
                  Você precisa aceitar os termos de privacidade e condições de
                  uso
                </Text>
                <TouchableOpacity onPress={() => goTermsDescription()}>
                  <Text style={styles.txtTerms}>Ver termos</Text>
                </TouchableOpacity>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => go(false)}>
                    <Text style={styles.buttonText}>Não aceito</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => go(true)}>
                    <Text style={styles.buttonText}>Li e aceito</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </ScrollView>
        </>
      )}
    </>
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
)(Terms);
