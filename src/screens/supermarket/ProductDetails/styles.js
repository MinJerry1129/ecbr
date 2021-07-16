import styled from 'styled-components/native';
import { StyleSheet, Platform } from 'react-native';
import { Typography, Colors } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: Platform.OS === 'ios' ? 5 : 20,
  },
  scroll: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  imageContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 20,
    backgroundColor: Colors.GREY_BACKGROUND,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  BoxInfo: {
    paddingRight: 20,
    flexShrink: 1,
  },
  titleProduct: {
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.DARK,
  },
  BoxPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    marginRight: 15,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_25,
    color: Colors.DARK,
  },
  OldPrice: {
    textDecorationLine: 'line-through',
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.GRAY_DARK,
  },
  BoxRelatedProducts: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    marginTop: 10,
    paddingVertical: 20,
  },
  BoxRelatedProductsTitle: {
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.GRAY_DARK,
    marginBottom: 10,
  },
  clickItem: {
    backgroundColor: Colors.GREY_BACKGROUND,
    marginRight: 12,
    marginLeft: 3,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    width: 140,
    justifyContent: 'space-between',
  },
  productImg: {
    width: '100%',
    height: 100,
    marginVertical: 10,
  },
  BoxInfoR: {
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
  },
  bellContainer: {
    position: 'absolute',
    top: 0,
    right: 5,
    zIndex: 10,
    padding: 10,
  },
  bellLoad: {
    width: 17,
    height: 22,
    color: Colors.PRIMARY,
  },
  bellIcon: {
    width: 17,
    height: 22,
  },
});

export const ViewImageContent = styled.View`
  align-items: center;
  justify-content: center;
  height: 200px;
  margin-bottom: 20px;
  background-color: ${props =>
    props.copyright ? Colors.GREY_BACKGROUND : Colors.WHITE};
`;

export const ViewClickItem = styled.TouchableOpacity.attrs({ elevation: 5 })`
  margin-right: 12px;
  margin-left: 3px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 140px;
  justify-content: space-between;
  border: 2px solid ${Colors.WHITE};
  background-color: ${Colors.WHITE};
`;

export const ViewImage = styled.View`
  background-color: ${props =>
    props.copyright ? Colors.GREY_BACKGROUND : Colors.WHITE};
  width: 100%;
`;

export default styles;
