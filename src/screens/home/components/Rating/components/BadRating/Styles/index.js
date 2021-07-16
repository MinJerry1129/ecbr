import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../../styles';

export const BodyBadRating = styled.View`
  align-items: center;
  justify-content: space-between;
`;

export const TextRating = styled.Text`
  text-align: center;
  margin-bottom: 10px;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const Button = styled.TouchableOpacity`
  width: 80px;
  height: 30px;
  border-radius: 7px;
  border-width: 0.3px;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.cancel ? Colors.WHITE : Colors.PRIMARY)};
  border-color: ${props => (props.cancel ? Colors.DARK_LIGHT : Colors.PRIMARY)};
`;

export const TextButton = styled.Text`
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  color: ${props => (props.cancel ? Colors.BLACK : Colors.WHITE)};
`;

export const ViewTextInput = styled.View`
  height: 60%;
  width: 260px;
  border-radius: 7px;
  border-width: 0.3px;
  border-color: ${Colors.GREY_LIGHT};
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  margin: 5px;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
