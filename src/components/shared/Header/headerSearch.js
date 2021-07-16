import React, { useEffect, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isAuthenticated } from '../../../services/userAuth';
import { seacrhDeliveryAddress } from '../../../services/service/delivery/address';

import styles from './styles';

const HeaderSearch = ({ navigation }) => {
  const [address, setAddress] = useState('');

  const formatAddress = addressFormat => {
    if (addressFormat && addressFormat.length > 5) {
      try {
        return addressFormat.substr(0, 40).split(' - ', 1)[0];
      } catch (err) {
        return addressFormat.substr(0, 40);
      }
    }
  };

  const screenLocation = useCallback(() => {
    navigation.navigate('Customer', {
      screen: 'CustomerAddress',
    });
  });

  useEffect(() => {
    const validateLocation = async () => {
      const response = await isAuthenticated();
      const addressUser = await seacrhDeliveryAddress({
        customer: response.user._id,
        main: true,
      });

      if (!addressUser || addressUser.length === 0) {
        screenLocation();
      } else {
        setAddress(formatAddress(addressUser[0].address));
      }
    };

    validateLocation();
  }, [screenLocation]);

  return (
    <TouchableOpacity style={styles.address} onPress={() => screenLocation()}>
      {address ? (
        <View style={styles.container}>
          <Text style={styles.txtAddress} numberOfLines={1}>
            {address}
          </Text>
          <Icon name="place" size={20} style={styles.placeIcon} />
        </View>
      ) : (
          <>
            <Text style={styles.txtAddress} numberOfLines={1}>
              Adicionar Endereço
          </Text>
            <Icon
              name="place"
              size={20}
              style={[styles.placeIcon, styles.disabled]}
            />
          </>
        )}
    </TouchableOpacity>
  );
};

export default HeaderSearch;
