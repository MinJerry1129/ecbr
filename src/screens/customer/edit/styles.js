import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    height: 80,
  },
  headerBackground: {
    backgroundColor: Colors.PRIMARY,
    height: 50,
    justifyContent: 'center',
  },
  goBack: {
    color: Colors.WHITE,
    padding: 10,
  },
  userContent: {
    //flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  iconContent: {
    width: 80,
    height: 80,
    backgroundColor: '#99C6D9',
    borderRadius: 90,
    alignContent: 'center',
    justifyContent: 'center',
  },
  iconUser: {
    width: 70,
    height: 70,
    marginLeft: 5,
  },
  content: {
    margin: 20,
  },
  contentScroll: {
    flexGrow: 1,
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Colors.GREY,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: Colors.DARK,
    height: 50,
  },
  checkContainer: {
    backgroundColor: Colors.WHITE,
    paddingLeft: 0,
    paddingBottom: 0,
    borderWidth: 0,
    marginLeft: 0,
    marginBottom: 10,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.GREY,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  checkedCircle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
  },
  viewRadio: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textGenre: {
    marginHorizontal: 5,
    marginTop: 10,
  },
  btnBlue: {
    marginTop: 30,
  },
  couponView: {
    marginTop: 0,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 3,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: Colors.GREY,
    shadowRadius: 3.84,
  },
  touch: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.GREY,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginBottom: 5,
  },
  skuContainer: {
    marginHorizontal: 10,
    borderColor: Colors.PRIMARY,
    marginBottom: 10,
    elevation: 4,
    borderRadius: 20,
  },
  skuContent: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  txtSku: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_14,
  },
});

export default styles;
