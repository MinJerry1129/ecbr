import { StyleSheet } from 'react-native';
import { Typography, Colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  companyTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  typeContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.DARK_LIGHT,
    elevation: 2,
  },
  typeContainerActive: {
    borderColor: Colors.PRIMARY,
  },
  ml: {
    marginLeft: 10,
  },
  mr: {
    marginRight: 10,
  },
  titleType: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_LIGHT,
  },
  titleTypeActive: {
    color: Colors.PRIMARY,
  },
  containerResult: {
    marginTop: 15,
    flex: 1,
  },
  flatStyle: {
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
