import styled from 'styled-components/native';

import { Colors } from '../../../../../styles';

export const Modal = styled.Modal``;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex-grow: 1;
`;

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.BACKGROUND_MODAL_BLACK};
`;

export const Body = styled.View`
  width: 300px;
  height: 215px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.WHITE};
`;
