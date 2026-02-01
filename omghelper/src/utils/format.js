export const formatNumber = (num) => {
  if (num < 0) return '?';
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const shortenName = (name) => name;