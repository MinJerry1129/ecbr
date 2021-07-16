import React, {Component} from 'react';
import FastImage from 'react-native-fast-image';
import {
  ViewItem,
  ViewBoxName,
  ViewTxtPercent,
  TxtPercent,
  TxtNameProd,
  TxtDescriptProd,
  ViewPrice,
  TxtPrice,
  TxtPricePromotion,
  BoxImage,
} from './Styles';

import {formatMoney} from '../../../../../utils';
import {calcDiscountPercent} from '../../../../../utils/screens/product';

const noImage = require('../../../../../assets/images/product/no_image.png');

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      details: this.props.details,
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <ViewItem onPress={() => this.state.details(this.state.title._id)}>
        {this.state.title.images &&
        this.state.title.images.length > 0 &&
        this.state.title.images[0] !== '' ? (
          <BoxImage
            source={{
              uri: this.state.title.images[0],
              // uri: 'https://economizebr.sfo2.digitaloceanspaces.com/producthomolog/74954a7e-6c71-45f0-b581-df7025da5402.webp',
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        ) : (
          <BoxImage
            source={{
              uri: noImage,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        )}
        <ViewBoxName>
          {this.state.title.pricePromotion ? (
            <ViewTxtPercent>
              <TxtPercent>
                {calcDiscountPercent(
                  this.state.title.price,
                  this.state.title.pricePromotion,
                )}{' '}
                OFF
              </TxtPercent>
            </ViewTxtPercent>
          ) : null}
          <TxtNameProd numberOfLines={2}>
            {this.state.title.name && this.state.title.name.length > 0
              ? `${this.state.title.name}`
              : ''}
          </TxtNameProd>
          <TxtDescriptProd numberOfLines={3}>
            {this.state.title.description &&
            this.state.title.description.length > 0
              ? `${this.state.title.description}`
              : null}
          </TxtDescriptProd>
          {this.state.title.pricePromotion ? (
            <ViewPrice>
              <TxtPrice>
                {formatMoney(this.state.title.pricePromotion)}
              </TxtPrice>
              <TxtPricePromotion>
                {formatMoney(this.state.title.price)}
              </TxtPricePromotion>
            </ViewPrice>
          ) : (
            <ViewPrice>
              <TxtPrice>{formatMoney(this.state.title.price)}</TxtPrice>
            </ViewPrice>
          )}
        </ViewBoxName>
      </ViewItem>
    );
  }
}

export default Product;
