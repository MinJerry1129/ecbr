import React, {useEffect, useState, useCallback} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';

import {
  monitorLocation,
  cleanMonitorLocation,
} from '../../store/actions/location';

import Search from './components/Search';
import Companys from './components/Companys';

import styles from './styles';

const Restaurant = ({navigation, onLocation, onCleanLocation, route}) => {
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(async () => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    onLocation();

    return () => {
      onCleanLocation();
    };
  }, [onCleanLocation, onLocation]);

  return (
    <View style={styles.safeArea}>
      <Search />
      <ScrollView
        style={styles.Scrollview}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Companys refreshing={refreshing} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({location}) => {
  return {
    coords: location.coords,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLocation: () => dispatch(monitorLocation()),
    onCleanLocation: () => dispatch(cleanMonitorLocation()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Restaurant);
