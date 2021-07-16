import {StyleSheet} from 'react-native';
import {Colors, Typography} from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.GREY_BACKGROUND,
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: Colors.PRIMARY,
    marginBottom: 22,
    marginRight: 19,
    elevation: 3,
  },
  iconCartContainer: {
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  iconMessage: {
    width: 35,
    height: 35,
    // marginRight: 10,
    paddingLeft: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCart: {
    color: Colors.PRIMARY,
  },
  contentTxtActive: {
    flex: 1,
  },
  txtActive: {
    flex: 1,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_17,
    color: Colors.GREY,
  },
  orderContainer: {
    // backgroundColor: Colors.PRIMARY,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderTopEndRadius: 10,
    // borderBottomRightRadius: 10,
    paddingHorizontal: 10,
  },
  txtOrder: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  messageIcon: {
    color: Colors.WHITE,
  },
  contentLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
