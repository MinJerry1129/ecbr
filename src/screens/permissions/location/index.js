import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

import Permission from '../../../services/permissions/locationPermission';

import styles from './styles';

const LocationPermission = ({navigation}) => {
  const map = require('./images/map.png');

  const goNext = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const acceptPermission = async () => {
    const isPermission = await Permission().setPermission();

    if (!isPermission) {
      return Linking.openSettings();
    }

    goNext();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView style={styles.BoxInfo}>
        <Text style={styles.title}>Economize tempo e dinheiro!</Text>
        <Image source={map} style={styles.map} />
        <View>
          <Text style={styles.titleLocation}>Permita localização</Text>
          <View style={styles.BoxSubTitleLocation}>
            <Text style={styles.SubTitleLocation}>
              E descubra promoções e restaurantes
            </Text>
            <Text style={styles.SubTitleLocation}>
              que entregam na sua região!
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.BoxFooter}>
        <TouchableOpacity style={styles.btn} onPress={() => goNext()}>
          <Text style={styles.btnText}>Pular</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary]}
          onPress={() => acceptPermission()}>
          <Text style={[styles.btnText, styles.btnTextPrimary]}>Permitir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LocationPermission;
