import React, { useEffect } from 'react';
import { TextInputMask } from 'react-native-masked-text';

import { isAuthenticated } from '../../../../services/userAuth';

import { styles, ViewBody, TextInput, ViewInput, Input } from './Styles';

const PersonData = ({
  setName,
  name,
  setEmail,
  email,
  setPhone,
  phone,
  setPerson,
  setSku,
  setPicture,
}) => {
  useEffect(() => {
    const getUsers = async () => {
      const { user: userAuth } = await isAuthenticated();
      setPerson(userAuth.person._id);
      setSku(userAuth.sku);

      if (userAuth.person.name) {
        setName(userAuth.person.name);
      }

      if (userAuth.person.email) {
        setEmail(userAuth.person.email);
      }

      if (userAuth.person.image) {
        setPicture(userAuth.person.image);
      }

      if (userAuth.person.phone) {
        const phoneString = userAuth.person.phone.toString();
        const phoneEdit = phoneString.substring(2, phoneString.length);
        setPhone(phoneEdit);
      }
    };

    getUsers();
  }, [setEmail, setName, setPerson, setPhone, setPicture, setSku]);

  return (
    <ViewBody>
      <TextInput>Nome completo</TextInput>
      <ViewInput>
        <Input
          value={name}
          onChangeText={setName}
          autoFocus={true}
          autoCompleteType={'name'}
          returnKeyType={'next'}
        />
      </ViewInput>
      <TextInput>Email</TextInput>
      <ViewInput>
        <Input
          value={email}
          onChangeText={setEmail}
          autoCompleteType={'email'}
          autoCapitalize={'none'}
          returnKeyType={'next'}
          keyboardType={'email-address'}
        />
      </ViewInput>
      <TextInput>Celular do títular</TextInput>
      <ViewInput>
        <TextInputMask
          title="Telefone"
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          value={phone}
          onChangeText={maskedText => {
            setPhone(maskedText);
          }}
          style={styles.input}
        />
      </ViewInput>
    </ViewBody>
  );
};

export default PersonData;
