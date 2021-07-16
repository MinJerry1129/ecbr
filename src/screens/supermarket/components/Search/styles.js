import { StyleSheet, Platform } from 'react-native';
import { Colors, Typography } from '../../../../styles';

const styles = StyleSheet.create({
  SearchWraper: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 7,
    elevation: 1,
  },
  SearchInput: {
    flex: 1,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.PRIMARY_DARK,
  },
  SearchButton: {
    justifyContent: 'center',
  },

  boxSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
