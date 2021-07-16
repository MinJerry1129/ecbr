import React from 'react';
import {View} from 'react-native';

const createRows = async (data, columns) => {
  const rows = Math.floor(data.length / columns);
  let lastRowElements = data.length - rows * columns;

  while (lastRowElements !== columns) {
    data.push({
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true,
    });
    lastRowElements += 1;
  }
  return data;
};

const viewRows = (item, styleItem) => {
  if (item.empty) {
    // eslint-disable-next-line react-native/no-inline-styles
    return <View style={[styleItem, {backgroundColor: 'transparent'}]} />;
  }
};

export {createRows, viewRows};
