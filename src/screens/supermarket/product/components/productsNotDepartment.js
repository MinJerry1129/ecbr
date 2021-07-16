import React, { memo } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles, { ViewClickItem, ViewProductImage } from '../styles';
import CartAdd from '../../../../components/product/cartAdd';
import { formatMoney } from '../../../../utils';
import {
  calcDiscount,
  calcDiscountPercent,
} from '../../../../utils/screens/product';

const ProductsNotDepartment = ({
  listOffers,
  onLoadMore,
  setScrollViewScroll,
  details,
  company,
  flatLoad,
  openModalValidation,
}) => {
  const noImage = require('../../../../assets/images/product/no_image.png');
  const imageLoad = require('../../../../assets/images/product/image_load.png');

  const renderFooter = () => {
    return (
      <View style={styles.flatFooter}>
        {flatLoad === true ? (
          <ActivityIndicator size="large" style={styles.flatIconLoad} />
        ) : null}
      </View>
    );
  };

  return (
    <FlatList
      onEndReachedThreshold={0.1}
      progressViewOffset={true}
      onEndReached={() => onLoadMore()}
      style={styles.listOffers}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={listOffers}
      keyExtractor={item => item._id}
      onTouchStart={() => setScrollViewScroll(false)}
      onMomentumScrollEnd={() => setScrollViewScroll(true)}
      renderItem={({ item }) => {
        return (
          <View style={styles.item}>
            <ViewClickItem copyright={false} onPress={() => details(item._id)}>
              {item.images && item.images.length > 0 ? (
                <ViewProductImage
                  copyright={item.copyright}
                  defaultSource={noImage}
                  source={{ uri: item.images[0] }}
                  resizeMode="contain"
                />
              ) : (
                  <ViewProductImage
                    copyright={item.copyright}
                    source={imageLoad}
                    resizeMode="contain"
                  />
                )}
              <View style={styles.BoxInfo}>
                <View style={styles.priceContainer}>
                  {item.pricePromotion ? (
                    <Text style={styles.txtValue}>
                      {formatMoney(item.pricePromotion)}
                    </Text>
                  ) : (
                      <Text style={styles.txtValue}>
                        {formatMoney(item.price)}
                      </Text>
                    )}

                  {item.pricePromotion ? (
                    <>
                      <Text style={styles.pricePromotion}>
                        {formatMoney(item.price)}
                      </Text>
                    </>
                  ) : null}
                </View>

                {item.pricePromotion && (
                  <View style={styles.discountContainer}>
                    <Text style={styles.txtDiscount}>
                      {calcDiscount(item.price, item.pricePromotion)}
                    </Text>
                    <Text style={styles.txtPercent}>
                      {calcDiscountPercent(item.price, item.pricePromotion)}
                    </Text>
                  </View>
                )}

                <Text style={styles.txtNameProd}>
                  {item.name && item.name.length > 20
                    ? `${item.name.substr(0, 15)}...`
                    : item.name}
                </Text>
                <Text style={styles.txtNameProd}>
                  {item.description && item.description.length > 20
                    ? `${item.description.substr(0, 15)}...`
                    : item.description}
                </Text>
              </View>
            </ViewClickItem>

            <CartAdd
              item={item}
              company={company}
              openModalValidation={openModalValidation}
            />
          </View>
        );
      }}
      ListFooterComponent={renderFooter()}
    />
  );
};

export default memo(ProductsNotDepartment);
