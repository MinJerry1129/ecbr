import { StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';

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

export const ViewContent = styled.View`
  flex: 1;
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
  font-family: ${Typography.FONT_FAMILY_MEDIUM};
`;

export const FlatList = styled.FlatList``;
