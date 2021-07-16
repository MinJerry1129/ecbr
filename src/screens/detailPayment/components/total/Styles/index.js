import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const Container = styled.View`
  height: 120px;
  border-top-width: 0.3px;
  border-top-color: ${Colors.GREY_LIGHT};
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const ViewTotal = styled.View.attrs({ marginHorizontal: 30 })`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Text = styled.Text`
  color: #555555;
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_17 + 'px'};
`;

export const ViewButton = styled.View`
  align-items: center;
`;

export const TouchSendOrder = styled.TouchableOpacity`
  height: 44px;
  width: 85%;
  margin-top: 20px;
  border-radius: 7px;
  background-color: ${props =>
    props.enabled ? Colors.PRIMARY : Colors.GRAY_DARK};
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: ${props => (props.enabled ? Colors.WHITE : Colors.BLACK)};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
`;

export const ActivityIndicator = styled.ActivityIndicator.attrs({
  color: Colors.WHITE,
})`
  width: 120px;
  align-items: center;
  justify-content: center;
`;
