import { StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const styles = StyleSheet.create({
  icon: {
    color: Colors.PRIMARY,
    marginLeft: 5,
  },
});

export const ViewHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: ${Platform.OS === 'ios' ? '0px' : '20px'};
`;

export const StatusBar = styled.StatusBar``;

export const TextHeader = styled.Text`
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_18 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  text-align: right;
  flex-grow: 1;
  margin-right: 20px;
`;
