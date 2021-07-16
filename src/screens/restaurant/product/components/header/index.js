import React, { useState, useEffect } from 'react';
import { toastShow } from '../../../../../utils';
import {
  updateCustomer,
  listCustomerSearch,
} from '../../../../../services/service/customer';
import { isAuthenticated } from '../../../../../services/userAuth';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {
  styles,
  ImageBackground,
  BoxCompany,
  BoxIcons,
  TouchableOpacity,
} from './Styles';

const Header = ({ navigation, company }) => {
  const [customerId, setCustomerId] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  const imgHeader = require('../../../../../assets/images/product/background.jpg');

  useEffect(() => {
    const favorites = async () => {
      setLoadingFavorites(true);
      if (company !== null) {
        const { user: resultUser } = await isAuthenticated();
        setCustomerId(resultUser._id);

        const customer = await listCustomerSearch({
          email: resultUser.email,
        });

        if (customer?.favoriteRestaurants) {
          setFavoriteRestaurants(customer.favoriteRestaurants);

          if (customer?.favoriteRestaurants?.includes(company._id)) {
            setFavorite(true);
          }
        }
      }
      setLoadingFavorites(false);
    };

    favorites();
  }, [company]);

  const updateFavoriteCompany = async () => {
    let newFavoritesRestaurants = favoriteRestaurants;
    if (!favorite) {
      const result = favoriteRestaurants.find(
        favoriteRestaurant => favoriteRestaurant === company._id,
      );
      if (!result) {
        newFavoritesRestaurants.push(company._id);

        toastShow(
          'Estabelecimento adicionado aos seus favoritos.',
          'DEFAULT',
          3000,
        );
      }
    } else {
      newFavoritesRestaurants = favoriteRestaurants.filter(r => {
        if (r !== company._id) {
          return r;
        }
      });

      toastShow(
        'Estabelecimento removido aos seus favoritos.',
        'DEFAULT',
        3000,
      );
    }

    setFavorite(!favorite);

    await updateCustomer(customerId, {
      favoriteRestaurants: newFavoritesRestaurants,
    });
  };

  const back = () => {
    navigation.navigate('Restaurant', { screen: 'Restaurantes' });
  };

  return (
    <ImageBackground source={imgHeader}>
      <BoxCompany>
        <TouchableOpacity onPress={() => back()}>
          <Icon name="navigate-before" size={40} style={styles.icon} />
        </TouchableOpacity>
      </BoxCompany>
      <BoxIcons>
        {!loadingFavorites && (
          <TouchableOpacity onPress={() => updateFavoriteCompany()}>
            {favorite ? (
              <Icon name="favorite" size={30} style={styles.icon} />
            ) : (
                <Icon name="favorite-border" size={30} style={styles.icon} />
              )}
          </TouchableOpacity>
        )}
      </BoxIcons>
    </ImageBackground>
  );
};

export default Header;
