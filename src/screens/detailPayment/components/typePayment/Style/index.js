import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const Header = styled.SafeAreaView`
  height: 70px;
  background-color: ${Colors.GREY_BACKGROUND};
`;

export const HeaderBody = styled.View.attrs({ marginHorizontal: 30 })`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextHeader = styled.Text`
  color: ${Colors.PRIMARY};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
`;

export const Image = styled.Image`
  height: 16px;
  width: 21px;
`;

export const Body = styled.View.attrs({ marginHorizontal: 30 })`
  height: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextLoading = styled.Text`
  color: ${Colors.PRIMARY};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_15 + 'px'};
`;

export const TouchChange = styled.TouchableOpacity`
  width: 20%;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`;

export const TextChange = styled.Text`
  color: ${Colors.PRIMARY};
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: ${Typography.FONT_SIZE_13 + 'px'};
`;

export const ViewPayment = styled.View`
  align-items: center;
  flex-direction: row;
`;
