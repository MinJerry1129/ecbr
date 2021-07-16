import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import styles from './styles';
import CompletedPayment from '../../components/product/completedPayment';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Payment({ navigation }) {
  const listCard = require('../../assets/images/list_card.png');

  const [modalLoad, setModalLoad] = useState(false);

  const tougleModal = () => {
    if (modalLoad) {
      setModalLoad(false);
    } else {
      setModalLoad(true);
    }
  };

  const deliveryScreen = () => {
    setModalLoad(false);
    navigation.navigate('PaymentStatus');
  };

  const goBack = () => {
    navigation.navigate('Schedule');
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalLoad}
        onRequestClose={() => tougleModal()}>
        <CompletedPayment onPress={deliveryScreen} />
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="navigate-before" size={40} style={styles.iconGoBack} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Formas de Pagamento</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.txtInfo}>
          Escolha uma das opções válidas por este estabelecimento
        </Text>

        <View style={styles.listCard}>
          <Image source={listCard} />
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formText}>Número do Cartão</Text>
          <TextInput style={styles.textInput} />

          <View style={styles.listDivider}>
            <View style={[styles.contentDivider, styles.mr10]}>
              <Text style={styles.formText}>Validade</Text>
              <TextInput style={styles.textInput} />
            </View>
            <View style={[styles.contentDivider, styles.ml10]}>
              <Text style={styles.formText}>CVV</Text>
              <TextInput style={styles.textInput} />
            </View>
          </View>

          <Text style={styles.formText}>Nome do titular</Text>
          <TextInput style={styles.textInput} />

          <Text style={styles.formText}>CPF</Text>
          <TextInput style={styles.textInput} />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.footer}
        activeOpacity={0.5}
        onPress={() => tougleModal()}>
        <Text style={styles.footerBtnTxt}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}
