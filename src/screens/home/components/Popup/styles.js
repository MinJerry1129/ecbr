import { StyleSheet } from 'react-native';
import { Typography, Colors } from '../../../../styles';

const styles = StyleSheet.create({
  Modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_MODAL,
  },
  BoxModal: {
    backgroundColor: Colors.WHITE,
    width: '90%',
    height: '90%',
    padding: 10,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
  },
  BoxModalContent: {
    flex: 1,
  },
  Button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    padding: 15,
  },
  ButtonText: {
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'center',
  },
});

export default styles;
