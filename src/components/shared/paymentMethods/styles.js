import { StyleSheet } from 'react-native';
import { Typography, Colors } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    elevation: 2,
  },
  txtTitle: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.ALERT,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    margin: 10,
    marginVertical: 20,
  },
  cardItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderTopWidth: 0.4,
    marginHorizontal: 10,
  },
  txtCartItem: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.BLACK,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginLeft: 10,
  },
  iconContainerNext: {
    flex: 1,
    alignItems: 'flex-end',
  },
  carItemNext: {
    //justifyContent: 'flex-end',
  },
});

export default styles;
