import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {Colors, Typography} from '../../../../../../styles';

export const ViewItem = styled.TouchableOpacity.attrs({
  textAlignVertical: 'top',
  padding: 20,
})`
  flex-direction: row;
  align-items: center;
  width: 100%;
  /* height: 115px; */
  min-height: 130px;
  /* background-color: black; */
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ViewBoxName = styled.View`
  flex: 1;
  min-height: 100px;
`;

export const ViewTxtPercent = styled.View.attrs({
  paddingVertical: 2,
})`
  background-color: ${Colors.PRIMARY_LIGHT};
  border-radius: 15px;
  max-width: 75px;
  margin-bottom: 5px;
`;

export const TxtPercent = styled.Text`
  letter-spacing: 1px;
  color: ${Colors.WHITE};
  text-align: center;
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_MEDIUM};
`;

export const TxtNameProd = styled.Text`
  color: ${Colors.BLACK};
  font-family: ${Typography.FONT_FAMILY_LIGHT};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  margin-top: 0px;
  padding-top: 0px;
  border-style: solid;
  margin-bottom: 5px;
`;

export const TxtDescriptProd = styled.Text`
  color: ${Colors.DARK};
  font-family: ${Typography.FONT_FAMILY_LIGHT};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  min-height: 25px;
`;

export const ViewPrice = styled.View.attrs({
  textAlignVertical: 'bottom',
})`
  flex-direction: row;
  flex: 1;
  align-items: flex-end;
`;

export const TxtPrice = styled.Text`
  color: ${Colors.PRIMARY};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
  margin-bottom: 3px;
  margin-right: 5px;
`;

export const TxtPricePromotion = styled.Text.attrs({
  textAlignVertical: 'center',
})`
  color: ${Colors.DARK_LIGHT};
  font-family: ${Typography.FONT_FAMILY_MEDIUM};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  text-decoration-line: line-through;
  margin-bottom: 3px;
`;

export const BoxImage = styled(FastImage)`
  width: 100px;
  height: 75px;
  margin-right: 20px;
  margin-bottom: 10px;
  border-radius: 8px;
`;
