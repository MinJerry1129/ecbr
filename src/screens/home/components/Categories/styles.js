import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../../styles/index';

const styles = StyleSheet.create({
  boxCategories: {
    width: '30%',
    marginRight: 8,
  },
  image: {
    width: '100%',
    height: 70,
    marginBottom: 7,
    borderRadius: 7,
  },
  text: {
    textAlign: 'center',
    color: Colors.GRAY_DARK,
    fontSize: Typography.FONT_SIZE_12,
  },
});

export default styles;
