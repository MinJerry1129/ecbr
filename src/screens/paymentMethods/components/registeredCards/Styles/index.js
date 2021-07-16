import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const styles = StyleSheet.create({
  icon: {
    color: Colors.PRIMARY,
  },
});

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

export const TextItem = styled.Text`
  margin-left: 15px;
  text-align: center;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewIcon = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  width: ${props => (props.edit ? '30px' : '10px')};
`;

export const ImageIcon = styled.Image``;
