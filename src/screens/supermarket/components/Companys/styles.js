import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Typography } from '../../../../styles';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginHorizontal: 19,
    marginTop: 30,
    marginBottom: 10,
    justifyContent: 'center',
  },
  ContainerLoading: {
    flex: 1,
    marginHorizontal: 19,
    marginTop: 30,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    backgroundColor: Colors.WHITE,
    marginBottom: 10,
    borderRadius: 7,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.29,
    elevation: 3,
  },
  BoxlistView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageClosed: {
    opacity: 0.3,
  },
  textClosed: {
    position: 'absolute',
    color: Colors.PRIMARY,
    backgroundColor: Colors.WARNING,
    opacity: 0.6,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_12,
    borderRadius: 3,
    padding: 2,
    minWidth: 65,
    textAlign: 'center',
    transform: [{ rotate: '-15deg' }],
  },
  listCard: {},
  txtTitle: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.GREY,
  },
  star: {
    color: Colors.SECONDARY,
    fontSize: Typography.FONT_SIZE_14,
    marginTop: 2,
  },
  txtDistance: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY,
    marginLeft: 10,
  },
  txtInfo: {
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.GREY,
    marginTop: 2,
  },
  infoGreen: {
    color: Colors.SUCCESS,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  Flatlist: {
    paddingLeft: 19,
  },
  BoxFilter: {
    marginTop: 10,
    marginRight: 10,
    width: Dimensions.get('screen').width / 3,
    alignItems: 'center',
  },
  Slide: {
    width: '100%',
    height: 100,
  },
  imgGrey: {
    opacity: 0.3,
  },
  FilterText: {
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    marginTop: 5,
  },
  txtNotFound: {
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    textAlign: 'center',
  },
  BoxFooter: {
    backgroundColor: Colors.GRAY_LIGHT,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  TextCupom: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },
});

export default styles;
