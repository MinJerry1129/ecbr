import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.View`
  flex: 1;
  margin-bottom: -10px;
  justify-content: flex-end;
  background-color: #00000050;
`;

export const Box = styled.View`
  height: 300px;
  align-items: center;
  border-radius: 15px;
  background-color: ${Colors.WHITE};
`;

export const Line = styled.View`
  width: 35px;
  margin-top: 30px;
  border-top-width: 2px;
  border-top-color: ${Colors.GRAY_MEDIUM};
`;

export const BoxText = styled.View.attrs({ marginHorizontal: 60 })`
  margin-top: 20px;
  align-items: center;
`;

export const TextHeader = styled.Text`
  text-align: center;
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_17 + 'px'};
  font-family: ${Typography.FONT_FAMILY_MEDIUM};
`;

export const TextBody = styled.Text`
  margin-top: 25px;
  text-align: center;
  color: ${Colors.GREY};
  font-size: ${Typography.FONT_SIZE_14 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const BoxButtons = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
  height: 32px;
  width: 124px;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 4px;
  border-width: 0.3px;
  align-items: center;
  justify-content: center;
  border-color: ${props => (props.yes ? Colors.PRIMARY : Colors.DARK_LIGHT)};
  background-color: ${props => (props.yes ? Colors.PRIMARY : Colors.WHITE)};
`;

export const TextButton = styled.Text`
  color: ${props => (props.yes ? Colors.WHITE : Colors.PRIMARY)};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
