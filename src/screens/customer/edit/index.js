import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import {
  styles,
  Container,
  ViewHeader,
  TextHeader,
  StatusBar,
  ScrollView,
  Modal,
} from './Styles';

import Picture from './components/picture';
import Load from '../../../components/shared/load';
import ButtonConfirm from './components/buttonConfirm';
import PromotionalCode from './components/promotionalCode';
import PersonData from '../../support/components/personData';

const CustomerEdit = ({ navigation }) => {
  const [sku, setSku] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [picture, setPicture] = useState('');
  const [person, setPerson] = useState('');
  const [modalLoad, setModalLoad] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <ViewHeader>
        <Icon
          name="navigate-before"
          size={45}
          style={styles.icon}
          onPress={() => goBack()}
        />
        <TextHeader>EDITAR PERFIL</TextHeader>
      </ViewHeader>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalLoad}
          onRequestClose={() => {
            setModalLoad(false);
          }}>
          <Load title="" subTitle="" />
        </Modal>
        <Picture
          picture={picture}
          setPicture={setPicture}
          setModalLoad={setModalLoad}
        />
        <PersonData
          setName={setName}
          name={name}
          setEmail={setEmail}
          email={email}
          setPhone={setPhone}
          phone={phone}
          setPerson={setPerson}
          setSku={setSku}
          setPicture={setPicture}
        />
        <PromotionalCode sku={sku} />
        <ButtonConfirm
          name={name}
          email={email}
          phone={phone}
          setModalLoad={setModalLoad}
          navigation={navigation}
          personId={person}
          picture={picture}
        />
      </ScrollView>
    </Container>
  );
};

export default CustomerEdit;
