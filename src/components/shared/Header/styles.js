import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../styles';

const styles = StyleSheet.create({
  address: {
    marginRight: 19,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeIcon: {
    color: Colors.PRIMARY,
  },
  disabled: {
    color: Colors.GRAY_DARK,
  },
  txtAddress: {
    width: '100%',
    flexShrink: 1,
    marginRight: 5,
    textAlign: 'right',
    color: Colors.DARK,
    textTransform: 'uppercase',
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  container: {
    width: 250,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default styles;
