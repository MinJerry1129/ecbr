import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const Header = styled.SafeAreaView`
  height: 70px;
  margin-top: 15px;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const HeaderBody = styled.View.attrs({ marginHorizontal: 30 })`
  height: 100%;
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
  height: 19px;
  width: 12px;
`;

export const Body = styled.View.attrs({ marginHorizontal: 30 })`
  height: 130px;
  width: 60%;
  justify-content: center;
`;

export const TextAddressType = styled.Text`
  color: ${Colors.BLACK};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
`;

export const TextAddress = styled.Text`
  color: ${Colors.GREY};
  margin-top: 10px;
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
`;

export const TextComplement = styled.Text`
  color: ${Colors.GREY};
  margin-top: 10px;
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_11 + 'px'};
`;
