import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Colors, Typography } from '../../../styles';

const InputText = ({ title, value, setValue, placeholder, change, params }) => {
  return (
    <View>
      <Text style={change ? styles.titleChange : styles.title}>{title}</Text>
      <TextInput
        style={change ? styles.textInputChange : styles.textInput}
        placeholder={placeholder}
        onChangeText={setValue}
        value={value}
        placeholderTextColor={Colors.DARK}
        {...params}
      />
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  title: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginBottom: 5,
  },
  titleChange: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.GREY,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: Colors.DARK,
    height: 50,
  },
  textInputChange: {
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: Colors.GREY,
    paddingHorizontal: 10,
    color: Colors.DARK,
    height: 50,
  },
});
