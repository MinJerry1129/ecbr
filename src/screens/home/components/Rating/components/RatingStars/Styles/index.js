import styled from 'styled-components/native';
import { AirbnbRating } from 'react-native-ratings';

import { Colors, Typography } from '../../../../../../../styles';

export const Container = styled.View`
  width: 95%;
  height: 65%;
  justify-content: space-between;
`;

export const TextRating = styled.Text`
  text-align: center;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const StarsRating = styled(AirbnbRating)``;

export const ViewButtons = styled.View.attrs({ marginHorizontal: 50 })`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
