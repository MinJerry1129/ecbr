import api, {ErrorAxios} from '../../api';
import {queryString} from '../../../utils';

const listProductDepartments = async (company, page, limit) => {
  try {
    const setLimit = limit || 10;
    const setPage = page || 1;
    const response = await api.get(
      `/product/department/${company}?limit=${setLimit}&departmentPage=${setPage}`,
    );
    const data = response.data;
    return data;
  } catch (err) {
    ErrorAxios(err, 'Fail listProductDepartments');
    return [];
  }
};

const nextProductsDepartments = async (company, department, page) => {
  try {
    const getQuery = queryString({
      department,
      page,
    });

    const response = await api.get(
      `/product/department/${company}?${getQuery}`,
    );
    const data = response.data;
    return data;
  } catch (err) {
    return [];
  }
};

export {listProductDepartments, nextProductsDepartments};
