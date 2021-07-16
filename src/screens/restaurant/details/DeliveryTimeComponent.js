import React from 'react';
import { ScrollView } from 'react-native';
import { Text, StyleSheet, View } from 'react-native';
import { Colors, Typography } from '../../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DeliveryTimeComponent = ({ dayWeek }) => {
  const list = [
    {
      _id: '1',
      time: '12:00 - 13:00',
      price: '10,00',
    },
    {
      _id: '2',
      time: '13:00 - 14:00',
      price: '10,00',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.txtDay}>
        {dayWeek.week ? `${dayWeek.week}, ${dayWeek.day}` : ''}
      </Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {list.map((item) => (
          <View key={`${item._id}`} style={styles.list}>
            <View style={styles.divider} />
            <View style={styles.listContent}>
              <Text>{item.time}</Text>
              <Text>RS {item.price}</Text>
            </View>
            <View style={styles.divider} />
          </View>
        ))}

        <View style={styles.infoDelivery}>
          <Icon name="info" size={30} color={Colors.GREY} />
          <Text style={styles.txtInfoDelivery}>
            Os prazos de entegas podem variar dependendo do pedido
          </Text>
        </View>
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
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BLUE,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginBottom: 20,
  },
  list: {
    //flex: 8,
  },
  listContent: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  divider: {
    borderColor: Colors.GREY,
    borderWidth: 0.5,
    marginHorizontal: 20,
  },
  infoDelivery: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    position: 'absolute',
    bottom: 5,
    paddingTop: 5,
    //backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: Colors.GREY,
  },
  txtInfoDelivery: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_13,
  },
});
