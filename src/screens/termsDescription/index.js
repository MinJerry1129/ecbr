import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {Colors} from '../../styles';
import LinearGradient from 'react-native-linear-gradient';
import {getAuthenticated} from '../../services/userAuth';
import {updateCustomer} from '../../services/service/customer';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TermsDescription({navigation}) {
  const go = async status => {
    if (status) {
      const resultUser = await getAuthenticated();

      if (resultUser === false) {
        navigation.navigate('Login', {
          screen: 'login',
        });
        return;
      }

      await updateCustomer(resultUser.user._id, {termsNotAccepted: false});

      navigation.navigate('Home', {screen: 'Home'});
    } else {
      navigation.navigate('Login', {screen: 'Login'});
    }
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <LinearGradient
          colors={Colors.GRADIENTE_GREY}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.container}>
          <View style={styles.content}>
            <View>
              <Icon
                name="clear"
                size={28}
                style={styles.icon}
                onPress={() => navigation.goBack()}
              />
            </View>
            <Text style={styles.txtHeader}>Termos e condições de uso</Text>
            <Text style={styles.description}>
              As seguintes condições de uso regulam o acesso e a utilização do
              aplicativo Economize BR por parte dos usuários. Para o uso deste
              aplicativo, o usuário manifesta estar de acordo sem reservas com
              as presentes condições de uso. O economize BR se reserva o direito
              unilateral de modificar as condições de acesso ao aplicativo,
              assim como o conteúdo nele incluido ou as condições gerais de uso
              compiladas nesse documento.
            </Text>
            <Text style={styles.txtMiniHeader}>OBJETO</Text>
            <Text style={styles.description}>
              O Economize BR é um aplicativo que permite aos usuários visualizar
              as ofertas dos supermercados da sua cidade através de encartes,
              tablóides e ofertas cadastradas pelos próprios anunciantes. O
              Economize BR não é fornecedor de quaisquer produtos ou serviços
              anunciados no aplicativo. Prestamos apenas um serviço que consiste
              na divulgação de ofertas através de uma plataforma móvel para
              smartphones que fornece espaços para que Usuários
              anunciantes/potenciais vendedores anunciem, oferecendo à venda, os
              seus próprios produtos e serviços para que eventuais interessados
              na compra dos itens, os Usuários/potenciais compradores, possam
              negociar direta e exclusivamente entre si. O Economize BR,
              portanto, possibilita aos Usuários visualizar as ofertas dos
              anunciantes, sem qualquer intervenção do mesmo na negociação ou na
              concretização do negócios. Desta forma, ressalta-se que o
              Economize BR não fornece quaisquer produtos ou serviços anunciados
              pelos anunciantes no aplicativo.
            </Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={() => go(false)}>
                <Text style={styles.buttonText}>Não concordo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => go(true)}>
                <Text style={styles.buttonText}>Li e concordo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
}
