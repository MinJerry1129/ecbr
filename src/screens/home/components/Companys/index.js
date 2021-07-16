import React from 'react';

// import BuyAgain from './ShowCases/BuyAgain';
import Coupon from './ShowCases/Coupon';
import IndicatedForYou from './ShowCases/IndicatedForYou';
import Promotion from '../Promotion';

const Companys = () => {
  return (
    <>
      <Coupon />
      <Promotion />
      {/* <BuyAgain /> */}
      <IndicatedForYou hr={false} />
    </>
  );
};

export default Companys;
