import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const Header = styled.View`
  height: 110px;
  background-color: ${Colors.GREY_BACKGROUND};
  justify-content: center;
`;

export const HeaderBody = styled.View.attrs({ marginHorizontal: 30 })`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextHeader = styled.Text`
  color: ${Colors.PRIMARY};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
`;

export const Image = styled.Image`
  height: 21px;
  width: 21px;
`;

export const Body = styled.View.attrs({ marginHorizontal: 30 })`
  height: 100px;
  flex-direction: row;
  align-items: center;
`;

export const TextBody = styled.Text`
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 80px;
  color: ${Colors.DARK};
  font-family: ${Typography.FONT_FAMILY_LIGHT};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
`;

export const ScrollView = styled.ScrollView``;

export const RowTip = styled.View`
  flex-direction: row;
  flex-shrink: 1;
  margin-bottom: 15px;
  justify-content: space-between;
`;

export const ViewTip = styled.View``;

export const TouchTip = styled.TouchableOpacity`
  margin-right: 15px;
  margin-left: 5px;
  border-width: 0.3px;
  border-color: ${Colors.GRAY_MEDIUM};
  height: 30px;
  width: ${props => (props.otherValue ? '110px' : '30px')};
  border-radius: 6px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.selected ? Colors.PRIMARY : Colors.WHITE};
`;

export const TextTip = styled.Text`
  color: ${props => (props.selected ? Colors.WHITE : Colors.DARK)};
  font-size: ${props =>
    props.otherValue
      ? Typography.FONT_SIZE_16 + 'px'
      : Typography.FONT_SIZE_18 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
