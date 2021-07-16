import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.View`
  height: 80px;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  height: 44px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.PRIMARY};
`;

export const TextButton = styled.Text`
  color: ${Colors.WHITE};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
