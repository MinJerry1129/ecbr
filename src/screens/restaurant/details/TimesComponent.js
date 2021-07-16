import React from 'react';
import { ScrollView } from 'react-native';
import { Text, StyleSheet, View } from 'react-native';
import { Colors, Typography } from '../../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DeliveryTimeComponent = () => {
  const list = [
    {
      _id: '1',
      weekDay: 'Segunda-feira',
      hour: '12:00 AM - 11:59 PM',
    },
    {
      _id: '2',
      weekDay: 'Segunda-feira',
      hour: '12:00 AM - 11:59 PM',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.txtDay}>Horários</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {list.map(item => (
          <View key={`${item._id}`} style={styles.list}>
            <Text>Segunda Feira: </Text>
            <Text>Segunda Feira: </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DeliveryTimeComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  txtDay: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginBottom: 20,
  },
  list: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  txt: {
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.GREY,
  },
});
