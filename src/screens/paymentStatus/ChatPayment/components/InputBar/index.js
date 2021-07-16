import React, { useState } from 'react';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import LootieView from 'lottie-react-native';

import { Container, Wrapper, Input } from './styles';
import AudioRec from '../AudioRec';
import waveAnimation from '../../../../../assets/animations/recordingWave.json';
import { Colors } from '../../../../../styles';

const InputBar = ({
  onchangeText,
  onSubmitEditing,
  onSubmitImage,
  senderType,
  value,
}) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleAudioRecStart = () => {
    setIsRecording(true);
  };

  const handleAudioRecStop = () => {
    setIsRecording(false);
  };

  const WaveOverlay = () => (
    <LootieView
      source={waveAnimation}
      speed={1}
      style={{ height: 100 }}
      loop
      autoPlay
    />
  );

  return (
    <Container colors={['#1B7FD0', '#00b0ED']}>
      <Wrapper>
        {isRecording && <WaveOverlay />}
        <Input
          onChangeText={onchangeText}
          onSubmitEditing={onSubmitEditing}
          value={value}
          placeholder={isRecording ? 'gravando...' : 'digite uma mensagem'}
          placeholderTextColor={Colors.DARK}
        />

        <Icon
          name="add-a-photo"
          color="#A3A3A3"
          size={26}
          onPress={() => onSubmitImage()}
        />
      </Wrapper>
      <Icon
        name="send"
        color="#fff"
        size={32}
        onPress={() => onSubmitEditing()}
      />
      {/* {senderType === 'text' ? (
        <Icon
          name="send"
          color="#fff"
          size={32}
          onPress={() => onSubmitEditing()}
        />
      ) : (
        <AudioRec
          onStart={() => handleAudioRecStart()}
          onStop={() => handleAudioRecStop()}
        />
      )} */}
    </Container>
  );
};

export default InputBar;
