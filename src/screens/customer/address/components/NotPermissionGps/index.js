import React from 'react';

import { Container, Text } from './Styles';

const NotPermissionGps = ({ notPermissionGps }) => {
  if (!notPermissionGps) {
    return null;
  }

  return (
    <Container>
      <Text>Clique aqui!</Text>
    </Container>
  );
};

export default NotPermissionGps;
