import api from '../../api';

const listWeekDays = async (companyId, typeSchedule) => {
  try {
    const response = await api.get(
      `/shopping/schedule/${companyId}?type=${typeSchedule}`,
    );

    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail DaysWeek List', err);
    return null;
  }
};

export default listWeekDays;
