export const toKobo = (amount: number) => {
  return amount * 100;
};

export const calculateTotalCost = (
  originalCost: number,
  percentageDeducation: number,
) => {
  return (percentageDeducation / 100) * originalCost + originalCost;
};

export const toNaira = (amount: number) => {
  return amount / 100;
};

export const formatNaira = (val: number | bigint) => {
  const nairaSymbol = "\u{020A6}";
  return nairaSymbol + new Intl.NumberFormat("en-US").format(val);
};
