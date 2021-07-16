import React from 'react';

import user from './images/user.png';
import creditCard from './images/creditCard.png';
import exit from './images/exit.png';
import fastFood from './images/fastFood.png';
import clientSupport from './images/clientSupport.png';
import apple from './images/apple.png';
import location from './images/location.png';
import home from './images/home.png';
import ticket from './images/ticket.png';
import market from './images/market.png';
import partner from './images/partner.png';
import favorites from './images/favorites.png';
import suport from './images/suport.png';
import share from './images/share.png';

import { Icon } from './styles';

interface IconProps {
  name:
  | 'user'
  | 'creditCard'
  | 'exit'
  | 'fastFood'
  | 'clientSupport'
  | 'apple'
  | 'location'
  | 'home'
  | 'ticket'
  | 'suport'
  | 'share'
  | 'market';
}

const CustomIcon: React.FC<IconProps> = ({ name }) => {
  const iconDescriptors = {
    user,
    creditCard,
    exit,
    fastFood,
    clientSupport,
    apple,
    location,
    home,
    ticket,
    market,
    partner,
    favorites,
    suport,
    share,
  };

  return <Icon source={iconDescriptors[name]} />;
};

export default CustomIcon;
