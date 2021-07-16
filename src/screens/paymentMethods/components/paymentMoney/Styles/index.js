import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../../../styles';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  headerBefore: {
    color: Colors.PRIMARY,
  },
  input: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_18,
    marginLeft: 10,
    marginRight: 10,
    height: 55,
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
  font-size: ${Typography.FONT_SIZE_14 + 'px'};
  text-align: right;
  flex: 1;
  margin-right: 15px;
`;

export const Body = styled.View`
  background-color: ${Colors.GREY_BACKGROUND};
  height: 100%;
`;

export const InputText = styled.Text`
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  margin-top: 18px;
  margin-left: 22px;
`;

export const ViewInput = styled.View`
  border-radius: 7px;
  border-width: 0.3px;
  border-color: ${Colors.DARK_LIGHT};
  background-color: ${Colors.WHITE};
  height: 55px;
  margin-top: 10px;
  margin-left: 22px;
  margin-right: 22px;
  color: ${Colors.BLACK};
`;

export const Input = styled.TextInput`
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_18 + 'px'};
  margin-left: 10px;
  margin-right: 10px;
  height: 55px;
`;

export const ViewButton = styled.TouchableOpacity`
  background-color: ${props => (props.enabled ? Colors.PRIMARY : '#eaeaea')};
  border-radius: 7px;
  height: 55px;
  margin-left: 22px;
  margin-right: 22px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const ButtonText = styled.Text`
  font-family: ${Typography.FONT_FAMILY_BOLD};
  color: ${props => (props.enabled ? Colors.WHITE : Colors.DARK_LIGHT)};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  text-align: center;
`;

export default styles;
