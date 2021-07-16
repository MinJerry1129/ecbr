import api, { ErrorAxios } from '../../api';

const sendImages = async (image, folder) => {
  try {
    const response = await api.post('/send-images/', { image, folder });
    const res = response.data;

    return res;
  } catch (err) {
    ErrorAxios(err, 'Fail Create Status Online Delivery Man');
    return null;
  }
};

export { sendImages };
