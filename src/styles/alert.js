import { StyleSheet } from 'react-native';
import { Colors, Typography } from './index';

const styles = StyleSheet.create({
  alert: {
    backgroundColor: Colors.SECONDARY,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleAlert: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_15,
  },
  textAlert: {
    fontSize: Typography.FONT_SIZE_15,
  },
});

export default styles;
