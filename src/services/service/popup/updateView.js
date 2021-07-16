import api from '../../api';

const updateViewsPopup = async (popupId, post) => {
  try {
    const response = await api.put(`/tools/popup/updateViews/${popupId}`, post);
    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    console.log('Fail Popup Update', err);
    return null;
  }
};

export {updateViewsPopup};
