import {Alert} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

const signInFacebook = async callBack => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'Usuário cancelou a requisição ao Facebook';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Algo de errado aconteceu ao tentar obter o acesso';
    }

    const facebookCredential = await auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    const user = await auth().signInWithCredential(facebookCredential);

    callBack();
    callBack(user, 'facebook');
  } catch (err) {
    console.log('Login Facebook Error', err);
    return Alert.alert(err);
  }
};

export {signInFacebook};
