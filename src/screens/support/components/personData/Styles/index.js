import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const styles = StyleSheet.create({
  input: {
    marginTop: 15,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_17,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginBottom: 10,
  },
});

export const ViewBody = styled.View.attrs({ marginHorizontal: 20 })`
  margin-top: 20px;
`;

export const TextInput = styled.Text`
  color: ${Colors.DARK};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewInput = styled.View`
  border-bottom-width: 0.3px;
  border-bottom-color: ${Colors.GRAY_DARK};
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  margin-top: 15px;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_17 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  margin-bottom: 10px;
`;
