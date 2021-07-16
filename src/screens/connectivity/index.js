import {Text, View, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import SemInternet from '../../assets/images/sem_internet.png';

const Connectivity = ({navigation}) => {
  const checkConnectivity = () => {
    NetInfo.fetch().then(state => {
      try {
        if (state.isConnected) {
          navigation.navigate('Home', {screen: 'Home'});
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image source={SemInternet} style={styles.img} />
      <Text style={styles.title}>Ixii... a internet caiu!</Text>
      <Text style={styles.description}>
        Verifique sua conexão e tente outra vez.
      </Text>
      <TouchableOpacity onPress={() => checkConnectivity()}>
        <Text style={styles.link}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Connectivity;
