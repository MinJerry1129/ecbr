import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, Typography } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    justifyContent: 'center',
  },
  keyboardBox: {
    flex: 1,
  },
  jump: {
    alignItems: 'flex-end',
  },
  jumpText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_13,
  },
  BoxAnimated: {
    flex: 1,
    flexDirection: 'row',
  },
  boxRegister: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  containerData: {
    height: Dimensions.get('screen').height - 150,
    justifyContent: 'space-between',
  },
  boxTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Title: {
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    color: Colors.GRAY_DARK,
    fontSize: Typography.FONT_SIZE_22,
    marginHorizontal: 20,
    marginTop: 15,
    lineHeight: 28,
  },
  TitleMain: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  textInput: {
    fontSize: Typography.FONT_SIZE_22,
    color: Colors.BLACK,
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    textTransform: 'capitalize',
    height: 80,
  },
  btn: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
  },
  boxSave: {
    borderColor: Colors.PRIMARY,
  },
  boxSaveDisable: {
    borderColor: Colors.GRAY_DARK,
  },
  boxSaveText: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    alignSelf: 'center',
  },
  boxSaveTextActive: {
    color: Colors.PRIMARY,
  },
  boxSaveTextDisable: {
    color: Colors.GRAY_DARK,
  },
  boxPhone: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    paddingHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  brazilPhone: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ececec',
  },
  phoneTag: {
    fontSize: Typography.FONT_SIZE_22,
    color: '#999a99',
    marginLeft: 7,
    marginRight: 12,
  },
  inputPhone: {
    color: Colors.BLACK,
    flex: 1,
    fontSize: Typography.FONT_SIZE_22,
    marginLeft: 8,
  },
});

export default styles;
