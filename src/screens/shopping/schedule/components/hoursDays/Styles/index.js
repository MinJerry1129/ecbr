import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.TouchableOpacity`
  height: 50px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.3px;
  justify-content: space-between;
  border-bottom-color: ${Colors.GREY_LIGHT};
`;

export const TextHour = styled.Text`
  color: ${Colors.DARK};
  margin-left: 20px;
  font-size: ${Typography.FONT_SIZE_17 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const TextDeliveryPrice = styled.Text`
  margin-right: 20px;
  color: ${props => (props.isFree ? Colors.SUCCESS : Colors.DARK)};
  font-size: ${Typography.FONT_SIZE_17 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
