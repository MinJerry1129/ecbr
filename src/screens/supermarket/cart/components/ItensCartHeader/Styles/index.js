import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.View`
  background-color: ${Colors.WHITE};
`;

export const Header = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const TextHeader = styled.Text`
  margin-left: 20px;
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const Image = styled.Image`
  width: 20px;
  height: 21px;
  margin-right: 20px;
`;
