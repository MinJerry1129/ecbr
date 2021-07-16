import React, { useState } from 'react';
import { Keyboard, Platform } from 'react-native';

import {
  Modal,
  Container,
  Body,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from './Styles';

import BadRating from './components/BadRating';
import RatingStars from './components/RatingStars';

const Rating = ({ enableRating }) => {
  if (!enableRating) {
    return null;
  }

  const [stars, setStars] = useState(5);
  const [modal, setModal] = useState(true);

  const [showTextBox, setShowTextBox] = useState(false);

  return (
    <Modal
      presentationStyle="overFullScreen"
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => setModal(false)}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Body>
              <BadRating setModal={setModal} show={showTextBox} stars={stars} />
              <RatingStars
                setModal={setModal}
                notShow={showTextBox}
                setShowTextBox={setShowTextBox}
                stars={stars}
                setStars={setStars}
              />
            </Body>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default Rating;
