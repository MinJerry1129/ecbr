import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const styles = StyleSheet.create({
  flatList: {
    height: 50,
    marginRight: 10,
  },
  container: {
    flex: 1,
  },
  headerText: {
    color: Colors.DARK_LIGHT,
    fontSize: Typography.FONT_SIZE_17,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginLeft: 20,
  },
  tabBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  tabContainer: {
    borderBottomColor: Colors.PRIMARY,
  },
  tabText: {
    padding: 15,
    color: '#9e9e9e',
    fontSize: 18,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    width: '96%',
    alignSelf: 'flex-end',
    backgroundColor: '#eaeaea',
  },
  sectionHeaderContainer: {
    height: 10,
    backgroundColor: '#f6f6f6',
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    color: '#010101',
    backgroundColor: '#fff',
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 15,
    minHeight: 65,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    color: '#131313',
  },
  itemPrice: {
    fontSize: 18,
    color: '#131313',
  },
  itemDescription: {
    marginTop: 10,
    color: '#b6b6b6',
    fontSize: 16,
  },
  itemRow: {
    flexDirection: 'row',
  },
});

export const ViewTitleList = styled.View`
  flex-shrink: 1;
  flex-direction: row;
  background-color: ${Colors.WHITE};
`;

export const TextTitleList = styled.Text`
  color: ${Colors.DARK_LIGHT};
  font-size: ${Typography.FONT_SIZE_17 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  margin-left: 20px;
`;

export const TouchTitleList = styled.TouchableOpacity`
  flex-shrink: 1;
  flex-direction: row;
  background-color: ${Colors.WHITE};
  border-bottom-width: ${props => (props.selected ? '4px' : '0px')};
  border-bottom-color: ${Colors.PRIMARY};
`;
