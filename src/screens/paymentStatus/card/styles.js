import { StyleSheet, Platform } from 'react-native';
import { Typography, Colors } from '../../../styles';

const styles = StyleSheet.create({
  safeArea: {
    marginTop: Platform.OS === 'android' ? 25 : 40,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginLeft: 10,
  },
  headerBefore: {
    color: Colors.PRIMARY,
  },
  headerTitle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.PRIMARY,
  },
  titleContent: {
    marginRight: 20,
  },
  cardTitle: {
    backgroundColor: Colors.GREY_BACKGROUND,
    paddingVertical: 25,
    paddingLeft: 20,
    paddingRight: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleCard: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: Colors.PRIMARY,
  },
  iconTitle: {
    color: Colors.PRIMARY,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  cardItem: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 20,
    // backgroundColor: 'orange',
  },
  cardImage: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 5,
  },
  BoxShoperImg: {
    width: 70,
    height: 70,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  cardTotal: {
    width: 50,
    justifyContent: 'center',
  },
  textCardTotal: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: Colors.PRIMARY,
  },
  cardReplaceProduct: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    // marginLeft: 20,
    // paddingLeft: 75,
  },
  cardReplaceContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 20,
    // backgroundColor: 'blue',
    paddingVertical: 2,
  },
  cardReplaceTitle: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: Colors.PRIMARY,
    // marginRight: 10,
  },
  cardReplaceIcon: {
    // width: 70,
    color: Colors.PRIMARY,
    // backgroundColor: 'orange',
  },
  line: {
    borderWidth: 2,
    borderColor: Colors.GREY_BACKGROUND,
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  cardProductOld: {
    //flexDirection: 'row',
    backgroundColor: Colors.GREY_BACKGROUND,
    justifyContent: 'center',
    marginLeft: 20,
  },
  hideProduct: {
    display: 'none',
  },
  productOldIcon: {
    alignItems: 'flex-end',
    paddingHorizontal: 5,
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatCardFooter: {
    marginTop: 10,
    // marginHorizontal: 20,
    marginLeft: 20,
  },
  cardFooterTxt: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: Colors.ALERT,
  },
  footerAddColor: {
    color: Colors.PRIMARY,
  },
  cardContainerRemove: {
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  cardItemRemove: {
    flexDirection: 'row',
    width: '100%',
  },
  priceTxt: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: Colors.PRIMARY,
  },
  cardTotalRemove: {
    width: 30,
    justifyContent: 'center',
  },
});

export default styles;
