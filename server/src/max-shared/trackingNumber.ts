import { randomString } from "./auth";

export const generateTrackingNumber = (): string => {
    // Generate a unique tracking number using nanoid
    // const trackingNumber = nanoid(10); // Customize the length as needed
    const trackingNumber = randomString({ ALPHABET: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", ID: 10 });

    return trackingNumber;
};
