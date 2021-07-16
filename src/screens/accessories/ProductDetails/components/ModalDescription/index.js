import React from 'react';
import { Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import {
  styles,
  Container,
  ScrollView,
  TouchableOpacity,
  ItemName,
} from './Styles';

const ModalDescription = ({ goBack, product }) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => goBack(false)}>
        <Icon name="keyboard-arrow-down" size={50} style={styles.icon} />
      </TouchableOpacity>
      <ItemName>{product.name}</ItemName>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HTML
          html={product.description}
          imagesMaxWidth={Dimensions.get('window').width}
        />
      </ScrollView>
    </Container>
  );
};

export default ModalDescription;
