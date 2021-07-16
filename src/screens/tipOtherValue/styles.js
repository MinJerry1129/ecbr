import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { Colors, Typography } from '../../styles/index';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  headerBefore: {
    color: Colors.PRIMARY,
  },
  headerTitle: {
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.PRIMARY,
    marginRight: 10,
  },
  titleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollView: {
    backgroundColor: Colors.WHITE,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    marginTop: 30,
  },
  IconBefore: {
    color: Colors.PRIMARY,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 60,
    marginRight: 60,
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtHeader: {
    marginTop: 30,
    marginBottom: 30,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'center',
    justifyContent: 'center',
  },
  txtRules: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginBottom: 15,
    textAlign: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Colors.GREY,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 15,
    color: Colors.BLACK,
    width: 100,
    textAlign: 'center',
  },
  viewTip: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  btnTip: {
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  txtTip: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
});

export default styles;
