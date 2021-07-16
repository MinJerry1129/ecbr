import React from 'react';

import {
  Container,
  Box,
  Line,
  BoxText,
  TextHeader,
  TextBody,
  BoxButtons,
  Button,
  TextButton,
} from './Styles';

const ValidationLocation = ({ statusModal, navigation }) => {
  const close = () => {
    statusModal(false);
  };

  return (
    <Container>
      <Box>
        <Line />
        <BoxText>
          <TextHeader>
            O endereço de entrega não bate com a sua localização.
          </TextHeader>
          <TextBody>Você quer continuar mesmo assim?</TextBody>
        </BoxText>
        <BoxButtons>
          <Button
            onPress={() =>
              navigation.navigate('Customer', {
                screen: 'CustomerAddress',
              })
            }>
            <TextButton>Não</TextButton>
          </Button>
          <Button yes={true} onPress={() => close()}>
            <TextButton yes={true}>Sim</TextButton>
          </Button>
        </BoxButtons>
      </Box>
    </Container>
  );
};

export default ValidationLocation;
