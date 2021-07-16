import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet } from 'react-native';
import { Typography, Colors } from '../../../../styles';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export default function OpeningHours(hours) {
  return (
    <View style={styles.container}>
      {hours &&
        hours.length > 0 &&
        hours.map(hour => (
          <View>
            <Text>{hour.dayWeek}</Text>
            <Text>{`${moment(hour.openingHours, 'HHmm').format(
              'HH:mm',
            )} - ${moment(hour.closingHours, 'HHmm').format('HH:mm')}`}</Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  txtAddress: {
    color: Colors.GREY,
    marginLeft: 5,
  },
});
