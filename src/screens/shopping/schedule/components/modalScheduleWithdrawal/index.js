import React from 'react';

import {
  Container,
  Body,
  Text,
  ViewButtons,
  Button,
  TextButton,
  ViewText,
} from './Styles';

const modalScheduleWithdrawal = ({ back, setTypeSchedule, company }) => {
  const cancel = () => {
    back(false);
    setTypeSchedule('DELIVERY');
  };

  return (
    <Container>
      <Body>
        <ViewText>
          <Text>
            Você deverá retirar seu pedido no estabelecimento: {company.name}
          </Text>
          <Text>Localizado no endereço: {company.address}.</Text>
        </ViewText>
        <ViewButtons>
          <Button continue={false} onPress={() => cancel()}>
            <TextButton continue={false}>Cancelar</TextButton>
          </Button>
          <Button continue={true} onPress={() => back(false)}>
            <TextButton continue={true}>Continuar</TextButton>
          </Button>
        </ViewButtons>
      </Body>
    </Container>
  );
};

export default modalScheduleWithdrawal;
