import {StyleSheet} from 'react-native';
import {Typography, Colors} from '../../../../styles';

const styles = StyleSheet.create({
  BoxCupom: {
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
  icon: {
    width: 35,
    height: 35,
    marginRight: 20,
  },
  Title: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_17,
    color: '#707070',
  },
  Description: {
    color: Colors.DARK_LIGHT,
    fontSize: Typography.FONT_SIZE_14,
  },
});

export default styles;
