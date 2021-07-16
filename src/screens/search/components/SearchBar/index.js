/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY, DARK, GREY } from '../../../../styles/colors';

const SearchBar = ({ setTxtSearch, sendSurvey }) => {
  const [search, setSearch] = useState();
  const [showRecomendation, setShowRecomendation] = useState(false);

  useEffect(() => {
    // setTxtSearch('arroz');
  }, []);

  const cleanSearch = () => {
    setSearch('');
    setTxtSearch('');
  };

  const updateValue = txt => {
    setSearch(txt);
    setTxtSearch(txt);

    if (!showRecomendation) {
      setShowRecomendation(true);
    }
  };

  return (
    <View style={styles.containerSearch}>
      <View style={styles.boxSearch}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          autoCapitalize="none"
          placeholder="Busque por loja ou item"
          placeholderTextColor={DARK}
          value={search}
          returnKeyType="search"
          onChangeText={value => updateValue(value)}
          onSubmitEditing={() => {
            sendSurvey();
            setShowRecomendation(false);
          }}
        />
        {search && search.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              cleanSearch();
              setShowRecomendation(true);
            }}>
            <Icon name="close" size={25} color={GREY} />
          </TouchableOpacity>
        ) : (
            <TouchableOpacity
              onPress={() => {
                sendSurvey();
                setShowRecomendation(false);
              }}>
              <Icon name="search" size={25} color={PRIMARY} />
            </TouchableOpacity>
          )}
      </View>
      {/* {search && search.length > 2 && showRecomendation === true ? (
        <View style={styles.containerSuggested}>
          <TouchableOpacity style={styles.contentSuggested}>
            <Icon name="search" size={22} color={GREY} />
            <Text style={styles.txtSuggested}>Nome Sugerido</Text>
            <View style={styles.suggestedRight}>
              <Icon name="navigate-next" size={25} color={GREY} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contentSuggested}>
            <Icon name="search" size={22} color={GREY} />
            <Text style={styles.txtSuggested}>Nome Sugerido</Text>
            <View style={styles.suggestedRight}>
              <Icon name="navigate-next" size={25} color={GREY} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contentSuggested}>
            <Icon name="search" size={22} color={GREY} />
            <Text style={styles.txtSuggested}>Nome Sugerido</Text>
            <View style={styles.suggestedRight}>
              <Icon name="navigate-next" size={25} color={GREY} />
            </View>
          </TouchableOpacity>
        </View>
      ) : null} */}
    </View>
  );
};

export default SearchBar;
