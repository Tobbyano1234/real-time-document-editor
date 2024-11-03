import axios from "axios";

// Function to verify NIN
export const verifyNIN = async (nin: string, onNinNotFound = (nin: string):void => { throw new Error("invalid nin"); }) => {
    try {
        const response = await axios.get(`
        https://api.verxid.site/npc/unicef/verifyNin?nin=${nin}`);
        // console.log("res", response.data.npc)
        console.log("res", response.data.npc);
        console.log("res", response.data.npc);
        if (!response.data.npc.is_exists) onNinNotFound(nin);
        return response.data.npc;
    } catch (error) {
        console.error("NIN verification failed:", error.message);
        throw error;
    }
};


// // Usage example
// const nin = '38920621837'; // Replace with the NIN you want to verify

// // Create an async function and use await to call verifyNIN
// const verifyNINAsync = async () => {
//     try {
//         const response = await verifyNIN(nin);
//         console.log("res", response);
//         // Handle the response or perform further actions
//     } catch (error) {
//         console.error('NIN verification failed:', error.message);
//         // Handle the error
//     }
// };

// // Call the async function to initiate the verification process
// verifyNINAsync();


