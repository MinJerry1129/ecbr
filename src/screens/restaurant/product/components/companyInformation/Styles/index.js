import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const styles = StyleSheet.create({
  iconInformation: {
    color: Colors.DARK_LIGHT,
  },
});

export const TouchableOpacity = styled.TouchableOpacity``;

export const TitleCompany = styled.Text`
  color: ${Colors.GREY};
  font-size: ${Typography.FONT_SIZE_18 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const Informations = styled.Text`
  color: ${Colors.GREY};
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const BoxInformation = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const BoxInformationTitle = styled.View`
  width: 89%;
`;

export const BoxInformationIcon = styled.View`
  align-items: flex-end;
  justify-content: center;
  margin-right: 10px;
  flex: 1;
`;

export const CircleIconInformation = styled.TouchableOpacity`
  border-width: 1.5px;
  border-radius: 50px;
  border-color: ${Colors.DARK_LIGHT};
`;

export default styles;
