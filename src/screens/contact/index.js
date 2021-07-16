import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  YellowBox,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import Message from './message';
import AllCalled from './allCalled';
import Order from './order';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const Contact = ({navigation}) => {
  const [pageType, setPageType] = useState('message');
  const iconUser = require('../../assets/images/contact.png');

  const goBack = () => {
    navigation.navigate('Home', {screen: 'Home'});
  };

  const changePage = type => {
    setPageType(type);

    switch (type) {
      case 'message':
        //
        break;
      case 'called':
        //
        break;
      case 'order':
        //
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBackground}>
            <TouchableOpacity onPress={() => goBack()}>
              <Icon
                name="keyboard-arrow-left"
                size={45}
                style={styles.goBack}
              />
            </TouchableOpacity>
            <Text style={styles.txtBackground}>Como posso ajudar ?</Text>
          </View>
          <View style={styles.userContent}>
            <View style={styles.iconContent}>
              <Image
                source={iconUser}
                style={styles.iconUser}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => changePage('message')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconContainerCircle}>
                <Icon
                  name="insert-chart"
                  size={45}
                  style={
                    pageType === 'message'
                      ? styles.iconOptionSelect
                      : styles.iconOption
                  }
                />
              </View>
            </View>
            <Text
              style={
                pageType === 'message'
                  ? styles.txtOptionCardSelect
                  : styles.txtOptionCard
              }>
              Nova Chamada
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => changePage('called')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconContainerCircle}>
                <Icon
                  name="subject"
                  size={45}
                  style={
                    pageType === 'called'
                      ? styles.iconOptionSelect
                      : styles.iconOption
                  }
                />
              </View>
            </View>
            <Text
              style={
                pageType === 'called'
                  ? styles.txtOptionCardSelect
                  : styles.txtOptionCard
              }>
              Todas as chamadas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => changePage('order')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconContainerCircle}>
                <Icon
                  name="shopping-cart"
                  size={45}
                  style={
                    pageType === 'order'
                      ? styles.iconOptionSelect
                      : styles.iconOption
                  }
                />
              </View>
            </View>
            <Text
              style={
                pageType === 'order'
                  ? styles.txtOptionCardSelect
                  : styles.txtOptionCard
              }>
              Meus Pedidos
            </Text>
          </TouchableOpacity>
        </View>

        {pageType === 'message' ? <Message /> : null}

        {pageType === 'called' ? <AllCalled /> : null}

        {pageType === 'order' ? <Order /> : null}
      </View>
    </ScrollView>
  );
};

export default Contact;
