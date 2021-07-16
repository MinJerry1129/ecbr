import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Typography, Colors } from '../../styles/index';

export const CustomHeader = styled.View`
  background: ${Colors.PRIMARY};
  height: 70px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-top: 15px;
`;

export const HeaderTitle = styled.Text`
  color: ${Colors.WHITE};
  font-weight: bold;
  font-size: 18px;
`;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  scrollView: {
    backgroundColor: Colors.WHITE,
  },
  flatList: {
    marginTop: 20,
    marginHorizontal: 8,
    backgroundColor: Colors.WHITE,
  },
  star: {
    color: Colors.SECONDARY,
    fontSize: Typography.FONT_SIZE_14,
    marginLeft: 10,
    marginTop: 2,
  },
  listView: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    paddingBottom: 10,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 4.65,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.29,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 10,
    padding: 5,
    borderColor: Colors.PRIMARY,
  },
  listCard: {
    flexShrink: 1,
  },
  txtTitle: {
    fontSize: Typography.FONT_SIZE_16,
    letterSpacing: 1.1,
    color: '#707070',
    marginLeft: 10,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtDistance: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY,
    marginLeft: 10,
  },
  txtInfo: {
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginLeft: 10,
    marginTop: 2,
  },
  infoGreen: {
    color: Colors.SUCCESS,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtNotFound: {
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.PRIMARY,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
});

export { styles };
