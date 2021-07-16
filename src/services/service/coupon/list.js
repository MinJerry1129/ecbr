import api from '../../api';
import {queryString} from '../../../utils';

const listCoupons = async params => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`/coupon/display?${getQuery}`);
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    console.log('Fail Coupon List', err);
    return null;
  }
};

const listOne = async id => {
  try {
    const response = await api.get(`product/list/${id}`);
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Product List', err);
    return null;
  }
};

const listHighCoupons = async () => {
  try {
    const response = await api.get('/Coupon/highCupon');
    const data = response.data;
    if (data && data.cupom) {
      return data.cupom;
    }

    return data;
  } catch (err) {
    console.log('Fail High Coupon', err);
    return null;
  }
};

const listCouponCompanys = async id => {
  try {
    const response = await api.get(`/CouponCompany/list/${id}`);
    const data = response.data;
    if (data && data.companys) {
      return data.companys;
    }

    return data;
  } catch (err) {
    console.log('Fail Coupon Companys', err);
    return null;
  }
};

const listCompanyCoupons = async (id, status, person) => {
  try {
    const response = await api.get(
      `/coupon/companyCoupons/${id}?status=${status}&person=${person}`,
    );
    const data = response.data;
    if (data && data.companys) {
      return data.companys;
    }

    return data;
  } catch (err) {
    console.log('Fail Coupon Companys', err);
    return null;
  }
};

const listCompanyCouponsAvailable = async (id, subTotal, person) => {
  try {
    const response = await api.get(
      `/coupon/companyCouponsAvailable/${id}?subTotal=${subTotal}&person=${person}`,
    );
    const data = response.data;
    if (data && data.companys) {
      return data.companys;
    }

    return data;
  } catch (err) {
    console.log('Fail Coupon Companys', err);
    return null;
  }
};

const companys = async (lat, lng, page) => {
  try {
    const setPage = page ? page : 1;
    const response = await api.get(
      `/CouponCompany/company?lat=${lat}&lng=${lng}&page=${setPage}`,
    );
    const data = response.data;
    if (data && data.companys) {
      return data.companys;
    }

    return data;
  } catch (err) {
    console.log('Fail list Coupon Companys', err);
    return null;
  }
};

const searchCupounsCompany = async () => {
  try {
    const response = await api.get('/CouponCompany/search');
    const data = response.data;
    if (data && data.companys) {
      return data.companys;
    }

    return data;
  } catch (err) {
    console.log('Fail list Coupon Companys', err);
    return null;
  }
};

export {
  listCoupons,
  listOne,
  listHighCoupons,
  listCouponCompanys,
  listCompanyCoupons,
  listCompanyCouponsAvailable,
  companys,
  searchCupounsCompany,
};
