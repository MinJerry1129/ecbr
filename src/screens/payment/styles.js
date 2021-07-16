import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../styles';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    flex: 1,
    margin: 20,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginRight: 10,
  },
  iconGoBack: {
    color: Colors.PRIMARY,
  },
  txtHeader: {
    textAlign: 'center',
    flex: 1,
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtInfo: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  listCard: {
    alignItems: 'center',
    marginTop: 10,
  },
  formCard: {
    flex: 1,
    marginTop: 20,
    //backgroundColor: 'orange',
  },
  textInput: {
    borderBottomWidth: 0.7,
    borderColor: Colors.GREY,
    color: Colors.DARK,
    marginBottom: 20,
  },
  formText: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  listDivider: {
    flexDirection: 'row',
  },
  contentDivider: {
    flex: 1,
    marginBottom: 20,
  },
  mr10: {
    marginRight: 10,
  },
  ml10: {
    marginLeft: 10,
  },
  footer: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    alignItems: 'center',
    borderRadius: 50,
  },
  footerBtnTxt: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
});

export default style;
