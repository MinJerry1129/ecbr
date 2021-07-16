import styled from 'styled-components/native';
import { Colors } from '../../../../styles';
import LootieView from 'lottie-react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const BoxBtnCart = styled.SafeAreaView`
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const ViewLootie = styled(LootieView)`
  height: 100px;
`;

export const LootieContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
