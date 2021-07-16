import React from 'react';
import {
  Header,
  HeaderTitle,
  IconWrapper,
  TextWrapper,
  HeaderSubTitle,
  AvatarImg,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';

const CustomHeader = ({title, subtitle, avatarImg, goBack}) => {
  return (
    <Header colors={['#1B7FD0', '#00b0ED']}>
      <IconWrapper onPress={() => goBack()}>
        <Icon name="chevron-left" size={34} color="#fff" />
      </IconWrapper>
      {avatarImg && <AvatarImg source={avatarImg} />}
      <TextWrapper>
        <HeaderTitle>{title}</HeaderTitle>
        {subtitle && (
          <HeaderSubTitle numberOfLines={1}>{subtitle}</HeaderSubTitle>
        )}
      </TextWrapper>
    </Header>
  );
};

CustomHeader.defaultProps = {
  title: "let's populate this title with something?",
  subtitle: 'Chuck Norris',
};

export default CustomHeader;
