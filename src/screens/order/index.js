import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  styles,
  ListItem,
  ListItemText,
  LeftContent,
  AcceptButton,
  AcceptButtonText,
} from './styles';
import { AirbnbRating } from 'react-native-ratings';
import { Colors } from '../../styles';
import { formatDate } from '../../utils';
import { isAuthenticated } from '../../services/userAuth';
import { listPayCustomer } from '../../services/service/shopping/payment';
import { updateStatusOrder } from '../../services/service/shopping/order';
import { createAvaliation } from '../../services/service/avaliation';
import { listShopperSearch } from '../../services/service/shopper';
import BtnBlue from '../../components/shared/btn/btnBlue';
import DetailOrder from './detailOrder';
import OrderStatus from './orderStatus';
import { TextInput } from 'react-native-paper';
import { updateCart } from '../../services/service/shopping/cart';
import { createLog } from '../../services/service/Log';
import CardWithShadow from '../../components/shared/CardWithShadow';

export default function Order({ navigation }) {
  const [payments, setPayments] = useState([]);
  const [isResults, setIsResults] = useState(true);
  const [modalDetail, setModalDetail] = useState(false);
  const [modalCanceled, setModalCanceled] = useState(false);
  const [modalAvaliation, setModalAvaliation] = useState(false);
  const [paymentItem, setPaymentItem] = useState({});
  const [causeCanceled, setCauseCanceled] = useState('');
  const [canceledItem, setCanceledItem] = useState([]);
  const [avaliationItem, setAvaliationItem] = useState([]);
  const [description, setDescription] = useState(null);
  const [starts, setStarts] = useState(5);

  useFocusEffect(
    useCallback(() => {
      listPayment();
      return () => {
        setModalDetail(false);
      };
    }, [listPayment]),
  );

  const listPayment = useCallback(async () => {
    const { user: userAuth } = await isAuthenticated();
    const listResp = await listPayCustomer(userAuth._id);
    if (listResp && listResp.length > 0) {
      setPayments(listResp);
    } else {
      setIsResults(false);
    }
  });

  const supermarketScreen = () => {
    navigation.navigate('Supermarket', {
      screen: 'Supermarket',
    });
  };

  const goDetailOrDelivery = item => {
    setPaymentItem(item);

    navigation.navigate('Shopping', {
      screen: 'PaymentStatus',
      params: {
        paymentId: item._id,
        routeOrigin: 'Order',
      },
    });
  };

  const status = item => {
    try {
      if (item && item.orderStatus && item.orderStatus.status) {
        return OrderStatus(item.orderStatus.status);
      }
    } catch (err) {
      return '';
    }
  };

  const canceledOrder = async () => {
    if (causeCanceled === '') {
      return;
    } else {
      canceledItem.orderStatus.status = 'CANCELED';

      try {
        const resultStatus = await updateStatusOrder(
          canceledItem.orderStatus._id,
          {
            status: 'CANCELED',
          },
        );

        const resultCart = await updateCart(
          canceledItem.orderStatus.shoppingCart,
          {
            status: 'canceled',
            causeCanceled: causeCanceled.text,
            isDeleted: true,
          },
        );

        if (!resultStatus || !resultCart) {
          await createLog({
            typeSystem: 'MOBILE',
            typeLog: 'ERROR',
            description: 'Erro ao cancelar pedido',
            category: 'Canceled order',
            originError: 'screens-order-index',
          });
        }
      } catch (err) {
        await createLog({
          typeSystem: 'MOBILE',
          typeLog: 'ERROR',
          description: err,
          category: 'Canceled order',
          originError: 'screens-order-index',
        });
      }

      setCauseCanceled('');
      setModalCanceled(!modalCanceled);
    }
  };

  const ModalCanceld = item => {
    setModalCanceled(true);
    setCanceledItem(item);
  };

  const ModalAvalia = item => {
    setDescription('');
    setModalAvaliation(true);
    setAvaliationItem(item);
  };

  const ratingCompleted = rating => {
    setStarts(rating);
  };

  const saveAvaliation = async item => {
    try {
      let findShopper = await listShopperSearch({
        company: item.orderStatus.company,
      });

      let avaliation = await createAvaliation({
        typeEvaluator: 'Customer',
        typeRated: 'Shopper',
        idEvaluator: item.orderStatus.customer,
        idRated: findShopper[0]._id,
        company: item.orderStatus.company,
        order: item.orderStatus._id,
        payment: item.orderStatus.payment,
        starts: starts,
        description: description,
      });

      if (avaliation) {
        setDescription('');
        setModalAvaliation(false);
        listPayment();
        setStarts(5);
        Alert.alert('Obrigado!', 'Sua avaliação é muito importante');
      }
    } catch {
      setDescription('');
      setStarts(5);
      Alert.alert(
        'Erro!',
        'Não conseguimos registrar sua avaliação, tente novamente mais tarde',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDetail}
        onRequestClose={() => setModalDetail(false)}>
        <DetailOrder close={setModalDetail} paymentItem={paymentItem} />
      </Modal>

      {payments && payments.length > 0 ? (
        <>
          <FlatList
            style={styles.flatList}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={payments}
            keyExtractor={item => `${item._id}`}
            renderItem={({ item }) => (
              <View>
                <CardWithShadow>
                  <ListItem onPress={() => goDetailOrDelivery(item)}>
                    <View style={styles.image}>
                      <Image
                        source={{ uri: item.company.images[0] }}
                        style={styles.imageCompany}
                        resizeMode="contain"
                      />
                    </View>
                    <LeftContent>
                      <View style={styles.cardInfo}>
                        <ListItemText color="#707070" size={20}>
                          Pedido: {item.orderStatus.order_number}
                        </ListItemText>
                        {item.avaliation &&
                          Object.keys(item.avaliation).length > 0 && (
                            <View style={styles.boxStarAvaliationDisable}>
                              <AirbnbRating
                                count={5}
                                defaultRating={item.avaliation[0].starts}
                                selectedColor={Colors.WARNING}
                                reviewColor={Colors.WARNING}
                                size={15}
                                showRating={false}
                                starContainerStyle={
                                  styles.starAvaliationDisable
                                }
                                isDisabled={true}
                              />
                            </View>
                          )}
                        <ListItemText color="#A3A3A3" size={12}>
                          Status: {status(item)}
                        </ListItemText>
                        <ListItemText color="#A3A3A3" size={12}>
                          Pedido em:{' '}
                          {formatDate(item.createdAt, 'DD/MM/YYYY HH:mm')}
                        </ListItemText>
                      </View>
                    </LeftContent>
                    {status(item) === 'Finalizado' &&
                      (!item.avaliation || item.avaliation?.length === 0) && (
                        <AcceptButton>
                          <TouchableOpacity onPress={() => ModalAvalia(item)}>
                            <AcceptButtonText>Avaliar</AcceptButtonText>
                          </TouchableOpacity>
                        </AcceptButton>
                      )}
                    {status(item) !== 'Finalizado' && (
                      <AcceptButton>
                        <AcceptButtonText>Visualizar</AcceptButtonText>
                      </AcceptButton>
                    )}
                  </ListItem>
                </CardWithShadow>
              </View>
            )}
          />
          <Modal
            animationType="none"
            transparent={true}
            visible={modalAvaliation}
            onRequestClose={() => {
              setModalAvaliation(false);
            }}>
            <KeyboardAvoidingView
              style={styles.boxAvaliation}
              behavior={Platform.select({
                ios: 'padding',
                android: null,
              })}>
              <TouchableOpacity
                style={styles.boxAvaliationBack}
                onPress={() => setModalAvaliation(false)}
              />
              <View style={styles.boxAvaliationView}>
                <View style={styles.boxAvaliationInfo}>
                  <Image
                    style={styles.modalAvaliationImage}
                    source={{
                      uri: avaliationItem?.company?.images[0],
                    }}
                    resizeMode="contain"
                  />
                  <AirbnbRating
                    count={5}
                    defaultRating={5}
                    selectedColor={Colors.WARNING}
                    reviewColor={Colors.WARNING}
                    size={25}
                    showRating={false}
                    starContainerStyle={styles.starAvaliation}
                    onFinishRating={rating => ratingCompleted(rating)}
                  />
                  <View style={styles.boxAvaliationInfoText}>
                    <Text style={styles.modalAvaliationText}>
                      Avalie agora mesmo o pedido feito no
                    </Text>
                    <Text style={styles.modalAvaliationTextName}>
                      {avaliationItem?.company?.name}
                    </Text>
                    <View style={styles.boxInput}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="Adicione um comentário"
                        placeholderTextColor={Colors.DARK}
                        value={description}
                        onChangeText={text => setDescription(text)}
                        numberOfLines={1}
                        multiline={true}
                        style={styles.inputDescription}
                      />
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.buttonAvaliation}
                  onPress={() => saveAvaliation(avaliationItem)}>
                  <Text style={styles.buttonAvaliationText}>Avaliar</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalCanceled}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Confirma o cancelamento do pedido?
                </Text>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Motivo"
                    placeholderTextColor={Colors.DARK}
                    numberOfLines={10}
                    autoFocus={true}
                    multiline={true}
                    onChangeText={text => setCauseCanceled({ text })}
                    value={causeCanceled}
                  />
                </View>
                <View style={styles.modalViewButton}>
                  <TouchableOpacity
                    style={{
                      ...styles.openButton,
                    }}
                    onPress={() => {
                      canceledOrder();
                    }}>
                    <Text style={styles.textStyle}>Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.openButton,
                    }}
                    onPress={() => {
                      setModalCanceled(!modalCanceled);
                    }}>
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      ) : null}

      {isResults === false ? (
        <View style={styles.infoOrder}>
          <Text style={styles.txtInfo}>Você ainda não fez nenhum pedido!!</Text>
          <View style={styles.btContainer}>
            <BtnBlue title={'Fazer um pedido'} onPress={supermarketScreen} />
          </View>
        </View>
      ) : null}
    </View>
  );
}
