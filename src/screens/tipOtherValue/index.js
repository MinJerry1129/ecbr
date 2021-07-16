import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../styles';
import iconGorjeta from '../../assets/images/Gorjeta2x.png';
import LinearGradient from 'react-native-linear-gradient';
import { toastShow } from '../../utils';
import { TextInputMask } from 'react-native-masked-text';

export default function Gorjeta({ navigation }) {
  const [value, setValue] = useState(0);

  const goBack = () => {
    try {
      let convert = parseFloat(`${value}`);
      if (!convert || isNaN(convert) === true || convert < 1) {
        toastShow('Valor não permitido', 'WARN');
        return;
      }

      if (value > 20) {
        toastShow('O limite da gorjeta é R$ 20,00', 'DEFAULT');
        return;
      }
      navigation.navigate('Shopping', {
        screen: 'DetailPayment',
        params: {
          tipValue: value,
        },
      });
    } catch (err) { }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}>
      <ScrollView style={styles.scrollView}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="navigate-before"
                size={45}
                style={styles.headerBefore}
              />
            </TouchableOpacity>
            <View style={styles.titleContent} activeOpacity={1}>
              <Text style={styles.headerTitle}>GORJETA</Text>
            </View>
          </View>
        </SafeAreaView>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.icon}>
              <Image source={iconGorjeta} />
            </View>
            <Text style={styles.txtHeader}>Adicionar o valor desejado</Text>
            <Text style={styles.txtRules}>
              Doe uma gorjeta ao entregador que enfrenta o trânsito para te
              atender melhor
            </Text>
            <TextInputMask
              type={'money'}
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$ ',
                suffixUnit: '',
              }}
              value={value}
              onChangeText={text => setValue(text)}
              style={styles.textInput}
            />
            <View style={styles.viewTip}>
              <TouchableOpacity style={styles.btnTip} onPress={() => goBack()}>
                <Text style={styles.txtTip}>Doar gorjeta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
