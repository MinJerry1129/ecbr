import LootieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { Typography } from '../../../../../../styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-right: 15px;
  flex-direction: row;
`;

export const ViewGpsText = styled.View`
  flex: 1;
`;

export const Text = styled.Text`
  font-size: ${Typography.FONT_SIZE_13};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;

export const ViewGpsLoader = styled.View`
  margin-top: -10px;
  align-items: center;
  justify-content: center;
`;

export const ViewLootie = styled(LootieView)`
  height: 60px;
`;
