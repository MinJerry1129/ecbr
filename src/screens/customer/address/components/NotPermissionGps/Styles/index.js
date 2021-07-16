import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-right: 15px;
  flex-direction: row;
`;

export const Text = styled.Text`
  margin-top: 2px;
  margin-left: 2px;
  font-size: ${Typography.FONT_SIZE_13};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
