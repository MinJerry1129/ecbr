import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  msgContainer: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 4,
    padding: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  txtMsg: {
    color: Colors.WHITE,
  },
  locationCurrent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
  },
  imageMap: {
    elevation: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  locationCurrentText: {
    fontSize: Typography.FONT_SIZE_18,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
  },
  flatStyle: {
    flexGrow: 3,
    marginTop: 20,
    backgroundColor: '#F8F8F8',
  },
  labelSearchAddress: {
    marginBottom: 0,
    marginTop: 10,
    color: Colors.PRIMARY_DARK,
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_14,
  },
  cardAddress: {
    backgroundColor: Colors.WHITE,
  },
  cardAddressActive: {
    backgroundColor: Colors.PRIMARY,
  },
  boxCard: {
    // paddingVertical: 5,
    backgroundColor: '#F8F8F8',
    borderBottomColor: Colors.GRAY_LIGHT,
    borderBottomWidth: 0.3,
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContent: {
    margin: 20,
  },
  txtAddressSearch: {
    fontSize: Typography.FONT_SIZE_17,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.GRAY_DARK,
    paddingHorizontal: 5,
  },
  textBase: {
    flex: 1,
    fontSize: Typography.FONT_SIZE_17,
    paddingHorizontal: 5,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtComplement: {
    flex: 1,
    fontSize: Typography.FONT_SIZE_16,
    paddingHorizontal: 5,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.GREY_LIGHT,
    marginTop: 5,
  },
  txtAddress: {
    color: Colors.GRAY_DARK,
  },
  txtAddressActive: {
    color: Colors.WHITE,
  },
  searchContainer: {
    borderRadius: 23,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    elevation: 2,
  },
  placeHolderAddress: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.BLACK,
  },
  iconImg: {
    marginRight: 10,
    color: Colors.PRIMARY,
  },
  textInput: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_17,
    color: Colors.PRIMARY,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  atualLocationBox: {
    flexShrink: 1,
    // flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 35,
  },
  atualLocationText: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_15,
  },
  atualAddressText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_13,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSearch: {
    marginLeft: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtHeader: {
    flexGrow: 1,
    textAlign: 'center',
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginRight: 30,
  },
  notFound: {
    flex: 1,
    margin: 20,
  },
  notFoundTxt: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
    letterSpacing: 1,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.GREY,
  },
  lotieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerGps: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    // justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    padding: 10,
    elevation: 1,
  },
  containerTextLocationCurrent: {
    marginLeft: 2,
  },
  contentGps: {
    flexGrow: 1,
    minHeight: 50,
    flexDirection: 'column',
    // backgroundColor: 'orange',
  },
  containerGpsIcon: {
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 5,
  },
  contentGpsSearchLoad: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 15,
    // justifyContent: 'space-around',
  },
  containerGpsText: {
    flex: 1,
  },
  containerGpsLoader: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
});

export default styles;
