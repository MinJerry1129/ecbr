import {StyleSheet} from 'react-native';
import {Colors, Typography} from '../../../../styles';

const confirmStyles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 0.5,
    borderColor: Colors.GREY,
    marginHorizontal: 20,
    paddingVertical: 10,
    minHeight: 50,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.PRIMARY,
  },
  textInputAlert: {
    borderBottomWidth: 0.5,
    borderColor: Colors.GREY,
    marginHorizontal: 20,
    paddingVertical: 10,
    minHeight: 50,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.ALERT,
  },
  placeholderColorError: {
    color: Colors.ALERT,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputFlex: {
    flex: 1,
    minHeight: 50,
    color: Colors.DARK,
    // marginTop: 5,
  },
  favoriteOption: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: Colors.GREY,
    borderRadius: 20,
    flex: 1,
    paddingVertical: 5,
  },
  optionContainerSelect: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.BACKGROUND,
  },
  ml10: {
    marginLeft: 10,
  },
  mr10: {
    marginRight: 10,
  },
  txtOption: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.GREY,
    marginLeft: 10,
  },
  titleFavorite: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.GREY,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  colorWhite: {
    color: Colors.WHITE,
  },
  colorGrey: {
    color: Colors.GREY,
  },
  viewMsgError: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  msg: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.WHITE,
  },
  msgError: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },
  txtError: {
    // marginLeft: 10,
    color: Colors.ALERT,
  },
});

export default confirmStyles;
