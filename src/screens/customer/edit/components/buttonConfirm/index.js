import React from 'react';
import { Alert } from 'react-native';

import { Container, Button, TextButton } from './Styles';
import { createLog } from '../../../../../services/service/Log';
import { StorageSet } from '../../../../../services/deviceStorage';
import { isAuthenticated } from '../../../../../services/userAuth';
import { updatePersonOne } from '../../../../../services/service/Person';
import { validateEmail, replaceSpecialChars } from '../../../../../utils';
import { customerCurrent } from '../../../../../services/service/customer';

const ButtonConfirm = ({
  name,
  email,
  phone,
  setModalLoad,
  navigation,
  personId,
  picture,
}) => {
  const edit = async () => {
    setModalLoad(true);

    if (!name) {
      Alert.alert('Nome é obrigatório.');
      setModalLoad(false);
      return;
    }

    if (!email) {
      Alert.alert('E-mail é obrigatório.');
      setModalLoad(false);
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Formato de E-mail inválido.');
      setModalLoad(false);
      return;
    }

    if (!phone) {
      Alert.alert('Telefone é obrigatório.');
      setModalLoad(false);
      return;
    }

    let phoneFormated = replaceSpecialChars(phone);

    const result = await updatePersonOne(personId, {
      name,
      email,
      phone: '55' + phoneFormated,
      status: true,
      image: picture,
    });

    setModalLoad(false);

    if (result === false) {
      Alert.alert('Não foi possível editar perfil');

      await createLog({
        typeSystem: 'MOBILE',
        typeLog: 'ERROR',
        description: 'Erro ao editar perfil do Customer',
        category: 'Edit Customer',
        originError: 'screens-customer-edit-index',
      });

      return;
    }

    const { user: userAuth } = await isAuthenticated();
    let userResponse = await customerCurrent(userAuth?._id || null);
    await StorageSet('CUSTOMER', { user: userResponse, guest: false });
    return navigation.navigate('Home', { screen: 'Home' });
  };

  return (
    <Container>
      <Button onPress={() => edit()}>
        <TextButton>Confirmar</TextButton>
      </Button>
    </Container>
  );
};

export default ButtonConfirm;
