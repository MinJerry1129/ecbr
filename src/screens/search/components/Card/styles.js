import { StyleSheet } from 'react-native';
import { Typography, Colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  cardTitle: {
    backgroundColor: Colors.GREY_BACKGROUND,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 0.5,
    marginRight: 10,
  },
  contentInfo: {
    flex: 1,
  },
  titleCompany: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.GREY,
  },
  viewMore: {},
  viewMoreTitle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.PRIMARY,
  },
  contentNote: {
    flexDirection: 'row',
  },
  txtStar: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.SECONDARY_LIGHT,
    marginRight: 10,
  },
  txtDistance: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.PRIMARY_DARK,
    marginRight: 10,
  },
  boxScrollProducts: {
    padding: 8,
  },
  boxProducts: {
    borderWidth: 0.5,
    borderColor: Colors.DARK_LIGHT,
    borderRadius: 4.65,
    padding: 10,
    width: 150,
    marginRight: 10,
    backgroundColor: Colors.BACKGROUND,
  },
  imageProduct: {
    width: '100%',
    maxWidth: 150,
    height: 90,
    borderRadius: 10,
  },
  boxProductsInfoText: {
    marginBottom: 5,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.BLACK,
    justifyContent: 'center',
  },
  boxProductsDescripText: {
    marginBottom: 5,
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.DARK_LIGHT,
  },
  containerPrice: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  boxProductsInfoPrice: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_12,
  },
  boxProductsInfoOldPrice: {
    textDecorationLine: 'line-through',
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_12,
  },
});

export default styles;
