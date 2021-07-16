import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  BoxInfo: {
    flex: 1,
    // padding: 19,
  },
  title: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    marginVertical: 20,
  },
  titleLocation: {
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
    marginBottom: 15,
  },
  BoxSubTitleLocation: {
    alignItems: 'center',
  },
  SubTitleLocation: {
    borderColor: Colors.GRAY_MEDIUM,
    fontFamily: Typography.FONT_FAMILY_LIGHT,
  },
  BoxFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  loader: {
    justifyContent: 'center',
  },
});

export default styles;
