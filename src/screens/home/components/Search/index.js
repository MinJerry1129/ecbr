import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { toastShow } from '../../../../utils';
import { PRIMARY, DARK } from '../../../../styles/colors';
import styles from './styles';

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const getTextandSendSearch = () => {
    navigation.navigate('Search', {
      screen: 'Search',
      params: {
        textSearch: search,
      },
    });
  };

  const seacharView = () => {
    navigation.navigate('Search', {
      screen: 'Search',
      params: {},
    });
  };

  return (
    <View style={styles.containerSearch}>
      <TouchableOpacity style={styles.boxSearch} onPress={() => seacharView()}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Busque por loja ou item"
          placeholderTextColor={DARK}
          value={search}
          returnKeyType="search"
          onChangeText={setSearch}
          onSubmitEditing={() => getTextandSendSearch()}
          pointerEvents={'none'}
          onFocus={() => seacharView()}
        />
        <TouchableOpacity onPress={() => getTextandSendSearch()}>
          <Icon name="search" size={30} color={PRIMARY} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
