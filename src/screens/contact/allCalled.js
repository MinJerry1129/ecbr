import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors, Typography } from '../../styles';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AllCalled = () => {
  // P - F - A
  const [status, setStatus] = useState('P');

  const changeStatus = (type) => {
    setStatus(type);
  };

  const list = [
    {
      _id: '01',
      title: 'Problema na Compra',
      status: 'Em Andamento',
      data: '23/03/2020 * 08:25',
    },
    {
      _id: '02',
      title: 'Problema na Compra',
      status: 'Em Andamento',
      data: '23/03/2020 * 08:25',
    },
    {
      _id: '03',
      title: 'Problema na Compra',
      status: 'Em Andamento',
      data: '23/03/2020 * 08:25',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Button
          icon={
            status === 'P' ? (
              <Icon name="check-circle" size={15} color={Colors.WHITE} />
            ) : null
          }
          title=" Atendido"
          onPress={() => changeStatus('P')}
        />

        <Button
          icon={
            status === 'F' ? (
              <Icon name="check-circle" size={15} color={Colors.WHITE} />
            ) : null
          }
          title=" Finalizada"
          onPress={() => changeStatus('F')}
        />

        <Button
          icon={
            status === 'A' ? (
              <Icon name="check-circle" size={15} color={Colors.WHITE} />
            ) : null
          }
          title=" Em andamento"
          onPress={() => changeStatus('A')}
        />
      </View>

      <FlatList
        scrollEnabled={false}
        style={styles.flatStyle}
        data={list}
        keyExtractor={(item) => `${item._id}`}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListFooterComponent={() => <View style={styles.divider} />}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.txtTitle}>{item.title}</Text>
            <Text style={styles.txtStatus}>{`Status: ${item.status}`}</Text>
            <Text style={styles.txtData}>{`Chamada em ${item.data}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AllCalled;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'orange',
    marginTop: 20,
    marginHorizontal: 20,
  },
  flatStyle: {
    flex: 1,
  },
  divider: {
    borderColor: Colors.GREY,
    marginVertical: 10,
    borderWidth: 0.5,
  },
  filterContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
