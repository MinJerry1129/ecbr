import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 80,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  title: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_20,
    marginTop: 10,
    marginBottom: 10,
  },
  subTitle: {
    color: Colors.DARK,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

export default styles;
