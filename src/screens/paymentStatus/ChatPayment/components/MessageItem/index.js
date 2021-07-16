import React from 'react';
import styled from 'styled-components/native';

import msgChevronLeft from '../../../../../assets/images/msgChevronLeft.png';
import msgChevronRight from '../../../../../assets/images/msgChevronRight.png';

const MessageItem = ({item}) => {
  return (
    <Container>
      {item.person !== 'customer' ? (
        <ChevronWrapper>
          <MessageChevron source={msgChevronLeft} />
          <ContainerMessage>
            <MessageText>{item.message}</MessageText>
          </ContainerMessage>
        </ChevronWrapper>
      ) : (
        <ChevronWrapperReceive>
          <ContainerMessageReceive>
            <MessageText>{item.message}</MessageText>
          </ContainerMessageReceive>
          <MessageChevron source={msgChevronRight} />
        </ChevronWrapperReceive>
      )}
    </Container>
  );
};

const Container = styled.View`
  margin: 0 18px;
`;

const MessageText = styled.Text`
  color: #555555;
`;

const ContainerMessage = styled.View`
  margin-top: 7px;
  margin-right: auto;
  min-width: 140px;
  min-height: 42px;
  border-radius: 12px;
  padding: 10px 15px;
  background: #ededed;
`;

const ContainerMessageReceive = styled.View`
  margin-top: 7px;
  margin-left: auto;
  min-width: 140px;
  min-height: 42px;
  border-radius: 12px;
  padding: 10px 15px;
  background: #e7f0f7;
`;

const MessageChevron = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 10px;
  height: 10px;
`;

const ChevronWrapper = styled.View`
  margin-right: auto;
  align-items: baseline;
  flex-direction: row;
`;

const ChevronWrapperReceive = styled.View`
  margin-left: auto;
  align-items: center;
  flex-direction: row;
`;
export default MessageItem;
