
export const nairaFormat = (amount = 0) => `₦${
  (new Intl.NumberFormat(
    'en-US', 
    { 
      style: 'currency', 
      currency: "NGN" 
    }
  ).format(amount)
).slice(4)}`;
