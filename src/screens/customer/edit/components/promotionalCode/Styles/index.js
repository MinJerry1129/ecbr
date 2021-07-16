import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.View`
  height: 76px;
  align-items: flex-start;
  justify-content: center;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const TextHeader = styled.Text`
  margin-left: 15px;
  margin-bottom: 10px;
  color: ${Colors.DARK};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const TextBody = styled.Text`
  margin-left: 15px;
  color: ${Colors.DARK_LIGHT};
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const TouchableOpacity = styled.TouchableOpacity``;
