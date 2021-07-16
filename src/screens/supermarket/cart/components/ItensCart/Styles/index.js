import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const FlatList = styled.FlatList``;

export const Line = styled.View`
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 10px;
  border-top-width: 2px;
  border-top-color: ${Colors.GREY_BACKGROUND};
`;

export const ViewItem = styled.View.attrs({ marginHorizontal: 20 })`
  flex-direction: row;
  justify-content: space-between;
`;

export const BoxImage = styled(FastImage)`
  width: 80px;
  height: 80px;
`;

export const ViewItemData = styled.View`
  flex: 1;
  margin-top: 10px;
  align-items: flex-start;
`;

export const ViewDescriptionItem = styled.View`
  width: 90%;
`;

export const TextDescriptionItem = styled.Text`
  margin-left: 20px;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_LIGHT};
`;

export const TextValueItem = styled.Text`
  margin-top: 10px;
  margin-left: 20px;
  color: ${Colors.GREY};
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
  font-family: ${Typography.FONT_FAMILY_LIGHT};
`;

export const ViewQuantityItem = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TextQuantityItem = styled.Text`
  color: ${Colors.GREY};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_LIGHT};
`;

export const TouchAddMoreItens = styled.TouchableOpacity`
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const TextAddMoreItens = styled.Text`
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_LIGHT};
`;
