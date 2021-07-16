import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const InputDateTime = ({ title, value, setValue, params }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={new Date(value)}
        onChange={(_, d) => {
          setShowDatePicker(false);
          if (d) {
            setValue(d);
          }
        }}
        mode="date"
      />
    );

    const dateString = moment(value)
      .utc()
      .format('DD/MM/YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {getDatePicker()}
    </View>
  );
};

export default InputDateTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    borderWidth: 0.5,
    paddingVertical: 15,
    paddingLeft: 5,
    borderRadius: 10,
  },
  title: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Colors.GREY,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
