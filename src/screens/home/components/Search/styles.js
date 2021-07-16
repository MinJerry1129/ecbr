import { StyleSheet, Platform } from 'react-native';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  containerSearch: {
    backgroundColor: '#fff',
    marginTop: 5,
    // marginBottom: -55,
    marginRight: 19,
    zIndex: 9,
  },
  boxSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 8 : 0,
    borderRadius: 7,
    elevation: 1,
  },
  input: {
    color: Colors.black,
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});

export default styles;
