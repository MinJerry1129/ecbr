import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import CardShadow from '../../../components/shared/cardShadow';

const ListMethodsPayments = ({navigation, open}) => {
  return (
    <View style={{borderWidth: 0.4, borderRadius: 5, flexGrow: 1}}>
      <Text style={styles.txtTitle}>Adicionar Métodos de Pagamentos</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.cardItem} onPress={() => open()}>
          <Icon name="credit-card" size={20} />
          <Text style={styles.txtCartItem}>Cartão de Crédito ou Débito</Text>
          <View style={styles.iconContainerNext}>
            <Icon name="navigate-next" size={20} style={styles.carItemNext} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListMethodsPayments;
