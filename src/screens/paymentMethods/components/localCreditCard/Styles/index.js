import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Colors, Typography } from '../../../../../styles';

export const styles = StyleSheet.create({
  headerBefore: {
    color: Colors.PRIMARY,
  },
});

export const Container = styled.SafeAreaView`
  background-color: ${Colors.WHITE};
`;

export const IconGoBack = styled.TouchableOpacity``;

export const Header = styled.View`
  background-color: ${Colors.WHITE};
  flex-direction: row;
  align-items: center;
  height: 75px;
`;

export const HeaderText = styled.Text`
  font-family: ${Typography.FONT_FAMILY_MEDIUM};
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  text-align: right;
  flex: 1;
  margin-right: 15px;
`;

export const Body = styled.View`
  background-color: ${Colors.GREY_BACKGROUND};
  height: 100%;
`;

export const BodyHeader = styled.Text`
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_14 + 'px'};
  margin-top: 18px;
  margin-bottom: 18px;
  margin-left: 22px;
`;

export const ViewCards = styled.View`
  background-color: ${Colors.WHITE};
  align-items: flex-start;
`;

export const ViewCard = styled.TouchableOpacity`
  margin-right: 22px;
  margin-left: 22px;
  flex-direction: row;
  height: 55px;
  width: 90%;
  align-items: center;
  border-bottom-width: 0.3px;
  border-bottom-color: ${Colors.GREY_LIGHT};
`;

export const ImageCard = styled(FastImage)`
  width: 11%;
  height: 60%;
`;

export const TextCard = styled.Text`
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  color: ${Colors.BLACK};
  margin-left: 10px;
`;

export default styles;
