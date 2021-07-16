import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors, Typography } from '../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotResultDelivery = ({ close }) => {
  const goBack = () => {
    close();
  };

  const txtMessage = `
Bem-vindo \n
Estamos felizes em ter você aqui!
Ainda não estamos disponíveis neste endereço.
Mas não se preocupe, pois estaremos em breve.
Por enquanto, você pode cadastrar outro endereço dentro de nossa atual zona de cobertura
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => goBack()}>
          <Icon name="navigate-before" size={40} style={styles.headerBefore} />
        </TouchableOpacity>
        {/* <View style={styles.titleContent} activeOpacity={1}>
          <Text style={styles.headerTitle}>Nome da Cidade</Text>
        </View> */}
      </View>

      <View style={styles.content}>
        <Text style={styles.txtMessage}>{txtMessage}</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotResultDelivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  header: {
    flexDirection: 'row',
  },
  headerBefore: {
    color: Colors.WHITE,
  },
  titleContent: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.WHITE,
  },
  content: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  txtMessage: {
    fontSize: Typography.FONT_SIZE_25,
    fontWeight: '600',
    color: Colors.WHITE,
  },
});
