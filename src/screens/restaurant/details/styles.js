import { StyleSheet } from 'react-native';
import { Typography, Colors } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  background: {
    height: 100,
  },
  header: {
    flexDirection: 'row',
  },
  iconBefore: {
    color: Colors.WHITE,
  },
  logoSupermarket: {
    width: 90,
    height: 90,
    //borderRadius: 90,
  },
  logoContainer: {
    //flex: 1,
    //justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -45,
  },
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  load: {
    color: Colors.PRIMARY,
  },
  scroll: {
    flexGrow: 1,
  },
  headerInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  txtHeaderInfo: {
    textAlign: 'center',
  },
  cartBtnContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  cartBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0.5,
    paddingVertical: 10,
  },
  cartBtnBlue: {
    backgroundColor: Colors.PRIMARY,
  },
  txtcartBtnBlue: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtcartBtnWhite: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  content: {
    flex: 1,
  },
});

export default styles;
