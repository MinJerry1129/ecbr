import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../../../../../../styles';

export const ImageBackground = styled.ImageBackground.attrs({
  paddingVertical: 2,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  height: 120px;
`;

export const BoxCompany = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BoxIcons = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

export const TouchableOpacity = styled.TouchableOpacity``;

export const styles = StyleSheet.create({
  icon: {
    color: Colors.WHITE,
  },
  iconInformation: {
    color: Colors.DARK_LIGHT,
  },
});
