import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const Header = styled.View`
  height: 70px;
  justify-content: center;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const TextHeader = styled.Text`
  margin-left: 20px;
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const TouchBody = styled.TouchableOpacity`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.WHITE};
`;

export const ViewTextBody = styled.View`
  width: 80%;
  margin-left: 20px;
`;

export const ViewWithdrawalText = styled.View`
  flex-direction: row;
  margin-bottom: ${props => (props.outsideCoverageArea ? '5px' : '0px')};
`;

export const TextBody = styled.Text`
  color: ${Colors.DARK};
  color: ${props => (props.free ? Colors.SUCCESS : Colors.DARK)};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const Line = styled.View.attrs({ marginHorizontal: 20 })`
  border-bottom-color: ${Colors.GREY_BACKGROUND};
  border-bottom-width: 1px;
`;

export const RadioButton = styled.View`
  width: 17px;
  height: 17px;
  margin-right: 20px;
  border-radius: 50px;
  background-color: ${props =>
    props.selected ? Colors.PRIMARY : Colors.GREY_BACKGROUND};
`;
