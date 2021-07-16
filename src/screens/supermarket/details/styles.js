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
  scroll: {
    flexGrow: 1,
  },
  imgBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingVertical: 25,
  },
  BoxCompany: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 65,
    height: 65,
  },
  TitleCompany: {
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
