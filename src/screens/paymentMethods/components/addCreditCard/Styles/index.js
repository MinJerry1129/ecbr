import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const styles = StyleSheet.create({
  headerBefore: {
    color: Colors.PRIMARY,
  },
  input: {
    height: 40,
    color: Colors.BLACK,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.GRAY_LIGHT,
    fontSize: Typography.FONT_SIZE_17,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
});

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const IconGoBack = styled.TouchableOpacity``;

export const Header = styled.View`
  height: 75px;
  align-items: center;
  flex-direction: row;
  background-color: ${Colors.WHITE};
`;

export const HeaderText = styled.Text`
  flex: 1;
  text-align: right;
  margin-right: 15px;
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_MEDIUM};
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const ViewFlagsCreditCard = styled.View`
  height: 80px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const Image = styled.Image``;

export const ViewContent = styled.View.attrs({ marginHorizontal: 20 })`
  margin-top: 20px;
`;

export const ViewCardData = styled.View`
  width: 45%;
  margin-top: 20px;
`;

export const TextContent = styled.Text`
  color: ${Colors.GREY};
  font-size: ${props =>
    props.containData
      ? Typography.FONT_SIZE_12 + 'px'
      : Typography.FONT_SIZE_21 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const TextInput = styled.TextInput`
  height: 40px;
  color: ${Colors.BLACK};
  border-bottom-width: 0.3px;
  border-bottom-color: ${Colors.GRAY_LIGHT};
  font-size: ${Typography.FONT_SIZE_17 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewContentInput = styled.View.attrs({ marginHorizontal: 20 })`
  flex-direction: row;
  justify-content: space-between;
`;

export const ViewButton = styled.View`
  align-items: center;
  margin-top: 20px;
`;

export const Button = styled.TouchableOpacity`
  height: 44px;
  width: 85%;
  border-radius: 7px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.disabled ? Colors.GREY : Colors.PRIMARY)};
`;

export const TextButton = styled.Text`
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  color: ${Colors.WHITE};
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const TextError = styled.Text`
  margin-left: ${props => (props.marginLeft ? '20px' : '0px')};
  margin-top: 10px;
  color: ${Colors.ALERT};
  font-size: ${Typography.FONT_SIZE_12};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
