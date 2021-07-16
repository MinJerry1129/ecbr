import React from 'react';

import {
  Container,
  ViewGpsText,
  Text,
  ViewGpsLoader,
  ViewLootie,
} from './Styles';

import loaderAmi from '../../../../../assets/animations/loader_ami.json';

const FetchingAddress = ({ userLocalAddress, notPermissionGps }) => {
  if (userLocalAddress || userLocalAddress !== null || notPermissionGps) {
    return null;
  }

  return (
    <Container>
      <ViewGpsText>
        <Text numberOfLines={1}>Buscando endereço, aguarde!</Text>
      </ViewGpsText>
      <ViewGpsLoader>
        <ViewLootie source={loaderAmi} resizeMode="contain" loop autoPlay />
      </ViewGpsLoader>
    </Container>
  );
};

export default FetchingAddress;
