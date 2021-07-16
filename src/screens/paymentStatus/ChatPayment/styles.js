import { StyleSheet } from 'react-native';
import { Typography, Colors } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  iconBack: {
    color: Colors.PRIMARY,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginLeft: 5,
  },
  iconPersonContainer: {
    marginBottom: 5,
    width: 55,
    height: 55,
  },
  inputCheckout: {
    flex: 1,
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.PRIMARY,
    marginBottom: 5,
    backgroundColor: Colors.PRIMARY_LIGHT,
  },
  flatStyle: {
    marginTop: 10,
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginBottom: 20,
  },
  containerMessage: {
    backgroundColor: Colors.GREY,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    marginLeft: 50,
  },
  containerMessageReceive: {
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    marginRight: 50,
  },
  sendIcon: {
    color: Colors.PRIMARY,
    marginHorizontal: 10,
  },
  textAlertContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  textAlert: {
    color: Colors.ALERT,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  loaderContent: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderChat: {
    width: 78,
    height: 98,
  },
});

export default styles;
