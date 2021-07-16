import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.View`
  height: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const ViewText = styled.View`
  margin-left: 20px;
`;

export const TextHeader = styled.Text`
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const TouchLink = styled.TouchableOpacity`
  height: 30px;
  justify-content: center;
`;

export const TextLink = styled.Text`
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const Image = styled.Image`
  width: 41px;
  height: 52px;
  margin-right: 20px;
`;
