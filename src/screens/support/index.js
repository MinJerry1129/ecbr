import React, { useState, useEffect } from 'react';
import { Modal, Alert } from 'react-native';

import moment from 'moment';
import 'moment/locale/pt-br';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import {
  styles,
  Container,
  ViewHeader,
  StatusBar,
  TextHeader,
  ViewBody,
  TextInput,
  ViewInputComment,
  ViewOrder,
  TextNoOrder,
  TouchSelectOrder,
  TextSelectOrder,
  ButtonSend,
  TextButtonSend,
  ViewDetails,
  TextCompany,
  TextOrder,
  ScrollView,
  InputComment,
} from './Styles';

import Orders from './components/orders';
import Message from './components/message';
import PersonData from './components/personData';

import { replaceSpecialChars } from '../../utils';

import { createTicket } from '../../services/service/HelpDesk';

const Support = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [person, setPerson] = useState('');
  const [order, setOrder] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);

  const sendTicket = async () => {
    if (!name) {
      Alert.alert('Oops', 'Informe um nome.');
      return;
    }

    if (!email) {
      Alert.alert('Oops', 'Informe um e-mail.');
      return;
    }

    if (!phone) {
      Alert.alert('Oops', 'Informe um celular.');
      return;
    }

    if (!comment) {
      Alert.alert('Oops', 'Informe uma mensagem.');
      return;
    }

    const subject = order?.orderStatus?.order_number
      ? `Pedido: ${order?.orderStatus?.order_number}`
      : 'Ticket App User';

    let phoneFormated = replaceSpecialChars(phone);

    await createTicket(
      name,
      '55' + phoneFormated,
      email,
      comment,
      subject,
      person,
      'HIGH',
      'SUPPORT',
      'NEW',
      order?.orderStatus?._id,
      order?.company?._id,
    );

    Alert.alert(
      'Pronto!',
      'Solicitação enviada com sucesso! Logo retornaremos o contato.',
    );

    navigation.goBack();
  };

  const goBack = () => {
    setComment('');
    setOrder(null);

    navigation.goBack();
  };

  return (
    <Container>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" />
        <Modal
          transparent={true}
          animationType="slide"
          visible={modal}
          onRequestClose={() => setModal(false)}>
          <Orders setModal={setModal} setOrder={setOrder} />
        </Modal>
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalMessage}
          onRequestClose={() => setModalMessage(false)}>
          <Message
            comment={comment}
            setComment={setComment}
            setModalMessage={setModalMessage}
          />
        </Modal>
        <ViewHeader>
          <Icon
            name="navigate-before"
            size={45}
            style={styles.icon}
            onPress={() => goBack()}
          />
          <TextHeader>SUPORTE</TextHeader>
        </ViewHeader>
        <PersonData
          setName={setName}
          name={name}
          setEmail={setEmail}
          email={email}
          setPhone={setPhone}
          phone={phone}
          setPerson={setPerson}
          setSku={() => { }}
        />
        <ViewBody>
          <TextInput>Número do pedido</TextInput>
        </ViewBody>
        <ViewOrder>
          {order ? (
            <ViewDetails>
              <TextCompany>
                {order.company.name} •{' '}
                {moment(order.orderStatus.createdAt).format('DD/MM')} •{' '}
                {moment(order.orderStatus.createdAt).format('HH:mm')}
              </TextCompany>
              <TextOrder>Pedido N. {order.orderStatus.order_number}</TextOrder>
            </ViewDetails>
          ) : (
              <TextNoOrder>Nenhum pedido selecionado</TextNoOrder>
            )}
          <TouchSelectOrder onPress={() => setModal(true)}>
            <TextSelectOrder>{order ? 'Trocar' : 'Selecionar'}</TextSelectOrder>
          </TouchSelectOrder>
        </ViewOrder>
        <ViewBody>
          <TextInput>Mensagem</TextInput>
          <ViewInputComment onPress={() => setModalMessage(true)}>
            <InputComment>{comment}</InputComment>
          </ViewInputComment>
          <ButtonSend onPress={() => sendTicket()}>
            <TextButtonSend>Enviar</TextButtonSend>
          </ButtonSend>
        </ViewBody>
      </ScrollView>
    </Container>
  );
};

export default Support;
