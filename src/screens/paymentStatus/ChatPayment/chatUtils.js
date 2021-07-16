import ImagePicker from 'react-native-image-picker';

const later = delay =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });

const launchImageLibrary = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchImageLibrary(options, response => {
    // console.log('Response = ', response);

    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      // console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {uri: response.uri};
      // console.log('Source', source);
      // console.log('response', JSON.stringify(response));
      /*
      this.setState({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri,
      });
      */
    }
  });
};

const chooseImage = async () => {
  return new Promise((resolve, reject) => {
    try {
      let options = {
        title: 'Selecione uma Imagem',
        takePhotoButtonTitle: 'Tirar uma Foto',
        chooseFromLibraryButtonTitle: 'Abrir Galeria',
        cancelButtonTitle: 'Cancelar',
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          reject({type: 'cancel', message: 'User cancelled image picker'});
        } else if (response.error) {
          reject({type: 'error', message: response.error});
        } else if (response.customButton) {
          //console.log('User tapped custom button: ', response.customButton);
        } else {
          //const source = {uri: response.uri};
          const source = {
            uri: `data:${response.type};base64, ${response.data}`,
          };

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          // alert(JSON.stringify(response));
          //console.log('response', JSON.stringify(response));

          resolve({
            type: response.type,
            source,
          });
        }
      });
    } catch (err) {
      reject({
        type: 'ERR_ALL',
        error: err,
      });
    }
  });
};

export {launchImageLibrary, chooseImage, later};
