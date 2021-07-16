import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Colors, Typography } from '../../../../../styles';

export const Container = styled.View`
  width: 80%;
  flex-direction: row;
`;

export const ViewBody = styled.View`
  margin-left: 15px;
  justify-content: center;
`;

export const TextName = styled.Text`
  margin-bottom: 10px;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const TextCard = styled.Text`
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ImageCard = styled(FastImage)`
  width: 27px;
  height: 19px;
`;
