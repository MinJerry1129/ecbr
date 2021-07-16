import React from 'react';

import {
  Container,
  FlatList,
  ViewItem,
  BoxImage,
  ViewItemData,
  ViewDescriptionItem,
  TextDescriptionItem,
  Line,
  TextValueItem,
  ViewQuantityItem,
  TextQuantityItem,
  TouchAddMoreItens,
  TextAddMoreItens,
} from './Styles';

import { formatMoney } from '../../../../../utils';
import CartAdd from '../../../../../components/product/cartAdd';

const ItensCart = ({ itens, close, company }) => {
  const noImage = require('../../../../../assets/images/product/no_image.png');
  const imageLoad = require('../../../../../assets/images/product/image_load.png');

  const priceCurrent = item => {
    try {
      let price =
        item.pricePromotion && item.pricePromotion !== null
          ? item.pricePromotion
          : item.price;

      return formatMoney(price * item.amount, false);
    } catch (err) {
      return '';
    }
  };

  return (
    <Container>
      <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        data={itens}
        keyExtractor={item => `${item._id}`}
        renderItem={({ item }) => (
          <>
            <ViewItem>
              {item?.product?.images?.length > 0 ? (
                <BoxImage
                  source={{ uri: item?.product?.images[0] }}
                  defaultSource={imageLoad}
                  resizeMode="contain"
                />
              ) : (
                  <BoxImage source={noImage} resizeMode="contain" />
                )}
              <ViewItemData>
                <ViewDescriptionItem>
                  <TextDescriptionItem numberOfLines={2}>
                    {item?.product?.name}
                  </TextDescriptionItem>
                </ViewDescriptionItem>
                <TextValueItem>R$ {priceCurrent(item)}</TextValueItem>
              </ViewItemData>
              <ViewQuantityItem>
                <CartAdd
                  item={item.product}
                  company={company}
                  modalCart={true}
                  isConfirmItemClean={true}
                />
              </ViewQuantityItem>
            </ViewItem>
            <Line />
          </>
        )}
      />
      <TouchAddMoreItens onPress={() => close()}>
        <TextAddMoreItens>Adicionar mais itens</TextAddMoreItens>
      </TouchAddMoreItens>
    </Container>
  );
};

export default ItensCart;
