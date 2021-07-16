import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

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

export const ScrollView = styled.ScrollView`
  margin-left: 20px;
  margin-right: 20px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
`;

export const ItemName = styled.Text`
  margin-top: 10px;
  text-align: center;
  margin-bottom: 40px;
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_18 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
