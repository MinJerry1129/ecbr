/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Colors, Typography } from '../../../styles';
import moment from 'moment';
import 'moment/locale/pt-br';

const CalenderComponent = ({ dataCurrent }) => {
  const [daysWeeks, setDaysWeeks] = useState([]);
  const limitWeek = 7;

  useEffect(() => {
    let listDayWeek = [];
    for (let i = 0; i < limitWeek; i++) {
      let dt = moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
        .utc()
        .add(i, 'days')
        .subtract(3, 'hours');

      listDayWeek.push({
        _id: dt.format('DD'),
        day: dt.format('DD'),
        week: dt.format('dddd'),
      });
    }

    if (listDayWeek[0]) {
      dataCurrent(listDayWeek[0]);
    }

    setDaysWeeks(listDayWeek);
  }, []);

  const changeData = (item) => {
    dataCurrent(item);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}>
      {daysWeeks.map((item) => (
        <View key={`${item._id}`}>
          <TouchableOpacity
            style={styles.cart}
            activeOpacity={0}
            onPress={() => changeData(item)}>
            <Text style={styles.txtWeekSelect}>
              {item.week.replace('-feira', '')}
            </Text>
            <Text style={[styles.txtWeekSelect, styles.txtCenter]}>
              {item.day}
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
};

export default CalenderComponent;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.GREY,
    paddingTop: 8,
  },
  cart: {
    paddingHorizontal: 20,
    borderRightWidth: 0.5,
    marginBottom: 8,
  },
  txtWeekSelect: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtCenter: {
    textAlign: 'center',
  },
  txtWeek: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  divider: {
    borderColor: Colors.GREY,
    borderWidth: 0.5,
  },
});
