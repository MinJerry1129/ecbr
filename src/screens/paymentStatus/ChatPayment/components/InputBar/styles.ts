import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import {Colors} from '../../../../../styles';

export const Container = styled(LinearGradient)`
  height: 74px;
  z-index: 9999;
  align-items: center;
  flex-direction: row;
  padding: 0 14px;
`;

export const Input = styled.TextInput`
  color: ${Colors.BLACK};
  padding: 0 5px;
  flex: 1;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  height: 45px;
  border-radius: 22.5px;
  flex: 1;
  margin: 0 8px;
  background: #fff;
`;
