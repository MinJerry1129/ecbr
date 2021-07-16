import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const Container = styled.View`
  margin-top: -15px;
  height: 200px;
  justify-content: center;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const ViewTotals = styled.View`
  justify-content: space-between;
  flex-direction: column;
  height: 150px;
`;

export const Totals = styled.View.attrs({ marginHorizontal: 30 })`
  flex-direction: row;
  justify-content: space-between;
`;

export const Text = styled.Text`
  color: ${props =>
    props.discount
      ? Colors.PRIMARY
      : props.isFree
        ? Colors.SUCCESS
        : '#909090'};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
`;
