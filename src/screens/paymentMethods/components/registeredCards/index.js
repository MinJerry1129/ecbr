import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  styles,
  TextTitle,
  ViewTitle,
  ViewBox,
  TouchItem,
  ViewItem,
  TextItem,
  ViewIcon,
  TouchableOpacity,
  ImageIcon,
} from './Styles';

import Delete from './images/delete.png';
import NavigateNext from './images/navigateNext.png';
import NavigateBefore from './images/navigateBefore.png';

import {
  listPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from '../../../../services/service/shopping/paymentMethod';
import { isAuthenticated } from '../../../../services/userAuth';

const RegisteredCards = ({ loadAdd, goBack }) => {
  const [listCard, setListCard] = useState([]);
  const [editCard, setEditCard] = useState(false);

  const listPayments = async () => {
    const { user: user } = await isAuthenticated();
    const list = await listPaymentMethod(user._id);

    if (list && list !== null) {
      setListCard(list);
    }
  };

  useEffect(() => {
    listPayments();
  }, [loadAdd]);

  const changeMaster = async item => {
    await updatePaymentMethod(item._id, { isMain: true });
    goBack();
  };

  const deleteItem = item => {
    Alert.alert(
      'ATENÇÃO!',
      'Você realmente quer excluir este cartão?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await deletePaymentMethod(item._id);
            listPayments();
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <>
      <ViewTitle>
        <TextTitle>Cartões cadastrados</TextTitle>
      </ViewTitle>
      <ViewBox>
        {listCard.map(card => {
          return (
            <TouchItem onPress={() => changeMaster(card)}>
              <ViewItem>
                <Icon name="credit-card" size={25} style={styles.icon} />
                <TextItem>
                  **** {card.cartNumber.substring(12, card.cartNumber.length)}
                </TextItem>
              </ViewItem>
              {editCard ? (
                <ViewIcon>
                  <TouchableOpacity
                    edit={true}
                    onPress={() => setEditCard(false)}>
                    <ImageIcon source={NavigateNext} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    edit={true}
                    onPress={() => deleteItem(card)}>
                    <ImageIcon source={Delete} />
                  </TouchableOpacity>
                </ViewIcon>
              ) : (
                  <TouchableOpacity
                    edit={false}
                    onPress={() => setEditCard(true)}>
                    <ImageIcon source={NavigateBefore} />
                  </TouchableOpacity>
                )}
            </TouchItem>
          );
        })}
      </ViewBox>
    </>
  );
};

export default RegisteredCards;
