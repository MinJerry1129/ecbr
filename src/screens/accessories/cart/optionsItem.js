import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors, Typography } from '../../../styles';

const OptionsItem = ({ item, back, edit, remove }) => {
  const editOption = () => {
    back(false);
    edit();
  };

  const removeOption = () => {
    back(false);
    remove();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer} />
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.btnItens}>
              <Text style={styles.txtTitle}>{item?.product.name}</Text>
              <TouchableOpacity
                style={styles.btContainer}
                onPress={() => editOption()}>
                <Text style={styles.titleBtn}>Editar Item</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btContainer}
                onPress={() => removeOption()}>
                <Text style={styles.titleBtn}>Remover Item</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btContainer, styles.borderBottom]}
                onPress={() => back(false)}>
                <Text style={[styles.titleBtn, styles.titleBtnClose]}>
                  Fechar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OptionsItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  headerContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    height: 200,
    backgroundColor: Colors.WHITE,
    borderTopWidth: 0.1,
    borderColor: Colors.GREY,
  },
  txtTitle: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'center',
    marginBottom: 10,
  },
  btContainer: {
    borderTopWidth: 0.4,
    borderColor: Colors.GREY,
    paddingVertical: 15,
    borderStyle: 'solid',
  },
  borderBottom: {
    borderBottomWidth: 0.4,
    borderColor: Colors.GREY,
    borderStyle: 'solid',
  },
  titleBtn: {
    color: Colors.PRIMARY_DARK,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_16,
  },
  titleBtnClose: {
    color: Colors.PRIMARY,
  },
});
