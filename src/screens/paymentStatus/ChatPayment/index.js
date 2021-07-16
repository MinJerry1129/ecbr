/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Alert,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import database from '@react-native-firebase/database';

import {chooseImage, later} from './chatUtils';
import {OnPersonChat} from './messageUtil';
import styles from './styles';

import ChatImage from './components/ChatImage';
import MessageItem from './components/MessageItem';
import ChatImageLoad from './components/ChatImageLoad';
import InputBar from './components/InputBar';

import CustomerHeader from '../../../components/shared/CustomerHeader';
import headerAvatar from '../../../assets/images/headerAvatar.png';
import {StorageGet, StorageSet} from '../../../services/deviceStorage';
import {listChat, createChatImage} from '../../../services/service/chat';
import {listOrderOne} from '../../../services/service/shopping/order';
import {listOnePayment} from '../../../services/service/shopping/payment';
import messageSend from '../../../services/service/chat/message';
import {updateRead} from '../../../services/service/chat';

import LootieView from 'lottie-react-native';
import loaderLootie from '../../../assets/animations/loader.json';
import config from '../../../config';

const ChatPayment = ({}) => {
  const [payment, setPayment] = useState({});
  const [message, setMessage] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [cart, setCart] = useState(null);
  const [customer, setCustomer] = useState();
  const [person, setPerson] = useState(null);
  const [personType, setPersonType] = useState(null);
  const [order, setOrder] = useState();
  const [isLoad, setIsLoad] = useState(true);
  const [loadMessage, setLoadMessage] = useState(false);

  /* Navigation */
  const route = useRoute();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      initState();
    }, [route.params?.payment]),
  );

  useFocusEffect(
    useCallback(() => {
      if (payment && payment.company && order && order.orderStatus) {
        database()
          .ref(`${config.FIREBASE_PATH}chat/company/${payment.company}`)
          .on('value', async snapshot => {
            if (snapshot.val()) {
              let personCurrent = await OnPersonChat(
                order.orderStatus,
                () => {},
              );
              if (personCurrent && personCurrent.personType) {
                listMessages(personCurrent.personType);
              }
            }
          });
      }
    }, [payment, order, route.params?.payment]),
  );

  const initState = async () => {
    try {
      setIsLoad(true);

      let respPaymentStatus = null;
      const idPayment = route.params?.payment ?? null;

      if (!idPayment) {
        respPaymentStatus = await StorageGet('paymentStatus');
      } else {
        respPaymentStatus = await listOnePayment(idPayment);
        await StorageSet('paymentStatus', respPaymentStatus);
      }

      if (!respPaymentStatus) {
        navigation.navigate('Home');
        return;
      }

      setPayment(respPaymentStatus);

      if (
        !respPaymentStatus.shoppingCart ||
        !respPaymentStatus.shoppingCart._id
      ) {
        goBack();
        return;
      }

      if (!respPaymentStatus.customer || !respPaymentStatus.customer._id) {
        goBack();
        return;
      }

      setCart(respPaymentStatus.shoppingCart._id);
      setCustomer(respPaymentStatus.customer);
      const respOrder = await listOrderOne(respPaymentStatus._id);

      if (!respOrder || !respOrder.orderStatus) {
        goBack();
        return;
      }

      setOrder(respOrder);
      let personCurrent = await personChat(respOrder.orderStatus);

      if (personCurrent && personCurrent !== undefined) {
        let personResp =
          personCurrent && personCurrent.personType
            ? personCurrent.personType
            : 'shopper';
        listMessages(personResp);
      }

      setTimeout(() => {
        setIsLoad(false);
      }, 1000);
    } catch (err) {
      console.log('Error initState', err);
    }
  };

  const goBack = () => {
    if (payment && payment._id) {
      navigation.navigate('Shopping', {
        screen: 'PaymentStatus',
        params: {
          paymentId: payment._id,
        },
      });
    } else {
      navigation.navigate('Home');
    }
  };

  const listMessages = async (type = null) => {
    try {
      let respPaymentStatus = await StorageGet('paymentStatus');
      let personCurrent = '';

      if (personType) {
        personCurrent = personType;
      } else if (type) {
        personCurrent = type;
      } else {
        personCurrent = 'shopper';
      }

      let respChat = await listChat({
        cart: respPaymentStatus.shoppingCart._id,
        person: 'customer',
        personSend: personCurrent,
      });

      setChatMessages(respChat);
      updateRead(
        respPaymentStatus.customer._id,
        respPaymentStatus.shoppingCart._id,
      );
    } catch (err) {
      console.log('Fail listMessages', err);
    }
  };

  const selectImage = () => {
    chooseImage()
      .then(response => {
        sendImage(response.source.uri, response.type);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const sendMessage = async () => {
    setLoadMessage(true);
    if (!message || message.length <= 0) {
      return;
    }

    let personSendId = person?.person;
    // console.log('Id de Envio', personSendId);

    // if (personType === 'deliveryMan') {
    //   personSendId = person.deliveryMan._id;
    // }

    // if (personType === 'shopper') {
    //   personSendId = person.shopper._id;
    // }

    if (!personSendId || !personType || !cart) {
      await initState();
      await later(2000);
    }

    const messageAtual = message;

    Keyboard.dismiss();
    setMessage('');
    let respMessage = await messageSend({
      type: 'text',
      message: messageAtual,
      shoppingCart: cart,
      personId: customer._id,
      person: 'customer',
      personSendId: personSendId,
      personSend: personType,
      order_number: route.params.order,
    });

    if (!respMessage) {
      setLoadMessage(false);
      return Alert.alert('Oops', 'Não foi possível enviar Mensagem ...');
    }

    setLoadMessage(false);
    listMessages();
  };

  const sendImage = async (file, dataType) => {
    try {
      let respPaymentStatus = await StorageGet('paymentStatus');
      setChatMessages([
        {
          _id: `${Math.random()}`,
          type: 'image_load',
        },
        ...chatMessages,
      ]);

      await createChatImage({
        file,
        dataType,
        type: 'image',
        message: 'image',
        folder: 'chat_cart',
        shoppingCart: respPaymentStatus.shoppingCart._id,
        personId: customer._id,
        person: 'customer',
        personSendId: person._id,
        personSend: personType,
        order_number: route.params.order,
      });

      listMessages();
    } catch (err) {
      console.log('Err sendImage', err);
    }
  };

  const personChat = async orderStatus => {
    let respPersona = await OnPersonChat(orderStatus, goBack);

    if (respPersona) {
      setPerson(respPersona.user);
      setPersonType(respPersona.personType);
    }
    return respPersona;
  };

  const renderItem = item => {
    return (
      <>
        {item && item.type && item.type === 'text' ? (
          <MessageItem item={item} />
        ) : null}

        {item && item.type && item.type === 'image' ? (
          <ChatImage item={item} />
        ) : null}

        {item && item.type && item.type === 'image_load' ? (
          <ChatImageLoad />
        ) : null}

        {item && item.type && item.type === 'text_alert' ? (
          <View style={styles.textAlertContainer}>
            <Text style={styles.textAlert}>{item.message}</Text>
          </View>
        ) : null}
      </>
    );
  };

  const animatedLoad = () => {
    return (
      <View style={styles.loaderContent}>
        <LootieView
          source={loaderLootie}
          style={styles.loaderChat}
          resizeMode="cover"
          loop
          autoPlay
        />
      </View>
    );
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <View style={styles.container}>
            {/* <SafeAreaView> */}
            <CustomerHeader
              title={
                person && personType === 'shopper'
                  ? 'Shopper:'
                  : personType === 'deliveryMan'
                  ? 'Entregador'
                  : ''
              }
              avatarImg={headerAvatar}
              subtitle={person && person._id ? person.name : null}
              goBack={goBack}
            />
            {/* </SafeAreaView> */}
            {isLoad ? (
              animatedLoad()
            ) : (
              <>
                <FlatList
                  initialNumToRender={chatMessages ? chatMessages.length : 0}
                  inverted
                  style={styles.flatStyle}
                  data={chatMessages}
                  keyExtractor={item => `${item._id}`}
                  renderItem={({item}) => renderItem(item)}
                />
                {loadMessage && animatedLoad()}
                <SafeAreaView>
                  <InputBar
                    onchangeText={setMessage}
                    senderType={message && message.length ? 'text' : 'audio'}
                    onSubmitEditing={sendMessage}
                    onSubmitImage={selectImage}
                    value={message}
                  />
                </SafeAreaView>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatPayment;
