import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const ViewPicture = styled.View`
  height: 76px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const TouchPicture = styled.TouchableOpacity`
  width: 90px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const TextPicture = styled.Text`
  color: ${Colors.DARK};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const Image = styled.Image`
  width: 55px;
  height: 55px;
  margin-right: 15px;
  border-radius: 50px;
`;
