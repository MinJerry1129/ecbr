import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const ViewTitle = styled.View`
  height: 65px;
  justify-content: center;
`;

export const TextTitle = styled.Text`
  margin-top: 18px;
  margin-left: 22px;
  margin-bottom: 18px;
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewBox = styled.View`
  background-color: ${Colors.WHITE};
`;

export const TouchItem = styled.TouchableOpacity`
  height: 67px;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: row;
  border-bottom-width: 0.3px;
  border-bottom-color: ${Colors.GRAY_MEDIUM};
  align-items: center;
  justify-content: space-between;
`;

export const ViewItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImageCreditCard = styled.Image`
  width: 21px;
  height: 21px;
`;

export const ImageMoney = styled.Image`
  width: 21px;
  height: 15px;
`;

export const ImageLocalPayment = styled.Image`
  width: 29px;
  height: 21px;
`;

export const TextItem = styled.Text`
  color: ${Colors.BLACK};
  margin-left: 15px;
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ImageIcon = styled.Image``;
