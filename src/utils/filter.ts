export const currency = (num: string | number) => {
  const n = Number(num) || 0;
  return n.toLocaleString();
};
