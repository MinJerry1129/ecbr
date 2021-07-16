/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { StorageSet, StorageGet } from '../../../services/deviceStorage';
import { Typography, Colors } from '../../../styles';

var loop = null;

const TimeRestartCode = ({ setReinvent }) => {
  const [time, setTime] = useState(1);
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDuration();
  }, []);

  const setDuration = async () => {
    let dateSMS = await StorageGet('@dateSMS');

    if (!dateSMS) {
      await StorageSet('@dateSMS', moment().format());
      dateSMS = moment().format();
    }

    let now = moment();
    let duration = moment.duration(now.diff(dateSMS));
    let inSeconds = Math.round(duration.asSeconds());
    setTime(60 - inSeconds);

    if (inSeconds < 60) {
      loop = setInterval(() => {
        refreshTime();
      }, 1000);
    } else {
      setReinvent(true);
    }

    return () => {
      clearInterval(loop);
    };
  };

  const refreshTime = async () => {
    let now = moment();
    let dateSMS = null;

    if (date === null) {
      dateSMS = await StorageGet('@dateSMS');
      setDate(dateSMS);
    } else {
      dateSMS = date;
    }

    let duration = moment.duration(now.diff(dateSMS));
    let inSeconds = Math.round(duration.asSeconds());
    setTime(60 - inSeconds);

    if (inSeconds >= 60) {
      setReinvent(true);
      clearInterval(loop);
    }
  };

  return (
    <View>
      <Text style={styles.txt}>Aguarde {time}</Text>
    </View>
  );
};

export default React.memo(TimeRestartCode);

const styles = StyleSheet.create({
  txt: {
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.GRAY_DARK,
    marginTop: 10,
    width: '90%',
  },
});
