import React from 'react';

import { Container, Header, TextHeader, Image } from './Styles';

const ItensCart = () => {
  const icon = require('./images/itensCart.png');

  return (
    <Container>
      <Header>
        <TextHeader>Itens do carrinho</TextHeader>
        <Image source={icon} resizeMode="contain" />
      </Header>
    </Container>
  );
};

export default ItensCart;
