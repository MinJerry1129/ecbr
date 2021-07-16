import { StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';

import { Colors, Typography } from '../../../../styles';

export const styles = StyleSheet.create({
  icon: {
    color: Colors.PRIMARY,
    marginLeft: 5,
  },
});

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const Modal = styled.Modal``;

export const ScrollView = styled.ScrollView``;

export const ViewHeader = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  height: 50px;
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
