import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { Colors, Typography } from '../../../../../styles';

export const styles = StyleSheet.create({
  icon: {
    marginLeft: 5,
    color: Colors.PRIMARY,
  },
});

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const ViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const StatusBar = styled.StatusBar``;

export const TextHeader = styled.Text`
  flex-grow: 1;
  text-align: right;
  margin-right: 20px;
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_18 + 'px'};
  font-family: ${Typography.FONT_FAMILY_MEDIUM};
`;

export const ViewComment = styled.View.attrs({ marginHorizontal: 20 })``;

export const TextInput = styled.Text`
  color: ${Colors.DARK};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewInputComment = styled.View`
  height: 56%;
  margin-top: 15px;
  border-radius: 7px;
  margin-bottom: 10px;
  border-width: 0.3px;
  border-color: ${Colors.DARK_LIGHT};
`;

export const InputComment = styled.TextInput.attrs({ marginHorizontal: 10 })`
  height: 95%;
  margin-top: 5px;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
