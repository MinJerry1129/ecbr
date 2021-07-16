import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { StorageGet } from '../../../services/deviceStorage';

import {
  styles,
  SafeAreaView,
  StatusBar,
  ViewHeader,
  TextHeader,
} from './Styles';

import TypeSchedule from './components/typeSchedule';
import ScheduleList from './components/scheduleList';
import ModalScheduleWithdrawal from './components/modalScheduleWithdrawal';

const Schedule = props => {
  const [modal, setModal] = useState(false);
  const [companyLocal, setCompanyLocal] = useState(null);
  const [typeSchedule, setTypeSchedule] = useState(() => {
    if (props.route.params.outsideCoverageArea) {
      return 'WITHDRAWAL';
    }

    return 'DELIVERY';
  });
  const [outsideCoverageArea, setOutsideCoverageArea] = useState(() => {
    return props.route.params.outsideCoverageArea ?? false;
  });

  const goBack = async () => {
    const company = props.route.params.company ?? null;
    const coupon = props.route.params.coupon ?? null;

    props.navigation.navigate('Supermarket', {
      screen: 'Product',
      params: {
        company,
        coupon,
      },
    });
  };

  const getCompany = async () => {
    const company = await StorageGet('company');
    if (company && company._id) {
      setCompanyLocal(company);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}>
        <ModalScheduleWithdrawal
          back={setModal}
          company={companyLocal}
          setTypeSchedule={setTypeSchedule}
        />
      </Modal>
      <ViewHeader>
        <Icon
          name="navigate-before"
          size={45}
          style={styles.icon}
          onPress={() => goBack()}
        />
        <TextHeader>AGENDA</TextHeader>
      </ViewHeader>
      <TypeSchedule
        setModal={setModal}
        typeSchedule={typeSchedule}
        setTypeSchedule={setTypeSchedule}
        outsideCoverageArea={outsideCoverageArea}
        deliveryPrice={companyLocal?.deliveryPrice}
        withdrawMarket={companyLocal?.companyDelivery?.withdrawMarket ?? true}
      />
      <ScheduleList
        company={companyLocal}
        navigation={props.navigation}
        coupon={props.route.params.coupon}
        typeSchedule={typeSchedule}
      />
    </SafeAreaView>
  );
};

export default Schedule;
