/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';

import moment from 'moment';
import { connect } from 'react-redux';

import { isAuthenticated } from '../../services/userAuth';
import { StorageGet, StorageSet } from '../../services/deviceStorage';

import { getAddress } from '../../store/actions/user';
import { getCurrentPosition } from '../../store/actions/location';

/** Components */
import Popup from './components/Popup';
import Search from './components/Search';
import Rating from './components/Rating';
import Banner from './components/Banner';
import Companys from './components/Companys';
import Tabloids from './components/Tabloids';
import SliderComponent from './components/Slide';
import Categories from './components/Categories';
import ActiveOrders from './components/ActiveOrders';
import BottomNavigation from './components/BottomNavigation';

import { Container } from './Styles';

const Home = ({ onAddress }) => {
  const [enableRating, setEnableRatin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { user: userAuth } = await isAuthenticated();

      if (userAuth.rating) {
        setEnableRatin(false);
        return;
      }

      const quantity = await StorageGet('OPENAPP');

      if (quantity && parseInt(quantity, 0) >= 10) {
        await StorageSet('OPENAPP', '1');
        setEnableRatin(true);
      }
    };

    getUser();
    onAddress();
  }, []);

  let myScroll = React.createRef();

  const goInitialPositionList = () => {
    myScroll.scrollTo({ animated: false, x: 0, y: 0 });
  };

  return (
    <>
      <Rating enableRating={enableRating} />
      <Popup />
      <Container>
        <Search />
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={false}
          ref={ref => {
            myScroll = ref;
          }}>
          <SliderComponent />
          <Categories />
          <ActiveOrders />
          <Tabloids />
          <Banner />
          <Companys />
        </ScrollView>
      </Container>
      <BottomNavigation goInitialPositionList={goInitialPositionList} />
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onLocation: coords => dispatch(getCurrentPosition()),
    onAddress: () => dispatch(getAddress()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Home);
