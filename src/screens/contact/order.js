import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../../styles';
import { ListItem } from 'react-native-elements';

const Order = () => {
  const list = [
    {
      _id: '01',
      name: 'Pró Brazilian',
      image:
        'https://static.wixstatic.com/media/0e495e_e82ce4e9272a40ee86e5f76e07579bd9~mv2.png/v1/fill/w_350,h_350,al_c,q_90/file.jpg',
      status: 'Em andamento',
      data: ': 06/03/2020 • 10:45',
    },
    {
      _id: '02',
      name: 'Pró Brazilian',
      image:
        'https://static.wixstatic.com/media/0e495e_e82ce4e9272a40ee86e5f76e07579bd9~mv2.png/v1/fill/w_350,h_350,al_c,q_90/file.jpg',
      status: 'Em andamento',
      data: ': 06/03/2020 • 10:45',
    },
  ];

  const renderItem = ({ item }) => (
    <ListItem
      leftAvatar={{ source: { uri: item.image } }}
      titleStyle={styles.txtTitle}
      title={item.name}
      subtitle={
        <View>
          <Text style={styles.txtStatus}>{`Status: ${item.status}`}</Text>
          <Text style={styles.txtData}>{`Pedido: ${item.data}`}</Text>
        </View>
      }
      rightElement={
        <TouchableOpacity>
          <Text style={styles.txtHelp}>Ajuda ?</Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        style={styles.flatStyle}
        data={list}
        keyExtractor={item => `${item._id}`}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListFooterComponent={() => <View style={styles.divider} />}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  txtHelp: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.PRIMARY,
  },
  txtTitle: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtStatus: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.GREY,
  },
  txtData: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.GREY,
  },
});
