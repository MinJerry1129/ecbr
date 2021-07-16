import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.BACKGROUND_MODAL};
`;

export const Body = styled.View`
  width: 250px;
  height: 250px;
  border-radius: 7px;
  justify-content: space-between;
  background-color: ${Colors.WHITE};
`;

export const ViewText = styled.View.attrs({ marginHorizontal: 20 })`
  margin-top: 40px;
`;

export const Text = styled.Text`
  margin-bottom: 20px;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewButtons = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  width: 80px;
  height: 30px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 7px;
  border-width: 0.3px;
  align-items: center;
  justify-content: center;
  border-color: ${props =>
    props.continue ? Colors.PRIMARY : Colors.GREY_LIGHT};
  background-color: ${props =>
    props.continue ? Colors.PRIMARY : Colors.WHITE};
`;

export const TextButton = styled.Text`
  color: ${props => (props.continue ? Colors.WHITE : Colors.PRIMARY)};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
