import { randomString } from "./auth";

export const generateMerchantRef = (type: string): string => {
  // Generate a custom orderID using nanoid
  const prefix = type === "employee" ? "EMP-" : "IND-";
  const merchantRef = `${prefix}${randomString({
    // ALPHABET:"",
    ID: 9,
  })}`.toUpperCase(); // Customize the length as needed

  return merchantRef;
};
