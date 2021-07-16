import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Typography } from '../../../../styles';

const styles = StyleSheet.create({
  title: {
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    letterSpacing: 1,
    marginVertical: 12,
  },
  header: {
    position: 'absolute',
    zIndex: 1,
  },
  boxTabloid: {
    flexGrow: 1,
    width: 102,
    marginRight: 10,
  },
  boxBrand: {
    width: 40,
    height: 40,
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  brand: {
    width: '100%',
    height: '100%',
  },
  ImageBackground: {
    flex: 1,
    justifyContent: 'space-between',
    width: 100,
    height: 100,
    borderRadius: 10,
    padding: 3,
    overflow: 'hidden',
  },
  ImageBackgroundProps: {
    marginTop: 20,
    marginBottom: -20,
    transform: [{ rotate: '10deg' }],
  },
  boxDistance: {
    alignItems: 'flex-end',
  },
  distance: {
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  name: {
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_12,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  modalView: {
    flex: 1,
  },
  modalList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabloidsModal: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  galleryImage: {
    position: 'relative',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: 2,
  },
});

export default styles;
