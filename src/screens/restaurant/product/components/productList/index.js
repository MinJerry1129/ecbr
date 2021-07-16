/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import SectionList from 'react-native-tabs-section-list';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

import { styles } from './Styles';
import Product from '../product';

const ProductList = ({ navigation, company, products }) => {
  let refList;
  const saveListRef = ref => (refList = ref);

  const details = useCallback(
    id => {
      navigation.navigate('RestaurantProductDetails', {
        idProduct: id,
        company: company,
        cartItem: null,
      });
    },
    [company, navigation],
  );

  const renderTab = useCallback(({ title, isActive }) => {
    return (
      <View
        style={[styles.tabContainer, { borderBottomWidth: isActive ? 1 : 0 }]}>
        <Text
          style={[styles.tabText, { color: isActive ? '#090909' : '#9e9e9e' }]}>
          {title}
        </Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <Product title={item} details={details} />;
  }, []);

  const getItemLayout = sectionListGetItemLayout({
    // The height of the row with rowData at the given sectionIndex and rowIndex
    getItemHeight: (rowData, sectionIndex) => (sectionIndex === 0 ? 130 : 130),
    // These three properties are optional
    getSeparatorHeight: () => 1,
    getSectionHeaderHeight: () => 100, // The height of your section headers
    // getSectionFooterHeight: () => 100, // The height of your section footers
  });

  const renderSectionHeader = useCallback(({ section }) => {
    return (
      <View>
        <View style={styles.sectionHeaderContainer} />
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <SectionList
        ref={saveListRef}
        sections={products}
        keyExtractor={(item, index) => item + index}
        tabBarStyle={styles.tabBar}
        initialNumToRender={30}
        maxToRenderPerBatch={30}
        getItemLayout={getItemLayout}
        renderTab={renderTab}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </View>
  );
};

export default React.memo(ProductList);
