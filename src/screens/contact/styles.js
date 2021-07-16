import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../styles';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    height: 90,
  },
  headerBackground: {
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    height: 60,
    alignItems: 'center',
  },
  goBack: {
    color: Colors.WHITE,
    padding: 10,
  },
  txtBackground: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.WHITE,
  },
  userContent: {
    flex: 1,
    flexDirection: 'row',
    marginTop: -30,
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  iconContent: {
    width: 60,
    height: 60,
    backgroundColor: '#99C6D9',
    borderRadius: 70,
    alignContent: 'center',
    justifyContent: 'center',
  },
  iconUser: {
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  optionCard: {
    alignContent: 'center',
    justifyContent: 'center',
    width: 100,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  iconOption: {
    color: Colors.GREY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOptionSelect: {
    color: Colors.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtOptionCard: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.GREY,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginTop: 5,
  },
  txtOptionCardSelect: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.PRIMARY,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginTop: 5,
  },
  txtOpenCalled: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginTop: 10,
    marginLeft: 20,
  },
  messageContainer: {
    flex: 1,
  },
  inputMessage: {
    flex: 3,
    //height: 250,
    borderWidth: 0.5,
    borderColor: Colors.GREY,
    margin: 20,
    borderRadius: 20,
    textAlignVertical: 'top',
    padding: 15,
  },
  btnContainer: {
    flex: 1,
    //width: '100%',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    //position: 'absolute',
    //bottom: 0,
    marginVertical: 10,
  },
});

export default styles;
