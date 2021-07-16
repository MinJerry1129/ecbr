import React from 'react';

import { Container, Text } from './Styles';

const Address = ({ userLocalAddress, notPermissionGps }) => {
  if (notPermissionGps || (!userLocalAddress || userLocalAddress === null)) {
    return null;
  }

  return (
    <Container>
      <Text numberOfLines={1}>
        {userLocalAddress?.addressRoute +
          ' ' +
          userLocalAddress?.streetNumber || ''}
      </Text>
    </Container>
  );
};

export default Address;
