import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Header = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  height: 104px;
  padding-top: 30px;
  border-bottom-left-radius: 38px;
  border-bottom-right-radius: 38px;
`;

export const IconWrapper = styled.TouchableOpacity`
  margin-left: 5px;
`;

export const TextWrapper = styled.View`
  height: 100%;
  margin-left: 6px;
  padding: 15px 0 5px 0;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export const HeaderSubTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const AvatarImg = styled.Image.attrs({})`
  width: 54px;
  height: 54px;
`;
