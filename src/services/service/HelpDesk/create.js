import moment from 'moment';
import api, { ErrorAxios } from '../../api';

const createTicket = async (
  name,
  phone,
  email,
  description,
  subject,
  person,
  priority,
  department,
  status,
  order,
  company,
) => {
  const body = {
    tickedId:
      moment().format('YYMMDDHHmm') + Math.floor(10 + Math.random() * 90),
    name,
    phone,
    email,
    description,
    subject,
    person,
    priority,
    department,
    status,
    order,
    company,
  };
  try {
    const response = await api.post('helpdesk/tickets/', body);
    const data = response.data;

    if (data && data.data) {
      return data.data;
    }

    console.log(data.data);

    return data;
  } catch (err) {
    let errorData = ErrorAxios(err, 'Fail createTicket');
    console.log(errorData);
    return null;
  }
};

export { createTicket };
