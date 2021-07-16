import styled from 'styled-components/native';

import { Colors, Typography } from '../../../../../../styles';

export const Container = styled.View`
  height: 150px;
  background-color: ${Colors.WHITE};
  margin-bottom: 20px;
`;

export const ViewTotalsHorizontal = styled.View.attrs({ marginHorizontal: 20 })`
  flex: 1;
`;

export const ViewTotalVertical = styled.View`
  height: 140px;
  margin-top: 15px;
  justify-content: space-between;
`;

export const ViewLineTotal = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const TextTotals = styled.Text`
  color: ${props => (props.discount ? Colors.PRIMARY : Colors.GRAY)};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
`;
