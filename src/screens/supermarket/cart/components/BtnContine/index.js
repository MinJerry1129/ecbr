import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  Container,
  Button,
  Text,
  ViewTotalsHorizontal,
  TextTotal,
} from './Styles';

import { toastShow, formatMoney } from '../../../../../utils';
import { createLog } from '../../../../../services/service/Log';
import { isAuthenticated } from '../../../../../services/userAuth';
import { StorageGet } from '../../../../../services/deviceStorage';
import LocationCurrent from '../../../../../services/location/locationCurrent';
import { distanceLatLonInKm } from '../../../../../services/maps/distanceCoordinate';
import { seacrhDeliveryAddress } from '../../../../../services/service/delivery/address';

const BtnContinue = ({
  cart,
  close,
  total,
  coupon,
  company,
  subTotal,
  navigation,
  setModalClean,
  setWithdrawOnSite,
  setModalOutsideCoverageArea,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [outsideCoverageArea, setOutsideCoverageArea] = useState(false);

  const getCoordinates = async () => {
    const result = await LocationCurrent().getLocation();
    if (result) {
      return result;
    }

    return null;
  };

  useFocusEffect(
    useCallback(() => {
      const validationAreaLocation = async () => {
        if (outsideCoverageArea || !company) {
          return;
        }

        const coordinatesLocal = await getCoordinates();

        if (coordinatesLocal) {
          let respAddress = await StorageGet('@addressUser');

          if (!respAddress) {
            const response = await isAuthenticated();
            respAddress = await seacrhDeliveryAddress({
              customer: response.user._id,
              main: true,
            });

            if (!respAddress || respAddress.length === 0) {
              navigation.navigate('Customer', {
                screen: 'CustomerAddress',
              });
            }
          }

          const distKm = distanceLatLonInKm(
            {
              latitude: respAddress.location.coordinates[0],
              longitude: respAddress.location.coordinates[1],
            },
            {
              latitude: company.location.coordinates[0],
              longitude: company.location.coordinates[1],
            },
          );

          if (!distKm) {
            setIsValid(false);
            createLog({
              typeSystem: 'MOBILE',
              typeLog: 'ERROR',
              description:
                'Erro ao encontrar a distância do endereço do usuário para o estabelecimento',
              category: 'CartUser',
              originError: 'Button Continue Validation',
            });
          }

          let number = distKm.toFixed(2);

          if (
            number > 1 &&
            parseInt(distKm, 10) > company?.companyDelivery?.max_distance / 1000
          ) {
            setOutsideCoverageArea(true);
            setModalOutsideCoverageArea(true);
            if (!company?.companyDelivery?.withdrawMarket) {
              setIsValid(false);
            } else {
              setWithdrawOnSite(true);
            }
          }
        }
      };

      const isValidCart = () => {
        try {
          if (!company || !company?._id) {
            return;
          }

          let min = company?.companyDelivery?.min_purchase ?? 0;
          let max = company?.companyDelivery?.max_amount_items ?? 0;

          if (!company) {
            setIsValid(false);
            return;
          }

          if (min === 0) {
            setIsValid(true);
            return;
          }

          if (subTotal < min) {
            setIsValid(false);
            toastShow(
              `Faltam ${formatMoney(
                min - subTotal,
              )} para completar o pedido mínimo`,
              'ALERT',
            );
            return;
          }

          let qtdMax = cart.reduce((t, el) => {
            if (el.amount) {
              t += el.amount;
            }
            return t;
          }, 0);

          if (max && qtdMax > max) {
            setIsValid(false);
            toastShow(`Permitido até  ${max} itens`, 'WARN');
            return;
          }

          if (
            outsideCoverageArea &&
            !company?.companyDelivery?.withdrawMarket
          ) {
            setIsValid(false);
            return;
          }

          setIsValid(true);
        } catch (err) {
          setIsValid(false);
        }
      };

      isValidCart();
      validationAreaLocation();
    }, [
      cart,
      company,
      navigation,
      outsideCoverageArea,
      setModalOutsideCoverageArea,
      setWithdrawOnSite,
      subTotal,
    ]),
  );

  const shoppingSchedule = () => {
    if (company && company?.companyDelivery?.isOpen === false) {
      toastShow('O estabelecimento esta fechado no momento.', 'DEFAULT', 3000);
      close();
      return;
    }

    navigation.navigate('Shopping', {
      screen: 'Schedule',
      params: {
        company,
        coupon,
        outsideCoverageArea,
      },
    });
  };

  const getTotal = () => {
    let value = total;

    if (coupon?.price) {
      value -= coupon?.price;
    }

    return formatMoney(value);
  };

  return (
    <Container>
      <ViewTotalsHorizontal>
        <TextTotal>TOTAL:</TextTotal>
        <TextTotal> {getTotal()} </TextTotal>
      </ViewTotalsHorizontal>
      <Button
        continue={true}
        disabled={!isValid}
        onPress={() => shoppingSchedule()}>
        <Text continue={true}>Continuar</Text>
      </Button>
      <Button continue={false} onPress={() => setModalClean(true)}>
        <Text continue={false}>Esvaziar</Text>
      </Button>
    </Container>
  );
};

export default BtnContinue;
