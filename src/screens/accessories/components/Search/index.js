import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '../../../../styles';
import styles from './styles';

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const seacharView = () => {
    navigation.navigate('Search', {
      screen: 'Search',
      params: {
        type: 'restaurant',
      },
    });
  };

  return (
    <View style={styles.SearchWraper}>
      <TouchableOpacity style={styles.boxSearch} onPress={() => seacharView()}>
        <TextInput
          style={styles.SearchInput}
          placeholderTextColor={Colors.DARK}
          autoCapitalize="none"
          placeholder="Buscar produtos ou lojas"
          returnKeyType="search"
          onFocus={() => seacharView()}
          onChangeText={setSearch}
          value={search}
          pointerEvents={'none'}
        />
        <TouchableOpacity
          style={styles.SearchButton}
          onPress={() => seacharView()}>
          <Icon name="search" size={30} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
