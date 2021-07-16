import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { Colors, Typography } from '../../styles/index';

const styles = StyleSheet.create({
  safeArea: { marginTop: Platform.OS === 'android' ? 30 : 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  headerBefore: {
    color: Colors.GRAY_DARK,
  },
  headerTitle: {
    textAlign: 'center',
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.GRAY_DARK,
  },
  titleContent: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: 'orange',
  },
  IconBefore: {
    color: Colors.PRIMARY,
  },
  content: {
    flexDirection: 'column',
    // alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    // justifyContent: 'center',
  },
  icon: {
    marginTop: 24,
    marginBottom: 10,
    textAlign: 'right',
  },
  sizeIcon: {
    width: 90,
    height: 180,
  },
  txtHeader: {
    marginTop: 5,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    letterSpacing: 1.5,
    fontSize: Typography.FONT_SIZE_25,
    textAlign: 'center',
    color: Colors.GREY,
  },
  txtMiniHeader: {
    letterSpacing: 1.5,
    marginTop: 24,
    color: Colors.DARK,
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Colors.GREY,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 15,
    color: Colors.DARK,
    width: 100,
    textAlign: 'center',
  },
  button: {
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 10,
    borderColor: Colors.GREY,
    borderWidth: 0.4,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    textAlign: 'center',
    color: Colors.GREY,
  },
  buttons: {
    marginTop: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexShrink: 1,
  },
  description: {
    marginTop: 20,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.GREY,
    textAlign: 'justify',
  },
  txtTerms: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.PRIMARY,
    marginBottom: 40,
    marginTop: 20,
  },
  logoShow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  containerShow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
});

export default styles;
