import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Typography, Colors } from '../../../styles';

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: `${Colors.GRAY_DARK}`,
})`
  flex: 1;
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: 16px;
  min-height: 50px;
  letter-spacing: 1.2px;
  color: ${Colors.GRAY_DARK};
  height: 100%;
  width: 100%;
`;

export const ViewClickItem = styled.TouchableOpacity.attrs({ elevation: 5 })`
  margin-top: 5px;
  margin-right: 3px;
  margin-left: 3px;
  margin-bottom: 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props.copyright ? Colors.GREY_BACKGROUND : Colors.WHITE};
`;

export const ViewProductImage = styled.Image.attrs({ marginVertical: 10 })`
  width: 100px;
  height: 100px;
  margin-top: 5px;
  background-color: ${props =>
    props.copyright ? Colors.GREY_BACKGROUND : Colors.WHITE};
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imgBackground: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingVertical: 25,
  },
  BoxLogo: {
    width: 65,
    height: 65,
    borderRadius: 65,
    backgroundColor: Colors.WHITE,
    elevation: 5,
    overflow: 'hidden',
  },
  logo: {
    width: 65,
    height: 65,
  },
  boxIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  shareIcon: {
    marginRight: 20,
  },
  BoxCompany: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TitleCompany: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginLeft: 10,
  },
  searchContainer: {
    marginHorizontal: 10,
    paddingHorizontal: 15,
    marginTop: -10,
    backgroundColor: Colors.WHITE,
    borderRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingVertical: 0,
  },
  headerInfo: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfoText: {
    color: Colors.GREY,
    marginLeft: 5,
  },
  notProduct: {
    padding: 20,
    alignItems: 'center',
  },
  listOffers: {
    marginHorizontal: 7,
  },
  item: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    margin: 3,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'space-between',
    width: 160,
  },
  BoxItemSearch: {
    flexGrow: 1,
    marginHorizontal: 15,
  },
  itemSearch: {
    flexGrow: 1,
    flexBasis: 0,
    margin: 4,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'space-between',
  },
  clickItem: {
    flex: 1,
  },
  bellContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    padding: 10,
  },
  bellIcon: {
    width: 14,
    height: 18,
  },
  bellLoad: {
    width: 14,
    height: 18,
    color: Colors.PRIMARY,
  },
  productImg: {
    width: '100%',
    height: 100,
    marginVertical: 10,
  },
  BoxInfo: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  txtValue: {
    color: Colors.DARK,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
  },
  priceNormal: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_14,
    textAlignVertical: 'center',
  },
  pricePromotion: {
    color: Colors.DARK_LIGHT,
    fontSize: Typography.FONT_SIZE_12,
    textAlignVertical: 'center',
    textDecorationLine: 'line-through',
  },
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  txtDiscount: {
    color: Colors.PRIMARY,
    letterSpacing: 1,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_12,
  },
  txtPercent: {
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: Typography.FONT_SIZE_12,
  },
  txtNameProd: {
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_14,
    textTransform: 'capitalize',
  },
  BoxSearchItemEmpty: {
    flexGrow: 1,
    flexBasis: 0,
  },
  flatFooter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
  },
  flatIconLoad: {
    marginRight: 20,
    color: Colors.PRIMARY,
  },
  btnCart: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
