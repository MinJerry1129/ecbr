import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';

import moment from 'moment';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  IconGoBack,
  styles,
  HeaderText,
  ViewFlagsCreditCard,
  Image,
  ViewContent,
  TextContent,
  TextInput,
  ViewContentInput,
  ViewCardData,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  ViewButton,
  Button,
  TextButton,
  TextError,
} from './Styles';

import {
  validExpireDate,
  expireDateMessage,
  cvvMessage,
  credicartMessage,
  nameCardMessage,
} from '../../../../utils/screens/addMethodPaymentUtil';

import {
  createPaymentMethod,
  errCreatePaymentMethod,
} from '../../../../services/service/shopping/paymentMethod';
import { createLog } from '../../../../services/service/Log';
import { isAuthenticated } from '../../../../services/userAuth';

const AddMethodPayment = ({ close }) => {
  const [cvv, setCvv] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [nameCard, setNameCard] = useState('');
  const [cvvField, setCvvField] = useState('');
  const [btnSend, setBtnSend] = useState(false);
  const [loadBtn, setLoadBtn] = useState(false);
  const [creditCard, setCreditCard] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cpfCnpjField, setCpfCnpjField] = useState('');
  const [expireDateField, setExpireDateField] = useState('');
  const [creditCardField, setCreditCardField] = useState(null);

  const save = async () => {
    try {
      setBtnSend(true);
      setLoadBtn(true);

      let listValidate = [
        cpfCnpjField.isValid(),
        expireDateField.isValid(),
        cvvField.isValid(),
        creditCardField.isValid(),
      ];

      const isValid = listValidate.every((element, index) => {
        return element === true;
      });

      if (!isValid) {
        console.log('Opps formulário não é válido', listValidate);
        Alert.alert('Algo de errado aconteceu, tente novamente');
        setLoadBtn(false);
        return;
      }

      const { user: user } = await isAuthenticated();
      let dataExp = moment(expireDate, 'MM/YY')
        .format('YYYY-MM-01')
        .toString();

      const resp = await createPaymentMethod(user._id, {
        cartNumber: creditCard.replace(/([^0-9]+)/gi, ''),
        nameOnCard: nameCard.toLocaleUpperCase(),
        valid: dataExp,
        verifierCode: cvv,
        documentType: 'CPF',
        isMain: true,
        document: cpfCnpj.replace(/([^0-9]+)/gi, ''),
      });

      await createLog({
        typeSystem: 'MOBILE',
        typeLog: 'ALERT',
        description: `Customer (id: ${
          resp.customer
          }) iniciou a tentativa de cadastrar o cartão ${resp.cartNumber}`,
        category: 'Payment Methods',
        originError: 'screens-paymentMethods-addMethodPayment',
      });

      setLoadBtn(false);
      if (errCreatePaymentMethod !== null) {
        Alert.alert('Método de Pagamento', errCreatePaymentMethod);
        return;
      }

      if (resp) {
        close();
        return;
      }
    } catch (err) {
      await createLog({
        typeSystem: 'MOBILE',
        typeLog: 'ERROR',
        description: err,
        category: 'Payment Methods',
        originError: 'screens-paymentMethods-addPaymentMethods',
      });
    }
  };

  return (
    <Container>
      <Header>
        <IconGoBack onPress={() => close(false)}>
          <Icon name="navigate-before" size={50} style={styles.headerBefore} />
        </IconGoBack>
        <HeaderText>CARTÃO DE CRÉDITO</HeaderText>
      </Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={0}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView>
            <ViewFlagsCreditCard>
              <Image
                source={require('./images/flagsCards.png')}
                resizeMode="contain"
              />
            </ViewFlagsCreditCard>
            <ViewContent>
              <TextContent containData={creditCard.length > 0}>
                Número do cartão
              </TextContent>
              <TextInputMask
                type={'credit-card'}
                value={creditCard}
                onChangeText={maskedText => {
                  setCreditCard(maskedText);
                }}
                ref={setCreditCardField}
                style={styles.input}
                keyboardType={'number-pad'}
              />
            </ViewContent>
            {credicartMessage(creditCard, btnSend) === false && (
              <TextError marginLeft={true}>Cartão Informado inválido</TextError>
            )}
            <ViewContentInput>
              <ViewCardData>
                <TextContent containData={expireDate.length > 0}>
                  Validade
                </TextContent>
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '99/99',
                    validator: function (value, settings) {
                      return validExpireDate(value);
                    },
                  }}
                  value={expireDate}
                  includeRawValueInChangeText={true}
                  onChangeText={(maskedText, rawText) => {
                    setExpireDate(maskedText);
                  }}
                  ref={setExpireDateField}
                  style={styles.input}
                  keyboardType={'number-pad'}
                />
                {expireDateMessage(expireDate, btnSend) === false && (
                  <TextError>Validade Inválido</TextError>
                )}
              </ViewCardData>
              <ViewCardData>
                <TextContent containData={cvv.length > 0}>CVV</TextContent>
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '999',
                  }}
                  value={cvv}
                  onChangeText={maskedText => {
                    setCvv(maskedText);
                  }}
                  ref={setCvvField}
                  style={styles.input}
                  keyboardType={'number-pad'}
                />
                {cvvMessage(cvv, btnSend) === false && (
                  <TextError>CVV Inválido</TextError>
                )}
              </ViewCardData>
            </ViewContentInput>
            <ViewContent>
              <TextContent containData={nameCard.length > 0}>
                Nome do Titular
              </TextContent>
              <TextInput
                onChangeText={setNameCard}
                value={nameCard}
                autoCompleteType={'name'}
                returnKeyType={'next'}
              />
            </ViewContent>
            {nameCardMessage(nameCard, btnSend) === false && (
              <TextError marginLeft={true}>
                Informe o nome impresso no cartão
              </TextError>
            )}
            <ViewContent>
              <TextContent containData={cpfCnpj.length > 0}>
                CPF/CNPJ do titular
              </TextContent>
              <TextInputMask
                type={'cpf'}
                value={cpfCnpj}
                includeRawValueInChangeText={true}
                onChangeText={(maskedText, rawText) => {
                  setCpfCnpj(rawText);
                }}
                ref={setCpfCnpjField}
                style={styles.input}
                keyboardType={'number-pad'}
              />
            </ViewContent>
          </SafeAreaView>
        </ScrollView>
        <ViewButton>
          <Button disabled={loadBtn} onPress={save}>
            <TextButton>{loadBtn ? 'Carregando...' : 'Adicionar'}</TextButton>
          </Button>
        </ViewButton>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default AddMethodPayment;
