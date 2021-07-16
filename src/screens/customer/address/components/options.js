import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Typography} from '../../../../styles';

const Options = ({modal, item, edit, remove}) => {
  const editAddress = () => {
    edit(item);
    modal(false);
  };

  const removeAddress = removeItem => {
    remove(removeItem);
    modal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => modal(false)}
      />
      <View style={styles.content}>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.btnEdit}
            onPress={() => editAddress()}>
            <Text style={styles.btnEditTitle}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnRemove}
            onPress={() => removeAddress(item)}>
            <Text style={styles.btnRemoveTitle}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.footerContainer} /> */}
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },
  headerContainer: {
    flex: 3,
  },
  content: {
    height: 75,
    backgroundColor: Colors.WHITE,
    borderTopWidth: 0.1,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  footerContainer: {
    flex: 1,
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnEdit: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderColor: Colors.PRIMARY_DARK,
    backgroundColor: Colors.PRIMARY_DARK,
    marginHorizontal: 10,
    elevation: 2,
  },
  btnEditTitle: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: Colors.WHITE,
  },
  btnRemove: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderColor: Colors.ALERT,
    backgroundColor: Colors.ALERT,
    marginHorizontal: 10,
    elevation: 2,
  },
  btnRemoveTitle: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: Colors.WHITE,
  },
});
