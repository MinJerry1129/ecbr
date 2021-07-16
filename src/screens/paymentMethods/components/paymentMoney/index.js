import { Alert } from 'react-native';
import React, { useState } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  IconGoBack,
  HeaderText,
  Body,
  InputText,
  ViewInput,
  ViewButton,
  ButtonText,
  styles,
} from './Styles';

const PaymentMoney = ({ close, navigation, total }) => {
  const [change, setChange] = useState(0);
  const [moneyCurrent, setMoneyCurrent] = useState(0);

  const getValue = () => {
    let moneyRaw = 0;
    try {
      moneyRaw = moneyCurrent.getRawValue();
    } catch (err) { }

    if (moneyRaw < 0) {
      Alert.alert('OPS!', 'O valor não pode ser negativo.');
      return;
    }

    if (moneyRaw === 0 || moneyRaw <= total) {
      Alert.alert(
        'OPS!',
        'O valor tem que ser maior do que o total da compra.',
      );
      return;
    }

    close(false);
    navigation.navigate('Shopping', {
      screen: 'DetailPayment',
      params: {
        typePayment: 'MONEY',
        changeMoney: moneyRaw,
      },
    });
  };

  return (
    <Container>
      <Header>
        <IconGoBack onPress={() => close(false)}>
          <Icon name="navigate-before" size={50} style={styles.headerBefore} />
        </IconGoBack>
        <HeaderText>PAGAR COM DINHEIRO</HeaderText>
      </Header>
      <Body>
        <InputText>Enviar troco para:</InputText>
        <ViewInput>
          <TextInputMask
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: '',
            }}
            value={change}
            onChangeText={text => setChange(text)}
            ref={setMoneyCurrent}
            style={styles.input}
          />
        </ViewInput>
        <ViewButton enabled={true} onPress={() => getValue()}>
          <ButtonText enabled={true}>Continuar</ButtonText>
        </ViewButton>
      </Body>
    </Container>
  );
};

export default PaymentMoney;
