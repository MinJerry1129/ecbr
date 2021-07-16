import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})``;

export const CustomIcon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 32px;
  height: 32px;
`;

export const RecOverlayWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  border: 1px solid red;
`;
