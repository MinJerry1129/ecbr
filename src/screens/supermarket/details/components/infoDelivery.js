import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  minPurchase,
  maxAmountItems,
  deliveryTime,
  deliveryPrice,
} from '../../../../utils/screens/product';
import { Typography, Colors } from '../../../../styles';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';
import { round } from '../../../../utils';
import distanteFormat from '../../../../services/maps/distanceCoordinate';

export default function infoDelivery(
  company,
  navigation,
  address,
  guestAddress,
) {
  try {
    let minPrice = minPurchase(company);
    let maxDelivery = maxAmountItems(company, '');
    let str = '';

    if (minPrice && minPrice !== '') {
      str += `${minPrice}`;
    }

    if (maxDelivery && maxDelivery !== '') {
      str += ` - até ${maxDelivery} `;
    }

    return (
      str !== '' && (
        <View>
          <Text style={[styles.star]}>
            <Icon name="star" />{' '}
            {company.totalRating > 20 ? round(company.mediaRating, 1) : 'Novo'}{' '}
          </Text>
          <Text>
            <Icon name="place" style={{ color: Colors.PRIMARY }} />
            {txtDistante(company, address, guestAddress, navigation)}
          </Text>
          {company?.companyDelivery?.min_purchase > 0 && (
            <View style={styles.headerInfo}>
              <Icon name="motorcycle" size={15} color={Colors.GREY} />
              <Text style={styles.headerInfoText}>
                {deliveryTime(company, false)}
              </Text>
            </View>
          )}
          {company ? (
            <View style={styles.headerInfo}>
              <Icon2 name="divide" size={15} color={Colors.GREY} />
              <Text style={styles.headerInfoText}>
                {deliveryPrice(company, 'Taxa Entrega:')}
              </Text>
            </View>
          ) : null}
          <View style={styles.headerInfo}>
            <Icon name="monetization-on" size={15} color={Colors.GREY} />
            <Text style={styles.headerInfoText}>{str}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Supermarket', {
                  screen: 'SupermarketDetails',
                  params: { company },
                })
              }
            />
          </View>
        </View>
      )
    );
  } catch (err) {
    return '';
  }
}

const txtDistante = (company, address, guestAddress, navigation) => {
  let companyCoord = null;
  let userCoord = null;

  if (company.location && company.location.coordinates) {
    companyCoord = company.location.coordinates;
  }

  if (!address || address.length <= 0) {
    navigation.navigate('Customer', {
      screen: 'CustomerAddress',
    });
    return false;
  }

  const customerAddress = address[0];

  if (!customerAddress) {
    return;
  }

  if (guestAddress && guestAddress.location) {
    userCoord = guestAddress.location.coordinates;
  } else if (
    customerAddress.location &&
    customerAddress.location?.coordinates
  ) {
    userCoord = customerAddress.location.coordinates;
  }

  return (
    <>
      {companyCoord && userCoord ? (
        <Text style={styles.txtDistance}>
          {distanteFormat(
            {
              latitude: userCoord[1],
              longitude: userCoord[0],
            },
            {
              latitude: companyCoord[1],
              longitude: companyCoord[0],
            },
          )}
        </Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerInfoText: {
    color: Colors.GREY,
    marginLeft: 5,
  },
  boxIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  TitleCompany: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    maxWidth: 180,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  txtDistance: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY,
    marginLeft: 10,
  },
  star: {
    color: Colors.SECONDARY,
    fontSize: Typography.FONT_SIZE_14,
    marginLeft: 10,
    marginTop: 2,
  },
});
