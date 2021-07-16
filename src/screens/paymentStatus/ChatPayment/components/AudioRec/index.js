import React, {useState} from 'react';
import LootieView from 'lottie-react-native';

import {Container, CustomIcon} from './styles';
import audioIcon from '../../../../../assets/images/audioIcon.png';
import recPulse from '../../../../../assets/animations/recordingPulse.json';

const AudioRec = ({onStart, onStop}) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    return onStart();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    return onStop();
  };

  const AnimateRecButton = () => {
    return (
      <LootieView
        source={recPulse}
        style={{width: 78, height: 98, marginRight: -25}}
        resizeMode="cover"
        autoPlay
        speed={3}
        loop
      />
    );
  };

  return (
    <Container
      onPressOut={handleStopRecording}
      onLongPress={handleStartRecording}>
      {isRecording ? <AnimateRecButton /> : <CustomIcon source={audioIcon} />}
    </Container>
  );
};

export default AudioRec;
