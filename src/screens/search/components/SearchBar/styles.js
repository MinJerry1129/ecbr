import { StyleSheet, Platform } from 'react-native';
import { Colors, Typography } from '../../../../styles';

const styles = StyleSheet.create({
  containerSearch: {
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 20,
  },
  boxSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 8 : 0,
    borderRadius: 7,
    elevation: 3,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    color: Colors.BLACK,
  },
  contentLookFor: {
    marginTop: 20,
  },
  title: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.GRAY_DARK,
  },
  containerSuggested: {
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  contentSuggested: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: Colors.GRAY_DARK,
    paddingBottom: 10,
  },
  txtSuggested: {
    marginLeft: 10,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: Colors.GRAY_DARK,
  },
  suggestedRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default styles;
