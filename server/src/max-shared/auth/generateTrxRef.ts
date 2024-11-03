import { v4 as uuidv4 } from 'uuid';

export const generateTrxRef = (userID: string, companyName?: string) => {
  return companyName
    ? `${companyName.replace(/\s+/g, '-')}-EN${uuidv4().substring(0, 6)}${String(userID).substring(7, 9)}`
    : `EN${Date.now()}${String(userID).substring(7, 9)}`;
  // return companyName
  //   ? `${companyName.replace(/\s+/g, '-')}-EN${Date.now().toString().substring(0, 6)}${String(userID).substring(7, 9)}`
  //   : `EN${Date.now()}${String(userID).substring(7, 9)}`;
  // return `${companyName?.replace(/\s+/g,'-')}-EN${Date.now()}${String(userID).substring(11, 13)}`;
  // return `${companyName?.replace(/\s+/g,'-')}-EN${Date.now()}${String(userID).substring(7, 9)}`;
};

export const generateInvoiceNumber = () => {
  const timestamp = Date.now();
  return `INV-${timestamp}`;
};



// export const generateInvoiceNumber = () => {
// return  `INV-${Math.floor(100 + Math.random() * 899)}${Math.floor(1000 + Math.random() * 9999)}`;
// };

// const me = generateInvoiceNumber();
// console.log(me)

// let invoiceCounter = 0;

// export const generateInvoiceNumber = () => {
//   invoiceCounter += 1;
//   const paddedCounter = invoiceCounter.toString().padStart(4, '0');
//   return `INV-${paddedCounter}`;
// };

// Example usage
// let me = generateInvoiceNumber();
// console.log(me); // Examples: INV-0001, INV-0023, INV-2353, ...
//  me = generateInvoiceNumber();
//  console.log(me); // Examples: INV-0001, INV-0023, INV-2353, ...
//  me = generateInvoiceNumber();
// console.log(me); // Examples: INV-0001, INV-0023, INV-2353, ...
