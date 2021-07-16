import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';

export const styles = StyleSheet.create({
  icon: {
    color: Colors.PRIMARY,
  },
});

export const Container = styled.SafeAreaView`
  flex: 1;
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
  font-size: ${Typography.FONT_SIZE_14 + 'px'};
  text-align: right;
  flex: 1;
  margin-right: 15px;
`;

export const Body = styled.ScrollView`
  background-color: ${Colors.GREY_BACKGROUND};
`;
