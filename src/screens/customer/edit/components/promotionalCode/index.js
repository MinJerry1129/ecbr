import React from 'react';
import Clipboard from '@react-native-community/clipboard';

import { toastShow } from '../../../../../utils';
import { Container, TextHeader, TextBody, TouchableOpacity } from './Styles';

const PromotionalCode = ({ sku }) => {
  if (!sku) {
    return null;
  }

  const copyToClipboard = () => {
    Clipboard.setString(sku);
    toastShow('Código copiado', 'DEFAULT', 3000);
  };

  return (
    <Container>
      <TextHeader>Código promocional</TextHeader>
      <TouchableOpacity onPress={() => copyToClipboard()}>
        <TextBody>{sku}</TextBody>
      </TouchableOpacity>
    </Container>
  );
};

export default PromotionalCode;
