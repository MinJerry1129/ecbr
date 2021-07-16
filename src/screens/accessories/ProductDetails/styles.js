import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { Typography, Colors } from '../../../styles';

const styles = StyleSheet.create({
  safeArea: { marginTop: Platform.OS === 'android' ? 30 : 40 },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    marginTop: 25,
  },
  iconBefore: {
    color: Colors.PRIMARY,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {},
  imageContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 200,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  productImage: {
    maxWidth: '100%',
    borderRadius: 5,
    height: '100%',
    minWidth: 300,
  },
  touchShowMore: {
    height: 30,
    justifyContent: 'center',
  },
  showMore: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  titleProduct: {
    marginTop: 5,
    marginBottom: 8,
    color: Colors.GRAY_DARK,
    fontSize: Typography.FONT_SIZE_22,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  boxOptions: {
    marginTop: 10,
  },
  badge: {
    backgroundColor: 'transparent',
    borderRadius: 3,
    padding: 3,
  },
  boxTitle: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxMax: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleMax: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginLeft: 5,
  },
  titleOption: {
    fontSize: Typography.FONT_SIZE_17,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.WHITE,
  },
  boxComplements: {},
  complementItem: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.9,
    borderBottomColor: Colors.GRAY_LIGHT,
  },
  boxRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.DARK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  radioSelect: {
    width: 8,
    height: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.DARK,
  },
  checkSelect: {
    width: 9,
    height: 9,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },
  plusPricce: {
    color: Colors.GRAY_DARK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginRight: 10,
  },
  descriptContent: {
    flex: 1,
    paddingBottom: 10,
    alignItems: 'center',
  },
  cardDescript: {
    width: '100%',
  },
  cardQtd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  boxPrice: {
    width: '100%',
  },
  txtprice: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  price: {
    marginBottom: 5,
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  productsRelated: {
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
  },
  txtRelated: {
    fontSize: Typography.FONT_SIZE_16,
    backgroundColor: Colors.GREEN_WATER,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 6,
  },
  listOffers: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  boxImg: {
    height: 80,
    width: 80,
    borderRadius: 80,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
  },
  productImg: {
    maxWidth: '100%',
    height: 60,
    width: 60,
  },
  boxName: {
    width: '100%',
    flex: 1,
  },
  txtNameProd: {
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.DARK,
  },
  txtDescrProd: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  txtValue: {
    color: Colors.GRAY_DARK,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textDecorationLine: 'line-through',
  },
  pricePromotion: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    marginRight: 10,
  },
  footer: {
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  iconComment: {
    color: Colors.GREY,
    alignItems: 'center',
  },
  titleComment: {
    fontSize: Typography.FONT_SIZE_14,
    alignItems: 'center',
    marginLeft: 15,
    letterSpacing: 1.1,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  qtdComment: {
    fontSize: Typography.FONT_SIZE_14,
    alignItems: 'center',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginRight: 15,
  },
  textAreaContainer: {
    borderColor: Colors.grey20,
    borderWidth: 0,
    padding: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  textArea: {
    flex: 1,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    marginTop: 0,
    marginVertical: 15,
    marginRight: 10,
    marginLeft: 10,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  TitleOption: {
    color: Colors.GRAY_DARK,
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  SubTitleOption: {
    color: Colors.GRAY_MEDIUM,
    flexShrink: 1,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    paddingRight: 10,
  },
  BoxTitleOption: {
    flexShrink: 1,
  },
});

export default styles;
