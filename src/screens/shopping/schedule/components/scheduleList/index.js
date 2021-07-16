import React, { useEffect, useState, useCallback } from 'react';

import moment from 'moment';
import 'moment/locale/en-nz';
import 'moment/locale/pt-br';
import SectionList from 'react-native-tabs-section-list';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

import {
  Container,
  styles,
  ViewHeaderList,
  ViewHeaderDay,
  TextHeaderList,
  ViewSectionHeader,
  TextSectionHeader,
  Header,
  TextHeader,
  ViewLootie,
  LootieContainer,
} from './Styles';
import HoursDay from '../hoursDays';
import loaderLootie from '../../../../../assets/animations/loader.json';
import listWeekDays from '../../../../../services/service/schedule/list';

const scheduleList = ({ company, coupon, navigation, typeSchedule }) => {
  const [data, setData] = useState(null);
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const limitWeek = 7;

  useEffect(() => {
    const getData = async () => {
      setData(null);
      if (company && company._id) {
        setDeliveryPrice(company.deliveryPrice);
        const weekDays = await listWeekDays(company._id, typeSchedule);
        if (weekDays) {
          // Salva os horários de atendimento
          let listDayWeek = [];
          let countDays = 0;
          for (let i = 0; listDayWeek.length < limitWeek; i++) {
            let dt = moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
              .utc()
              .add(i, 'days')
              .subtract(3, 'hours');

            const nameDayWeek = dt
              .locale('en-nz')
              .format('dddd')
              .toUpperCase();

            // Quando não tiver horários disponível no dia selecionado
            if (i === 0 && !weekDays.TODAY) {
              continue;
            }

            if (weekDays[nameDayWeek] && weekDays[nameDayWeek].length) {
              listDayWeek.push({
                index: countDays++ + '',
                _id: dt.format('DD'),
                day: dt.format('DD'),
                date: dt.format('YYYY-MM-DD'),
                week: i === 0 ? 'Hoje' : dt.locale('pt-br').format('dddd'),
                weekEnglish:
                  i === 0 ? 'TODAY' : dt.locale('en-nz').format('dddd'),
              });
            }
          }

          const listData = listDayWeek.map(dayWeek => {
            const hoursDay = weekDays[dayWeek.weekEnglish.toUpperCase()];

            return { title: dayWeek, data: hoursDay };
          });

          // console.log('data', listData);
          setData(listData);
        }
      }
    };

    getData();
  }, [company, typeSchedule]);

  const renderTab = useCallback(({ title, isActive }) => {
    return (
      <ViewHeaderList>
        <ViewHeaderDay isActive={isActive}>
          <TextHeaderList isActive={isActive}>
            {title.week === 'Hoje'
              ? title.week
              : title.week.replace('-feira', '').substring(0, 3)}
          </TextHeaderList>
          <TextHeaderList isActive={isActive} isNumber={true}>
            {title.day}
          </TextHeaderList>
        </ViewHeaderDay>
      </ViewHeaderList>
    );
  }, []);

  const renderSectionHeader = useCallback(({ section }) => {
    return (
      <ViewSectionHeader>
        <TextSectionHeader>
          {section.title.week.replace('-feira', '') +
            [', '] +
            moment(section.title.date).format('DD/MM/YYYY')}
        </TextSectionHeader>
      </ViewSectionHeader>
    );
  }, []);

  const renderItem = useCallback(
    ({ item, section }) => {
      return (
        <HoursDay
          item={item}
          coupon={coupon}
          deliveryPrice={deliveryPrice}
          navigation={navigation}
          typeSchedule={typeSchedule}
          date={section.title.date}
          company={company}
        />
      );
    },
    [company, coupon, deliveryPrice, navigation, typeSchedule],
  );

  const getItemLayout = sectionListGetItemLayout({
    // The height of the row with rowData at the given sectionIndex and rowIndex
    getItemHeight: (rowData, sectionIndex) => (sectionIndex === 0 ? 49 : 49),
    // These three properties are optional
    getSeparatorHeight: () => 1,
    getSectionHeaderHeight: () => 40, // The height of your section headers
    // getSectionFooterHeight: () => 100, // The height of your section footers
  });

  return (
    <Container>
      <Header>
        <TextHeader>Escolha o dia e hora da entrega</TextHeader>
      </Header>
      {data ? (
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          tabBarStyle={styles.tabBar}
          initialNumToRender={30}
          maxToRenderPerBatch={30}
          renderTab={renderTab}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          getItemLayout={getItemLayout}
        />
      ) : (
          <LootieContainer>
            <ViewLootie
              source={loaderLootie}
              resizeMode="contain"
              loop
              autoPlay
            />
          </LootieContainer>
        )}
    </Container>
  );
};

export default scheduleList;
