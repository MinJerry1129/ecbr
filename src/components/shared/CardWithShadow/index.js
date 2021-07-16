import React from 'react';
import {Dimensions} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows';

const CardWithShadow = ({children}) => {
  const d = Dimensions.get('screen');
  return (
    <Shadow
      useArt
      swapShadows
      style={{
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        backgroundColor: '#fff',
        shadowColor: '#3973B6',
        shadowRadius: 3,
        width: d.width * 0.9,
        height: 130,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
      }}>
      {children}
    </Shadow>
  );
};

export default CardWithShadow;
