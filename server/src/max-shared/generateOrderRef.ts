import { randomString } from "./auth";

export const generateOrderRef = (): string => {
    // Generate a custom orderID using nanoid
    const prefix = "ORD-";
    const orderRef = `${prefix}${randomString({
        // ALPHABET:"",
        ID: 9
    })}`.toUpperCase(); // Customize the length as needed

    return orderRef;
};