import React from 'react';

import {
  Body,
  Image,
  Header,
  HeaderBody,
  TextHeader,
  TextAddress,
  TextComplement,
  TextAddressType,
} from './Style';

import imgAddress from './images/address.png';

const address = ({ delivery, navigation }) => {
  if (!delivery) {
    return null;
  }

  return (
    <>
      <Header>
        <HeaderBody>
          <TextHeader>Local de entrega</TextHeader>
          <Image source={imgAddress} />
        </HeaderBody>
      </Header>
      <Body>
        <TextAddressType>Casa</TextAddressType>
        <TextAddress>{delivery.address ? delivery.address : ''}</TextAddress>
        <TextComplement>
          {delivery.complement ? delivery.complement : ''}
        </TextComplement>
      </Body>
    </>
  );
};

export default address;
