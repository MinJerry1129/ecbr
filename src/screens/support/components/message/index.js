import React, { useRef, useEffect } from 'react';
import { Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import {
  Container,
  styles,
  StatusBar,
  ViewHeader,
  TextHeader,
  TextInput,
  ViewInputComment,
  InputComment,
  ViewComment,
  TouchableWithoutFeedback,
} from './Styles';

const Message = ({ comment, setComment, setModalMessage }) => {
  const inputComment = useRef(null);

  useEffect(() => {
    const _keyboardDidHide = () => {
      if (!inputComment) {
        return;
      }

      if (!inputComment.current.isFocused()) {
        setModalMessage(false);
      }
    };

    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, [setModalMessage]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar barStyle="dark-content" />
        <ViewHeader>
          <Icon
            name="navigate-before"
            size={45}
            style={styles.icon}
            onPress={() => setModalMessage(false)}
          />
          <TextHeader>SUPORTE</TextHeader>
        </ViewHeader>
        <ViewComment>
          <TextInput>Mensagem</TextInput>
          <ViewInputComment>
            <InputComment
              ref={inputComment}
              autoFocus={true}
              underlineColorAndroid="transparent"
              numberOfLines={5}
              multiline={true}
              onChangeText={text => setComment(text)}
              value={comment}
              onPress={Keyboard.dismiss}
              returnKeyType="send"
            />
          </ViewInputComment>
        </ViewComment>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Message;
