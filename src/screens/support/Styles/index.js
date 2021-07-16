import { StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';

export const styles = StyleSheet.create({
  icon: {
    color: Colors.PRIMARY,
    marginLeft: 5,
  },
  input: {
    marginTop: 15,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_17,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginBottom: 10,
  },
});

export const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const ViewHeader = styled.TouchableOpacity`
  height: 80px;
  flex-direction: row;
  align-items: center;
  margin-top: ${Platform.OS === 'ios' ? '0px' : '20px'};
`;

export const StatusBar = styled.StatusBar``;

export const TextHeader = styled.Text`
  flex-grow: 1;
  text-align: right;
  margin-right: 20px;
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_14 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewBody = styled.View.attrs({ marginHorizontal: 20 })`
  margin-top: 20px;
`;

export const TextInput = styled.Text`
  color: ${Colors.DARK};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewInputComment = styled.TouchableOpacity`
  margin-top: 15px;
  margin-bottom: 10px;
  border-radius: 7px;
  border-color: ${Colors.DARK_LIGHT};
  border-width: 0.3px;
  height: 150px;
`;

export const InputComment = styled.Text`
  height: 95%;
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewOrder = styled.View`
  height: 80px;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const TextNoOrder = styled.Text`
  margin-left: 20px;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_LIGHT};
`;

export const TouchSelectOrder = styled.TouchableOpacity`
  margin-right: 20px;
`;

export const TextSelectOrder = styled.Text`
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ButtonSend = styled.TouchableOpacity`
  height: 44px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.PRIMARY};
`;

export const TextButtonSend = styled.Text`
  color: ${Colors.WHITE};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewDetails = styled.View`
  width: 70%;
  margin-left: 20px;
  justify-content: center;
`;

export const TextCompany = styled.Text`
  margin-bottom: 10px;
  color: ${Colors.DARK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const TextOrder = styled.Text`
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
