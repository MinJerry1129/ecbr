import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const Container = styled.TouchableOpacity`
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 7px;
  margin-bottom: 10px;
  border-width: 0.5px;
  border-color: ${props =>
    props.isValid ? Colors.PRIMARY : Colors.GRAY_MEDIUM};
  height: ${props => (props.isRules ? '220px' : '172px')};
`;

export const ViewHeader = styled.View`
  margin-top: 5px;
  margin-left: 20px;
  margin-right: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ViweTextHeader = styled.View`
  justify-content: flex-end;
`;

export const TextHeader = styled.Text`
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  color: ${props => (props.isValid ? Colors.PRIMARY : Colors.DARK)};
`;

export const Image = styled.Image`
  width: 30px;
  height: 41px;
`;

export const TextRules = styled.Text`
  margin-top: 15px;
  margin-left: 20px;
  color: ${Colors.DARK_LIGHT};
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewValidStore = styled.TouchableOpacity`
  height: 30px;
  margin-top: 15px;
  justify-content: center;
  background-color: ${props =>
    props.isValid ? Colors.PRIMARY : Colors.GRAY_MEDIUM};
`;

export const TextValidStore = styled.Text`
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
  font-family: ${Typography.FONT_FAMILY_MEDIUM};
  margin-left: ${props => (props.isFooter ? '0px' : '20px')};
  color: ${props => (props.isValid ? Colors.WHITE : Colors.DARK)};
`;
export const TextHowUse = styled.Text`
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
  font-family: ${Typography.FONT_FAMILY_MEDIUM};
`;

export const ViewFooter = styled.View.attrs({ marginHorizontal: 20 })`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TouchHowUse = styled.TouchableOpacity`
  height: 30px;
  justify-content: center;
`;

export const ImageGoBack = styled.Image`
  width: 15px;
  height: 20px;
`;
