import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../styles';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
  },
  title: {
    marginTop: 20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_22,
    textAlign: 'center',
    color: Colors.BLACK,
  },
  icon: {
    alignItems: 'center',
    marginVertical: 40,
  },
  titlePermition: {
    marginTop: 20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_22,
    textAlign: 'center',
    color: Colors.BLACK,
  },
  descricao: {
    marginTop: 20,
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.GREY,
    textAlign: 'center',
    marginLeft: '10%',
    width: '80%',
  },
  containerShow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  logoShow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  BoxFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.GRAY_MEDIUM,
    flexShrink: 1,
    marginHorizontal: 10,
    marginBottom: 19,
    borderRadius: 7,
    paddingVertical: 12,
    backgroundColor: Colors.WHITE,
  },
  btnPrimary: {
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },
  btnText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY,
  },
  btnTextPrimary: {
    color: Colors.WHITE,
  },
});

export default styles;
