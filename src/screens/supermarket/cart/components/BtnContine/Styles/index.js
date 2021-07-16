import styled from 'styled-components/native';

import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.View`
  height: 160px;
  align-items: center;
  border-top-width: 0.3px;
  border-top-color: ${Colors.GREY_LIGHT};
  justify-content: flex-end;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const Button = styled.TouchableOpacity`
  width: 90%;
  height: 44px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.continue ? Colors.PRIMARY : Colors.GREY_BACKGROUND};
  margin-bottom: ${props => (props.continue ? '0px' : '10px')};
`;

export const Text = styled.Text`
  font-size: ${props =>
    props.continue
      ? Typography.FONT_SIZE_15 + 'px'
      : Typography.FONT_SIZE_13 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  color: ${props => (props.continue ? Colors.WHITE : Colors.PRIMARY)};
`;

export const ViewTotalsHorizontal = styled.View.attrs({ marginHorizontal: 20 })`
  flex: 1;
  width: 90%;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextTotal = styled.Text`
  color: ${Colors.GRAY_MAX_DARK};
  font-size: ${Typography.FONT_SIZE_17 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
