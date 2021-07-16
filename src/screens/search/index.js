/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Dimensions,
  Animated,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* Styles */
import styles from './styles';
import {Colors} from '../../styles';

/* Components */
import SearchBar from './components/SearchBar';
import Wish from './components/Wish';
import ListResults from './components/ListResults';

/* Services */
import {StorageGet} from '../../services/deviceStorage';
import searchCompanyProduct from '../../services/service/search/list';
import {toastShow} from '../../utils';

const Search = ({navigation, route: Route}) => {
  /* Animated */
  const widthScreen = Dimensions.get('screen').width;
  const widthAnimated = React.useRef(new Animated.Value(widthScreen)).current;
  /* cycle */
  const [address, setAddress] = useState(null);
  const [search, setSearch] = useState('arroz');
  const [companyType, setCompanyType] = useState('supermarket');
  const [listRestaurant, setListRestaurant] = useState([]);
  const [listSupermarket, setListSupermarket] = useState([]);
  const [init, setInit] = useState(true);
  const [load, setLoad] = useState(false);
  const [notResults, setNotResults] = useState(false);

  useEffect(() => {
    startAnimated(0);

    const getAddress = async () => {
      let respAddress = await StorageGet('@addressUser');
      setAddress(respAddress);
    };

    getAddress();
  }, []);

  useEffect(() => {
    if (
      Route?.params?.type &&
      (Route?.params?.type === 'restaurant' ||
        Route?.params?.type === 'supermarket')
    ) {
      setCompanyType(Route.params.type);
    }
  }, [Route?.params?.type]);

  const startAnimated = toValue => {
    Keyboard.dismiss();
    Animated.timing(widthAnimated, {
      toValue: toValue,
      useNativeDriver: false,
      duration: 600,
    }).start();
  };

  const setTxtSearch = txt => {
    setSearch(txt);
  };

  const updateCompayType = async type => {
    if (!search || search.length < 3) {
      toastShow(
        'Informe o que procura com pelo menos 3 caracteres',
        'WARN',
        3000,
      );
      return;
    }

    await getResults(type);
  };

  const sendSurvey = async () => {
    if (!search || search.length < 3) {
      toastShow(
        'Informe o que procura com pelo menos 3 caracteres',
        'WARN',
        3000,
      );
      return;
    }

    getResults(companyType);
  };

  const getResults = async type => {
    try {
      Keyboard.dismiss();
      setLoad(true);
      let respAddress = await StorageGet('@addressUser');

      if (init === true) {
        setInit(false);
      }

      setNotResults(false);

      let response = await searchCompanyProduct({
        searchText: search,
        companyType: type,
        latitude: respAddress.location.coordinates[1],
        longitude: respAddress.location.coordinates[0],
      });

      if (!response || response.length <= 0) {
        setNotResults(true);
      }
      if (response && type === 'restaurant') {
        setCompanyType(type);
        setListRestaurant(response);
      } else if (response && type === 'supermarket') {
        setCompanyType(type);
        setListSupermarket(response);
      }

      setLoad(false);
    } catch (err) {
      setLoad(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <Animated.View style={[styles.container, {right: widthAnimated}]}>
          <View style={styles.header}>
            <Icon
              name="navigate-before"
              size={40}
              color={Colors.GRAY_DARK}
              style={styles.headerIcon}
              onPress={() => navigation.goBack()}
            />
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => sendSurvey()}>
              <Text style={styles.txt}>BUSCAR</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled>
            <SearchBar setTxtSearch={setTxtSearch} sendSurvey={sendSurvey} />
            <ScrollView keyboardShouldPersistTaps="handled">
              {init === true && load === false ? <Wish /> : null}
              {listRestaurant || listSupermarket ? (
                <ListResults
                  restaurants={listRestaurant}
                  markets={listSupermarket}
                  address={address}
                  companyType={companyType}
                  updateCompayType={updateCompayType}
                  init={init}
                  load={load}
                  notResults={notResults}
                />
              ) : null}
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default Search;
