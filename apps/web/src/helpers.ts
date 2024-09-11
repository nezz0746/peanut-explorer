export const formatAmount = (amount: string) => {
  const num = parseFloat(amount);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.00$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.00$/, "") + "k";
  }
  if (num < 1) {
    return num.toFixed(8).replace(/0+$/, "");
  }
  return num.toFixed(2).replace(/\.00$/, "");
};
