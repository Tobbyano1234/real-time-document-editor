export const formattedAmount = (amount: number, currency: string = 'NGN') => amount.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
