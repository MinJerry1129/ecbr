import React, { useState, useEffect } from 'react';

import {
  Header,
  HeaderBody,
  TextHeader,
  Image,
  Body,
  TextBody,
  ScrollView,
  RowTip,
  ViewTip,
  TouchTip,
  TextTip,
} from './Style';

import imgTip from './images/tip.png';
import { listTips } from '../../../../services/service/tip';

const tip = ({ tipSelected, setTipSelected, navigation, tipValue }) => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const getTips = async () => {
      let result = await listTips({
        status: true,
        type: 'system',
      });

      if (result && result.length > 0) {
        let tipsValue = [];

        result.map(tip => tipsValue.push(tip.value));
        setTips(tipsValue);
        setTipSelected(tipsValue[1]);
      }

      if (tipValue) {
        setTipSelected(tipValue);
      }
    };

    getTips();
  }, [setTipSelected, tipValue]);

  return (
    <>
      <Header>
        <HeaderBody>
          <TextHeader>Gorjeta</TextHeader>
          <Image source={imgTip} />
        </HeaderBody>
        <TextBody>
          Doe um gorjeta ao entregador que enfrenta o transito para te atender
          sempre da melhor forma
        </TextBody>
      </Header>
      <Body>
        <ScrollView horizontal={true}>
          <RowTip>
            {tips.map(t => {
              return (
                <ViewTip>
                  <TouchTip
                    selected={t === tipSelected}
                    onPress={() => setTipSelected(t)}>
                    <TextTip selected={t === tipSelected}>{t}</TextTip>
                  </TouchTip>
                </ViewTip>
              );
            })}
            <TouchTip
              selected={!tips.includes(parseInt(tipSelected, 10))}
              otherValue={true}
              onPress={() =>
                navigation.navigate('Shopping', {
                  screen: 'TipOtherValue',
                })
              }>
              <TextTip
                otherValue={true}
                selected={!tips.includes(parseInt(tipSelected, 10))}>
                Outro Valor
              </TextTip>
            </TouchTip>
          </RowTip>
        </ScrollView>
      </Body>
    </>
  );
};

export default tip;
