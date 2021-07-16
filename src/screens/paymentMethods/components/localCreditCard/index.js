import React from 'react';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  IconGoBack,
  HeaderText,
  Body,
  BodyHeader,
  ViewCards,
  ViewCard,
  ImageCard,
  TextCard,
  styles,
} from './Styles';

const LocalCreditCard = ({ close, typePayment, navigation }) => {
  const getCard = (card, typeCard) => {
    close(false);
    navigation.navigate('Shopping', {
      screen: 'DetailPayment',
      params: {
        typePayment: 'CARD',
        card,
        typeCard,
      },
    });
  };

  return (
    <Container>
      <Header>
        <IconGoBack onPress={() => close(false)}>
          <Icon name="navigate-before" size={50} style={styles.headerBefore} />
        </IconGoBack>
        <HeaderText>CARTÃO NO LOCAL</HeaderText>
      </Header>
      <Body>
        <BodyHeader>Débito</BodyHeader>
        <ViewCards>
          {typePayment &&
            typePayment.map(card => {
              return (
                <ViewCard onPress={() => getCard(card, 'Débito')}>
                  <ImageCard
                    source={{
                      uri: card.image[0],
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                  <TextCard>{card.name} débito</TextCard>
                </ViewCard>
              );
            })}
        </ViewCards>

        <BodyHeader>Crédito</BodyHeader>
        <ViewCards>
          {typePayment &&
            typePayment.map(card => {
              return (
                <ViewCard onPress={() => getCard(card, 'Crédito')}>
                  <ImageCard
                    source={{
                      uri: card.image[0],
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                  <TextCard>{card.name} crédito</TextCard>
                </ViewCard>
              );
            })}
        </ViewCards>
      </Body>
    </Container>
  );
};

export default LocalCreditCard;
