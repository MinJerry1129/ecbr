import React, { useState, useEffect } from 'react';
import {
  listCoupons,
  listCompanyCoupons,
} from '../../services/service/coupon/list';
import {
  styles,
  Container,
  ViewHeader,
  StatusBar,
  TextHeader,
  ViewContent,
  FlatList,
} from './Styles';
import CardCoupon from './components/CardCoupon';
import CardNotCoupon from './components/cardNotCoupon';
import { isAuthenticated } from '../../services/userAuth';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export default function Coupon({ navigation, route }) {
  const [couponsActive, setCouponsActive] = useState([]);
  const [couponsInactive, setCouponsInactive] = useState([]);
  const [company, setCompany] = useState([]);
  const [params, setParams] = useState(true);
  const [subTotal, setSubTotal] = useState([]);
  const [notCoupon, setNotCoupon] = useState(false);
  const [firstOrder, setFirstOrder] = useState(false);

  useEffect(() => {
    let companyParam = route.params?.company ?? null;
    let subTotalParam = route.params?.subTotal ?? null;
    let pageRedirect = route.params?.pageRedirect ?? null;
    let notCouponParam = route.params?.notCoupon ?? false;
    let firstOrderParam = route.params?.firstOrder ?? false;

    setNotCoupon(notCouponParam);
    setParams(pageRedirect);
    setCompany(companyParam);
    setSubTotal(subTotalParam);
    setFirstOrder(firstOrderParam);

    listCoupon(companyParam);
  }, [route.params]);

  const listCoupon = async item => {
    let listRespActive;
    let listRespInactive;
    const { user: userAuth } = await isAuthenticated();

    if (item) {
      listRespActive = await listCompanyCoupons(
        item._id,
        true,
        userAuth.person?._id,
      );
      listRespInactive = await listCompanyCoupons(
        item._id,
        false,
        userAuth.person?._id,
      );
    } else {
      listRespActive = await listCoupons({
        status: true,
        person: userAuth.person?._id,
      });
      listRespInactive = await listCoupons({
        status: false,
        person: userAuth.person?._id,
      });
    }

    if (listRespActive && listRespActive.length > 0) {
      setCouponsActive(listRespActive);
    }

    if (listRespInactive && listRespInactive.length > 0) {
      setCouponsInactive(listRespInactive);
    }
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <ViewHeader>
        <Icon
          name="navigate-before"
          size={45}
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <TextHeader>CUPONS</TextHeader>
      </ViewHeader>
      <ViewContent>
        <CardNotCoupon
          company={company}
          params={params}
          navigation={navigation}
          notCoupon={notCoupon}
        />
        {couponsActive && couponsActive.length > 0 ? (
          <FlatList
            scrollEnabled={true}
            data={couponsActive}
            keyExtractor={item => `${item._id}`}
            renderItem={({ item }) => (
              <CardCoupon
                coupon={item}
                company={company}
                params={params}
                navigation={navigation}
                subTotal={subTotal}
                firstOrder={firstOrder}
              />
            )}
          />
        ) : null}
      </ViewContent>
    </Container>
  );
}
