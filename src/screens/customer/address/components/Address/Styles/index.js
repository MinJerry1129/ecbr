import styled from 'styled-components/native';
import { Typography } from '../../../../../../styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  margin-right: 15px;
`;

export const Text = styled.Text`
  font-size: ${Typography.FONT_SIZE_13};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
