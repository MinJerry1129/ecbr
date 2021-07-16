import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient)`
  flex: 1;
  opacity: 0.9;
`;

export const DrawerHeaderWrapper = styled.View`
  background: #1B7FD0;
  height: 100px;
  flex-direction: row;
`;

export const DrawerHeaderAvatar = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  margin-top: 60px;
  margin-left: 20px;
`;

export const AvatarName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const AvatarLocation = styled.Text`
  color: #6e6f71;
  margin-top: 10px;
  margin-left: 3px;
  font-weight: 400;
  font-size: 12px;
`;

export const DrawerHeaderTextWrapper = styled.View`
  flex: 1;
  margin-top: 74px;
  margin-left: 5px;
`;

export const Divider = styled.View`
  border-bottom-width: 1px;
  width: 86%;
  align-self: center;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;

export const MenuCategory = styled.Text`
  color: rgba(0, 0, 0, 0.5);
  padding-top: 20px;
  margin-left: 20px;
`;
