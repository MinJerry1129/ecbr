import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import {isAuthenticated} from '../../../../services/userAuth';
import {listPopups, updateViewsPopup} from '../../../../services/service/popup';

import styles from './styles';

const Popup = () => {
  const [userAuth, setUserAuth] = useState(null);
  const [modalPopup, setModalPopup] = useState(false);
  const [popup, setPopup] = useState(null);

  const getContentPopupAndShow = useCallback(async () => {
    const {user} = await isAuthenticated();

    if (user) {
      const result = await listPopups(user.person?._id);
      setUserAuth(user);

      if (result !== null) {
        setPopup(result);
        return setModalPopup(true);
      }

      setModalPopup(false);
    }
  }, []);

  const closeModalAndUpdateViews = async () => {
    await updateViewsPopup(popup._id, {person: userAuth.person?._id});

    setModalPopup(false);
  };

  useEffect(() => {
    getContentPopupAndShow();

    return () => getContentPopupAndShow();
  }, [getContentPopupAndShow]);

  return (
    <Modal
      presentationStyle="overFullScreen"
      animationType="slide"
      transparent={true}
      visible={modalPopup}
      onRequestClose={() => setModalPopup(false)}>
      <View style={styles.Modal}>
        <View style={styles.BoxModal}>
          <ScrollView style={styles.BoxModalContent}>
            {popup?.images ? <Image source={{uri: popup.images[0]}} /> : null}
            {popup?.message ? <Text>{popup.message}</Text> : null}
          </ScrollView>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => closeModalAndUpdateViews()}>
            {popup?.textMessageButton ? (
              <Text style={styles.ButtonText}>{popup.textMessageButton}</Text>
            ) : (
              <Text style={styles.ButtonText}>OK</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
