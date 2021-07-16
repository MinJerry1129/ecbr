import {formatMoney} from '../index';

const calcDiscount = (priceNormal, pricePromotion) => {
  const dif = priceNormal - pricePromotion;
  return `Poupe ${formatMoney(dif)}`;
};

const calcDiscountPercent = (priceNormal, pricePromotion) => {
  const dif = priceNormal - pricePromotion;
  const percent = ((dif * 100) / priceNormal).toFixed(0);
  return `${percent}%`;
};

const deliveryPrice = (item, text = '') => {
  try {
    if (!item || (!item.deliveryPrice && item.deliveryPrice !== 0)) {
      return '';
    }

    let price = item.deliveryPrice;
    if (price > 0) {
      return `${text} ${formatMoney(price)}`;
    }
    return 'Entrega Grátis';
  } catch (err) {
    return '';
  }
};

const deliveryTime = (item, tag = true) => {
  try {
    if (item && item.deliveryTime) {
      return `Aprox. ${item.deliveryTime} min ${tag ? '-' : ''} `;
    }

    return '';
  } catch (err) {
    return '';
  }
};

const minPurchase = (item, text = 'Mínimo ') => {
  try {
    if (!item || !item.companyDelivery) {
      return '';
    }

    let min = item.companyDelivery?.min_purchase ?? 0;
    if (min === 0) {
      return '';
    }

    return `${text} ${formatMoney(min)}`;
  } catch (err) {
    return '';
  }
};

const maxAmountItems = (item, textLeft = 'Max') => {
  try {
    if (!item || !item.companyDelivery) {
      return '';
    }

    let max = item.companyDelivery?.max_amount_items ?? 0;
    if (max === 0) {
      return '';
    }

    return `${textLeft} ${max} itens`;
  } catch (err) {
    return '';
  }
};

export {
  calcDiscount,
  calcDiscountPercent,
  deliveryPrice,
  deliveryTime,
  minPurchase,
  maxAmountItems,
};
