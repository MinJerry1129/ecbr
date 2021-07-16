import React from 'react';
import { Platform, Linking } from 'react-native';

import moment from 'moment';

import {
  Container,
  TextRating,
  StarsRating,
  ViewButtons,
  Button,
  TextButton,
} from './Styles';

import { Colors } from '../../../../../../styles';

import { StorageSet } from '../../../../../../services/deviceStorage';
import { isAuthenticated } from '../../../../../../services/userAuth';
import { updateCustomer } from '../../../../../../services/service/customer';

const RatingStars = ({ setModal, setShowTextBox, notShow, stars, setStars }) => {
  if (notShow) {
    return null;
  }

  const GOOGLE_PACKAGE_NAME = 'com.economize.customer';
  const APPLE_STORE_ID = 'id1516479439';

  const sendRating = async () => {
    if (stars < 4) {
      setShowTextBox(true);
      return;
    }

    const { user: userAuth } = await isAuthenticated();

    const dateRating = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').utc();

    const result = await updateCustomer(userAuth._id, {
      rating: { stars, comment: '', dateRating },
    });

    await StorageSet('CUSTOMER', { user: result, guest: false });

    //This is the main trick
    if (Platform.OS !== 'ios') {
      Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
        alert('Por favor verifique sua Google Play Store'),
      );
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
      ).catch(err => alert('Por favor verifique sua App Store'));
    }

    setModal(false);
  };

  const goBack = async () => {
    const dateRating = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').utc();

    await StorageSet('DATERATING', dateRating);

    setModal(false);
  };

  return (
    <Container>
      <TextRating>Você está gostando de economizar?</TextRating>
      <TextRating>Faça uma avaliação!</TextRating>
      <StarsRating
        count={5}
        defaultRating={5}
        selectedColor={Colors.WARNING}
        reviewColor={Colors.WARNING}
        size={25}
        showRating={false}
        isDisabled={false}
        onFinishRating={rating => setStars(rating)}
      />
      <ViewButtons>
        <Button cancel={true} onPress={() => goBack()}>
          <TextButton cancel={true}>Depois</TextButton>
        </Button>
        <Button onPress={() => sendRating()}>
          <TextButton>Avaliar</TextButton>
        </Button>
      </ViewButtons>
    </Container>
  );
};

export default RatingStars;
