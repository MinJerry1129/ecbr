import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const styles = StyleSheet.create({
  iconCard: {
    color: Colors.PRIMARY,
  },
});

export const ViewIcon = styled.View`
  align-items: flex-start;
  justify-content: center;
`;

export const ViewBody = styled.View`
  justify-content: center;
`;

export const TextName = styled.Text`
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  color: ${Colors.BLACK};
  margin-bottom: 10px;
  margin-left: 10px;
`;
