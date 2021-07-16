import React, { useState } from 'react';
import { Keyboard } from 'react-native';

import moment from 'moment';

import {
  TextRating,
  Button,
  TextButton,
  BodyBadRating,
  TextInput,
  ViewTextInput,
} from './Styles';

import { Colors } from '../../../../../../styles';

import { StorageSet } from '../../../../../../services/deviceStorage';
import { isAuthenticated } from '../../../../../../services/userAuth';
import { createTicket } from '../../../../../../services/service/HelpDesk';
import { updateCustomer } from '../../../../../../services/service/customer';

const BadRating = ({ setModal, show, stars }) => {
  if (!show) {
    return null;
  }

  const [comment, setComment] = useState(true);
  const [thankYouMessage, setThankYouMessage] = useState(false);

  const sendBadRating = async () => {
    if (thankYouMessage) {
      setModal(false);
    }

    setThankYouMessage(true);

    const { user: userAuth } = await isAuthenticated();

    const subject = `Avaliação: ${stars} estrelas`;

    await createTicket(
      userAuth.person.name,
      userAuth.person.phone,
      userAuth.person.email,
      comment,
      subject,
      userAuth.person._id,
      'HIGH',
      'SUPPORT',
      'NEW',
      null,
      null,
    );

    const dateRating = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').utc();

    const result = await updateCustomer(userAuth._id, {
      rating: { stars, comment, dateRating },
    });

    await StorageSet('CUSTOMER', { user: result, guest: false });
  };

  return (
    <BodyBadRating>
      <TextRating>
        {thankYouMessage
          ? 'Obrigado pelo seu feedback, iremos usá-lo para melhorar cada vez mais sua experiência!'
          : 'Fala pra gente o que podemos melhorar!'}
      </TextRating>
      {!thankYouMessage && (
        <ViewTextInput>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor={Colors.DARK}
            numberOfLines={5}
            multiline={true}
            onChangeText={text => setComment(text)}
            value={comment}
            onPress={Keyboard.dismiss}
            returnKeyType="next"
          />
        </ViewTextInput>
      )}
      <Button onPress={() => sendBadRating()}>
        <TextButton>{thankYouMessage ? 'Fechar' : 'Enviar'}</TextButton>
      </Button>
    </BodyBadRating>
  );
};

export default BadRating;
