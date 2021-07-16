import {StyleSheet} from 'react-native';
import {Colors, Typography, Mixins} from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    letterSpacing: 1,
    marginVertical: 12,
  },
  flatStyle: {
    backgroundColor: Colors.WHITE,
  },
  content: {
    marginRight: 20,
    borderRadius: 10,
    borderColor: Colors.GREY,
    width: Mixins.normalize(125),
  },
  imageProduct: {
    width: Mixins.normalize(125),
    height: Mixins.normalize(90),
    borderRadius: 20,
  },
  titleContainer: {
    marginHorizontal: 5,
    marginBottom: 5,
  },
  titleCompany: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    letterSpacing: 1,
    fontSize: Typography.FONT_SIZE_16,
    marginTop: 5,
  },
  dicountInfo: {
    position: 'absolute',
    backgroundColor: Colors.PRIMARY_DARK,
    borderTopStartRadius: 5,
    borderBottomStartRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 10,
    right: 0,
    top: 20,
  },
  dicountInfoTxt: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.WHITE,
  },
});

export default styles;
