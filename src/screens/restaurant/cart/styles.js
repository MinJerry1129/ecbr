import { StyleSheet, Platform } from 'react-native';
import { Typography, Colors } from '../../../styles';

const styles = StyleSheet.create({
  safeArea: {
    marginTop: Platform.OS === 'android' ? 10 : 40,
    flex: 1,
    marginBottom: 20,
  },
  scrooContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
  },
  txtHeader: {
    flex: 1,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'center',
  },
  txtTitle: {
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginTop: 10,
    marginLeft: 20,
  },
  priceContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: Colors.GREY,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  containerProduct: {
    flex: 8,
  },
  list: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  imageProduct: {
    width: 80,
    height: 80,
  },
  boxComple: {
    marginRight: 10,
    flex: 5,
  },
  txtNameProdAlone: {
    marginRight: 15,
    fontSize: Typography.FONT_SIZE_14,
    color: '#555555',
    marginLeft: 5,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    // flex: 5,
  },
  txtNameProd: {
    marginBottom: 5,
    // marginLeft: 5,
    fontSize: Typography.FONT_SIZE_14,
    color: '#555555',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  titleComplement: {
    color: Colors.PRIMARY,
    //marginLeft: 5,
  },
  txtPrice: {
    marginLeft: 2,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  txtOld: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textDecorationLine: 'line-through',
  },
  options: {
    flex: 1,
    fontSize: Typography.FONT_SIZE_18,
    color: '#555555',
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'right',
  },
  contentAddProd: {
    //flex: 1,
    //backgroundColor: 'orange',
  },
  txtAddProd: {
    marginTop: 10,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  subTotal: {
    marginHorizontal: 20,
    marginBottom: 70,
  },
  checkout: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.WHITE,
    marginBottom: 10,
  },
  btContainer: {
    width: '90%',
  },
  btnDisable: {
    backgroundColor: Colors.GREY,
    textAlign: 'center',
    width: '90%',
  },
  btnCheckout: {
    textAlign: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCheckout: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  listSub: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  alertText: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  subTitle: {
    flex: 2,
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.GREY,
  },
  subPrice: {
    flex: 1,
    textAlign: 'right',
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  txtBold: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  iconOptionsContainer: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 3,
  },
  iconOptions: {
    color: Colors.PRIMARY,
  },
  couponView: {
    marginTop: 0,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 3,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: Colors.GREY,
    shadowRadius: 3.84,
  },
  couponTextprice: {
    fontSize: Typography.FONT_SIZE_17,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 80,
  },
  couponTxtExpire: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.GREY,
    marginTop: -10,
    marginBottom: 15,
    marginHorizontal: 80,
  },
  flatRight: {
    marginHorizontal: 80,
    justifyContent: 'center',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  couponAdd: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY,
  },
  contentMessage: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  txtMessageInfo: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.WHITE,
  },
  backgroundAlert: {
    backgroundColor: Colors.ALERT,
  },
});

export default styles;
