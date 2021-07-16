import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors, Typography } from '../../../styles';
Icon.loadFont();

const InputIcon = ({
  title,
  value,
  setValue,
  iconImg,
  iconClean,
  params,
  load,
}) => {
  const buildTextInput = React.createRef();

  return (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.container}>
        {load && load === true ? (
          <ActivityIndicator size="small" style={styles.acitivityIndicator} />
        ) : null}
        {value && value.length > 0 ? (
          <Icon
            name="close"
            size={22}
            style={styles.icon}
            onPress={() => iconClean()}
          />
        ) : (
            <TouchableOpacity
              onPress={() => { }}
              style={styles.iconSearchContainer}>
              <Icon name="search" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
          )}
        <TextInput
          style={styles.textInput}
          onChangeText={setValue}
          returnKeyType="search"
          value={value}
          // autoFocus={true}
          {...params}
          placeholderTextColor={Colors.DARK}
        />
      </View>
    </>
  );
};

export default InputIcon;

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  iconImg: {
    marginRight: 10,
    color: Colors.GREY,
  },
  acitivityIndicator: {
    marginRight: 10,
    color: Colors.PRIMARY,
  },
  title: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginBottom: 5,
  },
  textInput: {
    flex: 1,
    minHeight: 50,
    fontSize: Typography.FONT_SIZE_17,
    color: Colors.DARK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    backgroundColor: '#F8F8F8',
  },
});
