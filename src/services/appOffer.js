import axios from 'axios';
import config from '../config';

const AppOfferApi = axios.create({
  baseURL: config.urlAppOffer,
});

export default AppOfferApi;
