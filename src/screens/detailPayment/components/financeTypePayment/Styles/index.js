import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const styles = StyleSheet.create({
  iconCard: {
    color: Colors.PRIMARY,
  },
});

export const ViewIcon = styled.View`
  align-items: flex-start;
  justify-content: center;
`;

export const ViewBody = styled.View``;

export const TxtCard = styled.Text`
  font-size: ${Typography.FONT_SIZE_12 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  color: ${Colors.BLACK};
  margin-left: 10px;
`;

export const ViewLoading = styled.View``;

export const TextLoading = styled.Text`
  color: ${Colors.PRIMARY};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
`;
