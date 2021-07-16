import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography, Colors } from '../../../../styles';
import {
  updateDeliveryAddress,
  deleteDeliveryAddress,
} from '../../../../services/service/delivery/address';
import Options from './options';
import homeEnabled from '../../../../assets/images/address/home_enabled.png';
import homeDisabled from '../../../../assets/images/address/home_disabled.png';
import workEnabled from '../../../../assets/images/address/work_enabled.png';
import workDisabled from '../../../../assets/images/address/work_disabled.png';

const ListAddressView = ({ listAddress, reload, goRedirect, edit }) => {
  const [modalOptions, setModalOptions] = useState(false);
  const [itemCurrent, setItemCurrent] = useState(null);

  const iconVert = item => {
    setItemCurrent(item);
    setModalOptions(true);
  };

  const removeAddress = async item => {
    const _id = item._id;
    await deleteDeliveryAddress(_id);
    reload();
  };

  const updateAddress = async item => {
    const _id = item._id;
    const coordinate = item.location.coordinates;
    await updateDeliveryAddress(_id, {
      latitude: coordinate[1],
      longitude: coordinate[0],
    });

    goRedirect();
  };

  const showAddres = item => {
    try {
      let route = item?.addressRoute || '';
      let number = item?.number || '';
      let addressRegion = item?.addressRegion || '';
      let address = '';

      if (route) {
        address += route;
        if (`${number}`.length >= 0) {
          address += `, ${number}`;
        }
      }

      if (addressRegion) {
        address += ` ${addressRegion}`;
      }

      if (address === '') {
        address = item?.address;
      }
      return address;
    } catch (err) {
      return item?.address || '';
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOptions}
        onRequestClose={() => setModalOptions(false)}>
        <Options
          modal={setModalOptions}
          item={itemCurrent}
          edit={edit}
          remove={removeAddress}
        />
      </Modal>
      {listAddress && listAddress.length ? (
        <FlatList
          style={styles.flatStyle}
          data={listAddress}
          keyExtractor={item => `${item._id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            item.main && item.main === true ? (
              <View style={[styles.cardAddressActive, styles.boxCard]}>
                <View style={styles.cardList}>
                  <TouchableOpacity
                    style={styles.content}
                    onPress={() => updateAddress(item)}>
                    <Text
                      style={[styles.txtTypeAddress, styles.txtAddressActive]}>
                      {item.category === 'HOME' ? 'Casa' : 'Trabalho'}
                    </Text>
                    <Text style={[styles.textBase, styles.txtAddress]}>
                      {showAddres(item)}
                    </Text>
                    <Text
                      style={[
                        styles.textBase,
                        styles.txtAddress,
                        { marginBottom: 20 },
                      ]}>
                      {item.complement}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.iconsBox}>
                    <Icon
                      name="more-vert"
                      color={Colors.PRIMARY}
                      size={30}
                      style={styles.iconContent}
                      onPress={() => edit(item)}
                    />
                    <Image
                      source={
                        item.category === 'HOME' ? homeEnabled : workEnabled
                      }
                    />
                  </View>
                </View>
              </View>
            ) : (
                <View style={[styles.cardAddress, styles.boxCard]}>
                  <View style={styles.cardList}>
                    <TouchableOpacity
                      style={styles.content}
                      onPress={() => updateAddress(item)}>
                      <Text style={[styles.txtTypeAddress]}>
                        {item.category === 'HOME' ? 'Casa' : 'Trabalho'}
                      </Text>
                      <Text style={[styles.textBase, styles.txtAddress]}>
                        {showAddres(item)}
                      </Text>
                      <Text
                        style={[
                          styles.textBase,
                          styles.txtAddress,
                          { marginBottom: 20 },
                        ]}>
                        {item.complement}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.iconsBox}>
                      <Icon
                        name="more-vert"
                        color={Colors.GRAY_DARK}
                        style={styles.iconContent}
                        size={30}
                        onPress={() => iconVert(item)}
                      />
                      <Image
                        source={
                          item.category === 'HOME' ? homeDisabled : workDisabled
                        }
                      />
                    </View>
                  </View>
                </View>
              )
          }
        />
      ) : (
          <View style={styles.notFound}>
            <Text style={styles.notFoundTxt}>
              Nenhum endereço cadastrado. Por favor cadastre um endereço!
          </Text>
          </View>
        )}
    </>
  );
};

export default ListAddressView;

const styles = StyleSheet.create({
  flatStyle: {
    marginTop: 20,
    backgroundColor: '#F8F8F8',
  },
  cardAddress: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GRAY_DARK,
    borderWidth: 0.3,
  },
  cardAddressActive: {
    borderColor: Colors.PRIMARY,
    borderWidth: 0.3,
    backgroundColor: Colors.WHITE,
  },
  boxCard: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
    shadowRadius: 10,
    marginHorizontal: 17,
  },
  cardList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  textBase: {
    marginTop: 20,
    flexShrink: 1,
    fontSize: Typography.FONT_SIZE_17,
    paddingHorizontal: 5,
  },
  txtAddress: {
    color: Colors.GRAY_DARK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_13,
  },
  txtTypeAddress: {
    marginTop: 20,
    flexShrink: 1,
    paddingHorizontal: 5,
    color: Colors.GRAY_DARK,
    fontSize: Typography.FONT_SIZE_13,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtAddressActive: {
    color: Colors.PRIMARY,
  },
  notFound: {
    flex: 1,
    margin: 20,
  },
  notFoundTxt: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
    letterSpacing: 1,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.GREY,
  },
  content: {
    flex: 1,
    marginRight: 20,
  },
  iconContent: {
    padding: 10,
  },
});
