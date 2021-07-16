export const fixedNumbers = (value, fixed) => {
  return Number(value)
    .toFixed(fixed)
    .replace('.', ',');
};
