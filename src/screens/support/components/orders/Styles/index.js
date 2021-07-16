import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import { Colors, Typography } from '../../../../../styles';

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

export const ViewHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const StatusBar = styled.StatusBar``;

export const TextHeader = styled.Text`
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_18 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  text-align: right;
  flex-grow: 1;
  margin-right: 20px;
`;

export const ViewBody = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const ViewOrder = styled.TouchableOpacity`
  height: 70px;
  margin-top: 7.5px;
  margin-bottom: 7.5px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 7px;
  flex-direction: row;
  background-color: ${Colors.WHITE};
`;

export const CompanyLogo = styled(FastImage)`
  width: 21%;
  height: 100%;
  border-radius: 7px;
`;

export const ViewDetails = styled.View`
  flex-shrink: 1;
  margin-left: 10px;
  justify-content: center;
`;

export const TextCompany = styled.Text`
  margin-bottom: 5px;
  color: ${Colors.DARK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const TextOrder = styled.Text`
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewLoading = styled.View`
  flex: 1;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;

export const TextOrdersNotFound = styled.Text`
  color: ${Colors.BLACK};
  font-size: ${Typography.FONT_SIZE_17 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
