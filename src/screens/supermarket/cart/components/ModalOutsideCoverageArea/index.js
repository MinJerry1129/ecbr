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

const ModalOutsideCoverageArea = ({ statusModal, close, withdrawOnSite }) => {
  return (
    <Container>
      <Box>
        <Line />
        <BoxText>
          <TextHeader>Você está um pouco longe...</TextHeader>
          <TextBody>
            Seu endereço está fora da área de entrega desse estabelecimento.
          </TextBody>
          {withdrawOnSite && (
            <TextBody>Deseja buscar seu pedido no local?</TextBody>
          )}
        </BoxText>
        <BoxButtons>
          <Button onPress={() => close()}>
            <TextButton>Voltar</TextButton>
          </Button>
          <Button yes={true} onPress={() => statusModal(false)}>
            <TextButton yes={true}>
              {withdrawOnSite ? 'Sim' : 'Tudo bem'}
            </TextButton>
          </Button>
        </BoxButtons>
      </Box>
    </Container>
  );
};

export default ModalOutsideCoverageArea;
