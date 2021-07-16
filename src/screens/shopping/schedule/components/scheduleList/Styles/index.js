import { StyleSheet } from 'react-native';
import LootieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
});

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const Header = styled.View`
  height: 70px;
  justify-content: center;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const TextHeader = styled.Text`
  margin-left: 20px;
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewHeaderList = styled.View`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const ViewHeaderDay = styled.View`
  width: 60px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-right-width: 1px;
  border-right-color: ${props =>
    props.isActive ? Colors.PRIMARY : Colors.GRAY_LIGHT};
  border-left-width: ${props => (props.isActive ? '1px' : '0px')};
  border-left-color: ${props =>
    props.isActive ? Colors.PRIMARY : Colors.GRAY_LIGHT};
`;

export const TextHeaderList = styled.Text`
  margin-bottom: 5px;
  color: ${props => (props.isActive ? Colors.PRIMARY : Colors.DARK)};
  font-size: ${props =>
    props.isNumber
      ? Typography.FONT_SIZE_15 + 'px'
      : Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewSectionHeader = styled.View.attrs({ marginHorizontal: 20 })`
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.WHITE};
`;

export const TextSectionHeader = styled.Text`
  color: ${Colors.PRIMARY};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewLootie = styled(LootieView)`
  height: 100px;
`;

export const LootieContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
