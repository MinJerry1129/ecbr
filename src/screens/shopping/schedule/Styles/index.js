import { StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../styles';

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

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const StatusBar = styled.StatusBar``;

export const ViewHeader = styled.View`
  height: 70px;
  flex-direction: row;
  align-items: center;
  margin-top: ${Platform.OS === 'android' ? '20px' : '0px'};
`;

export const TextHeader = styled.Text`
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_18 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  text-align: right;
  flex-grow: 1;
  margin-right: 20px;
`;
