import {StyleSheet, Platform, StatusBar} from 'react-native';
import {Colors, Typography} from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
    // paddingHorizontal: 20,
    paddingLeft: 20,
  },
  header: {
    marginLeft: -5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    paddingRight: 5,
    paddingVertical: 5,
  },
  headerSearch: {
    backgroundColor: 'orange',
    flex: 1,
  },
  txtClick: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.PRIMARY,
  },
  scrollContainer: {
    flex: 1,
  },
  headerBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  txt: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.PRIMARY,
    textAlign: 'center',
    marginRight: 20,
  },
});

export default styles;
