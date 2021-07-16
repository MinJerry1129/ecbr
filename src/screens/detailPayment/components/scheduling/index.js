import React from 'react';

import {
  Header,
  HeaderBody,
  TextHeader,
  Image,
  Body,
  TextScheduling,
  TouchChange,
  TextChange,
  ViewText,
} from './Style';

import imgScheduling from './images/scheduling.png';
import { formatDate, hoursBase10 } from '../../../../utils';

const scheduling = ({ navigation, company, schedule, typeSchedule }) => {
  if (!schedule) {
    return null;
  }

  const scheduleScreen = () => {
    navigation.navigate('Shopping', {
      screen: 'Schedule',
      params: {
        company,
      },
    });
  };

  return (
    <>
      <Header>
        <HeaderBody>
          <TextHeader>Agendamento</TextHeader>
          <Image source={imgScheduling} />
        </HeaderBody>
      </Header>
      <Body>
        <ViewText>
          <TextScheduling>
            {typeSchedule === 'DELIVERY' ? 'Entrega' : 'Retirada no local'}
          </TextScheduling>
          <TextScheduling>
            {formatDate(schedule.deliveryDate, 'DD/MM')} -{' '}
            {formatDate(schedule.deliveryDate, 'dddd')}
            {` ${hoursBase10(schedule.startHour)} - ${hoursBase10(
              schedule.endHour,
            )}`}
          </TextScheduling>
        </ViewText>
        <TouchChange onPress={() => scheduleScreen()}>
          <TextChange>Trocar</TextChange>
        </TouchChange>
      </Body>
    </>
  );
};

export default scheduling;
