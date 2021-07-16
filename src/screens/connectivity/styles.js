import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 60,
  },
  title: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginBottom: 5,
  },
  description: {
    color: Colors.GRAY_DARK,
    fontSize: Typography.FONT_SIZE_15,
    marginBottom: 5,
  },
  link: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginTop: 45,
  },
});
