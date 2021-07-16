import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 20,
  },
  contentText: {
    marginVertical: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.GREY,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    marginVertical: 15,
    color: Colors.DARK_LIGHT,
    textAlign: 'center',
  },
});

export default styles;
