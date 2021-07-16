import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../styles/index';

const styles = StyleSheet.create({
  txtHeader: {
    marginTop: 10,
    marginBottom: 10,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 0,
  },
  IconBefore: {
    color: Colors.PRIMARY,
  },
  coupomView: {
    marginTop: 0,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 3,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: Colors.PRIMARY,
    shadowRadius: 3.84,
    backgroundColor: Colors.PRIMARY,
  },
  txtRules: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
  },
  restaurants: {
    marginTop: 10,
    marginBottom: 10,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: 124,
  },
  coupomTxtExpire: {
    marginTop: 10,
    marginBottom: 10,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
  },
  myCoupons: {
    marginTop: 10,
    marginBottom: 10,
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'center',
  },
});

export default styles;
