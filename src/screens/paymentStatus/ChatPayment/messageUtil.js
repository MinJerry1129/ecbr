import {listUserOne} from '../../../services/service/Person';

const OnPersonChat = async (order, goBack) => {
  try {
    let status = order?.status ?? null;
    let idPerson = null;
    let filter = {};
    let idShooper = order?.shopper ?? null;
    let idDeliveryMan = order?.deliveryMan ?? null;

    // if (status === 'DISPATCH') {
    //   if (idShooper) {
    //     idPerson = idShooper;
    //     filter.type = 'shopper';
    //   }
    // } else {
    //   if (idDeliveryMan) {
    //     idPerson = idDeliveryMan;
    //     filter.type = 'deliveryMan';
    //   }
    // }

    if (status === 'DELIVERY_ROUTE') {
      idPerson = idDeliveryMan;
      filter.type = 'deliveryMan';
    } else {
      if (idShooper) {
        idPerson = idShooper;
        filter.type = 'shopper';
      }
    }

    if (!filter.type) {
      // goBack();
      return false;
    }

    const respPerson = await listUserOne(idPerson, filter);
    if (respPerson) {
      return {
        user: respPerson,
        personType: filter.type,
      };
    } else {
      // goBack();
      return false;
    }
  } catch (err) {
    console.log('No Person Chat', err);
    return false;
  }
};

export {OnPersonChat};
