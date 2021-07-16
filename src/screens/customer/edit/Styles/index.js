import styled from 'styled-components/native';
import { StyleSheet, Platform } from 'react-native';
import { Colors, Typography } from '../../../../styles';

export const styles = StyleSheet.create({
  icon: {
    color: Colors.PRIMARY,
    marginLeft: 5,
  },
});

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const StatusBar = styled.StatusBar``;

export const ScrollView = styled.ScrollView``;
export const Modal = styled.Modal``;

export const ViewHeader = styled.TouchableOpacity`
  height: 76px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.WHITE};
  margin-top: ${Platform.OS === 'ios' ? '0px' : '20px'};
`;

export const TextHeader = styled.Text`
  flex-grow: 1;
  text-align: right;
  margin-right: 20px;
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_14 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewPicture = styled.View`
  height: 76px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const TextPicture = styled.Text`
  margin-right: 15px;
  color: ${Colors.DARK};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const Picture = styled.Image`
  width: 55px;
  height: 55px;
  margin-right: 15px;
  border-radius: 50px;
`;
