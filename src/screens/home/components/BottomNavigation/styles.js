import {StyleSheet} from 'react-native';
import {Colors, Typography} from '../../../../styles/index';

const styles = StyleSheet.create({
  BoxNavigation: {
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  BoxScreens: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  Icon: {
    width: 22,
    height: 21,
    marginBottom: 6,
  },
  Text: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_12,
    textAlign: 'center',
  },
});

export default styles;
