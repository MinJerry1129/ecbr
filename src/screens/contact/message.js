import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './styles';
import BtnBlue from '../../components/shared/btn/btnBlue';

const Message = () => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.txtOpenCalled}>Abrir Chamado</Text>

      <View style={styles.messageContainer}>
        <TextInput style={styles.inputMessage} multiline numberOfLines={10} />
      </View>

      <View style={styles.btnContainer}>
        <BtnBlue title="Enviar" />
      </View>
    </View>
  );
};

export default Message;
