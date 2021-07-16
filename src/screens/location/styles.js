import { StyleSheet } from 'react-native';
import { Typography, Colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flex: 2,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMarker: {
    flex: 1,
  },
  txtInfo: {
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
    marginTop: 20,
    color: Colors.PRIMARY,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  markerLocation: {
    color: Colors.GREY,
  },
  input: {
    flex: 1,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  divider: {
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: Colors.GREY,
    marginHorizontal: 20,
  },
  dividerLocation: {
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: Colors.GREY,
  },
  locationCurrent: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  txtCurrent: {
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.GREY,
    marginLeft: 20,
  },
  flatList: {
    marginTop: 30,
    marginHorizontal: 25,
    //backgroundColor: 'orange',
  },
  cardAddress: {
    paddingVertical: 10,
  },
  txtAddress: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.GREY,
  },
});

export default styles;
