/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import { Colors, Typography } from '../../../../styles';

const ModalSearchAddress = ({ address, modalVisible, openMap }) => {
  const [activeBtn, setActiveBtn] = useState(false);
  const [number, setNumber] = useState(address?.streetNumber || '');

  useEffect(() => {
    if (`${number}`.length > 0) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
  }, [number]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container]}>
          <TouchableOpacity
            style={styles.modalClosedArea}
            onPress={() => modalVisible(false)}
          />
          <SafeAreaView style={styles.content}>
            <Text style={styles.trace}>_______</Text>
            <Text style={styles.title}>PREENCHA O NÚMERO DO ENDEREÇO</Text>
            <Text style={styles.address}>
              {address?.addressRoute + ` ${number}`}
            </Text>
            <Text style={styles.complement}>{address?.addressComplement}</Text>
            <TextInput
              style={styles.textInput}
              value={number}
              maxLength={20}
              onChangeText={setNumber}
              placeholder="Digite número"
              placeholderTextColor={Colors.GRAY_DARK}
              keyboardType={'numeric'}
            />
            <TouchableOpacity
              style={[
                styles.btnContainer,
                !activeBtn || activeBtn === false ? styles.disableBtn : null,
              ]}
              disabled={!activeBtn}
              onPress={() =>
                openMap({ ...address, ...{ streetNumber: number, number: number } })
              }>
              <Text
                style={[
                  styles.txtBtn,
                  !activeBtn || activeBtn === false ? styles.disableText : null,
                ]}>
                Busca com número
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openMap({ ...address, ...{ number: '' } })}>
              <Text style={styles.txtNoNumber}>Endereço sem número</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ModalSearchAddress;

const styles = StyleSheet.create({
  trace: {
    color: Colors.GRAY_DARK,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  container: {
    flex: 1,
  },
  modalClosedArea: {
    flex: 1,
  },
  content: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    width: '100%',
    minHeight: 150,
    alignItems: 'center',
    elevation: 3,
    borderTopWidth: 1,
    borderColor: Colors.GREY_LIGHT,
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.BLACK,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    marginTop: 10,
    marginBottom: 45,
  },
  address: {
    color: Colors.BLACK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    marginBottom: 5,
  },
  complement: {
    color: Colors.GRAY_DARK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    marginBottom: 20,
  },
  btnContainer: {
    width: '70%',
    backgroundColor: Colors.PRIMARY,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: Colors.GRAY_MEDIUM,
    borderRadius: 5,
  },
  txtBtn: {
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    paddingVertical: 15,
  },
  txtNoNumber: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: Colors.GRAY_MEDIUM,
    backgroundColor: '#F8F8F8',
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    minHeight: 30,
    // minWidth: 50,
    width: '45%',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  disableBtn: {
    backgroundColor: Colors.WHITE,
    borderWidth: 0.3,
    borderColor: Colors.GRAY_MEDIUM,
    borderRadius: 5,
  },
  disableText: {
    color: Colors.GRAY_DARK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
  },
});
