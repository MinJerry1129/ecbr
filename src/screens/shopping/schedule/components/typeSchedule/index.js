import React from 'react';

import {
  Header,
  TextHeader,
  TouchBody,
  TextBody,
  Line,
  RadioButton,
  ViewTextBody,
  ViewWithdrawalText,
} from './Styles';
import { formatMoney } from '../../../../../utils';

const TypeSchedule = ({
  typeSchedule,
  setTypeSchedule,
  deliveryPrice,
  setModal,
  withdrawMarket,
  outsideCoverageArea,
}) => {
  if (!withdrawMarket) {
    return null;
  }

  const selectedWithdrawal = () => {
    if (typeSchedule === 'WITHDRAWAL') {
      return;
    }

    setModal(true);
    setTypeSchedule('WITHDRAWAL');
  };

  return (
    <>
      <Header>
        <TextHeader>Delivery ou retirada?</TextHeader>
      </Header>
      <TouchBody onPress={() => selectedWithdrawal()}>
        <ViewTextBody>
          <ViewWithdrawalText outsideCoverageArea={outsideCoverageArea}>
            <TextBody>Agendar retirada - </TextBody>
            <TextBody free={true}>Grátis</TextBody>
          </ViewWithdrawalText>
          {outsideCoverageArea && (
            <TextBody>
              Você esta fora da área de entrega desse estabelecimento,
              disponível somente opção para retirar no local.
            </TextBody>
          )}
        </ViewTextBody>
        <RadioButton selected={typeSchedule === 'WITHDRAWAL'} />
      </TouchBody>
      <Line />
      {!outsideCoverageArea && (
        <TouchBody onPress={() => setTypeSchedule('DELIVERY')}>
          <ViewTextBody>
            <TextBody>
              Agendar entrega - Frete {formatMoney(deliveryPrice)}
            </TextBody>
          </ViewTextBody>
          <RadioButton selected={typeSchedule === 'DELIVERY'} />
        </TouchBody>
      )}
    </>
  );
};

export default TypeSchedule;
