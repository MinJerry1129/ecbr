import api from '../../api';

const listItemComplement = async () => {
  try {
    const response = await api.get('food/product-complement-item');
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    console.log('Fail Product Complement', err);
    return null;
  }
};

export {listItemComplement};
