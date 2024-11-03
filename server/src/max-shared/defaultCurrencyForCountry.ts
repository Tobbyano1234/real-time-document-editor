import path from "path";
import { readFileAsync } from "./fileReader";

type CurrencyInfo = {
  currencyName?: string;
  currencyCode?: string;
  currencySymbol?: string;
  currencyFlag?: string;
  message?: string;
};

let cachedCountryData: any[] | null = null;
let cachedCurrencyData: any[] | null = null;
const CACHE_DURATION_MS = 3600 * 1000 * 24; // 24 hours

// Utility function to load JSON data
export const loadJsonData = async (filePath: string): Promise<any[]> => {
  const data = await readFileAsync(filePath);
  return JSON.parse(data);
};

// Cache invalidation function
export const invalidateCache = () => {
  cachedCountryData = null;
  cachedCurrencyData = null;
};

export const defaultCurrencyForCountry = async (
  countryName: string
): Promise<CurrencyInfo> => {
  try {
    // Load country data if not cached
    if (!cachedCountryData) {
      const countryFilePath = path.join(
        __dirname,
        "../customs/restcountries.json"
      );
      cachedCountryData = await loadJsonData(countryFilePath);
    }

    // Find the country by name (case-insensitive)
    const countryData = (cachedCountryData as any).find((item: any) => {
      return item.name.common.toLowerCase() === countryName.toLowerCase();
    });

    if (!countryData) {
      throw new Error(`Country not found: ${countryName}`);
    }

    const { currencies, name, flags } = countryData;

    // Load currency data if not cached
    if (!cachedCurrencyData) {
      const currencyFilePath = path.join(
        __dirname,
        "../customs/restCountryCurrency.json"
      );
      cachedCurrencyData = await loadJsonData(currencyFilePath);
    }

    // Find the currency information
    const restCountryData = (cachedCurrencyData as any).data.find(
      (item: any) => item.name.toLowerCase() === name.common.toLowerCase()
    );

    if (!restCountryData) {
      throw new Error("Currency information not found for this country");
    }

    const currencyCode = restCountryData.currency;
    const currencyData = currencies[currencyCode];
    const currencyName = currencyData.name;
    const currencySymbol = currencyData.symbol;
    const currencyFlag = flags.svg;

    if (!currencyData) {
      throw new Error("Currency name not found for this country");
    }

    // Set cache invalidation timeout
    setTimeout(invalidateCache, CACHE_DURATION_MS);

    return {
      currencyName,
      currencySymbol,
      currencyCode,
      currencyFlag,
    };
  } catch (error) {
    console.error(error);
    return { message: error.message } as CurrencyInfo;
  }
};

// import axios from "axios";
// import { GetAllCurrenciesPipe } from "../entrova-wallets/services";

// const axiosInstance = axios.create({
//   // timeout: 10000, // Set a longer timeout (in milliseconds), e.g., 10 seconds
// });

// Old implementation
// export const defaultCurrencyForCountry = async (
//   countryName: string
// ): Promise<CurrencyInfo> => {
//   try {
//     // Make a request to the rest-countries API to get information about the country
//     const response = await getCurrencyInfo(countryName);
//     // If the currency information is available, return it; otherwise, use a default currency
//     return {
//       currencyName: response.currencyName,
//       currencyCode: response.currencyCode,
//       currencySymbol: response.currencySymbol,
//       currencyFlag: response.currencyFlag,
//     };
//   } catch (error) {
//     // Handle errors (e.g., the country name is not found)
//     console.error(error);
//     return { message: error.message }; // Use a default currency in case of an error
//   }
// };

// export const getCurrencyCode = async (country: string): Promise<string> => {
//   try {
//     // Make a request to get the currency code
//     const response = await axiosInstance.get(`https://countriesnow.space/api/v0.1/countries/info?returns=currency`);
//     const currencyCode = response.data.data.find((item: any) => item.name.toLowerCase() === country.toLowerCase());

//     if (!currencyCode) {
//       throw new Error("Currency information not found for this country");
//     };

//     return currencyCode.currency;
//   } catch (error) {
//     console.error("Error fetching currency code:", error);
//     throw error;
//   }
// };

// Function to fetch and return the currency name
// export const getCurrencyInfo = async (countryName: string): Promise<any> => {
//   try {
//     const currencyCode = await getCurrencyCode(countryName);
//     // Make a request to get the currency name
//     const response = await axiosInstance.get(
//       `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
//     );

//     const currencyData = response.data[0].currencies[currencyCode];
//     const currencyFlag = response.data[0].flags.svg;
//     if (!currencyData) {
//       throw new Error("Currency name not found for this country");
//     }

//     return { ...currencyData, currencyCode, currencyFlag };
//   } catch (error) {
//     console.error("Error fetching currency name:", error);
//     throw error;
//   }
// };

// import axios from "axios";
// import fs from "fs";
// import path from "path";

// const axiosInstance = axios.create({
//   // timeout: 10000, // Set a longer timeout (in milliseconds), e.g., 10 seconds
// });

// type CurrencyInfo = {
//   currencyName?: string;
//   currencyCode?: string;
//   currencySymbol?: string;
//   currencyFlag?: string;
//   message?: string;
// };

// const getAllCurrencies = async () => {
//   try {
//     const response = await axiosInstance.get("https://countriesnow.space/api/v0.1/countries/info?returns=currency");
//     const currencies = response.data.data;

//     const currencyData = {};

//     for (const country of currencies) {
//       const currencyCode = country.currency;
//       const response = await axiosInstance.get(`https://restcountries.com/v3.1/name/${country.name}?fullText=true`);
//       const currencyInfo = response.data[0].currencies[currencyCode];
//       const currencyFlag = response.data[0].flags.svg;

//       (currencyData as any)[country.name] = {
//         currencyName: currencyInfo.name,
//         currencyCode: currencyCode,
//         currencySymbol: currencyInfo.symbol,
//         currencyFlag: currencyFlag,
//       };
//     }

//     const filePath = path.join(__dirname, "newcurrencies.json");
//     fs.writeFileSync(filePath, JSON.stringify(currencyData, null, 2));

//     console.log("All currencies information saved to currencies.json");
//   } catch (error) {
//     console.error("Error fetching currencies information:", error);
//   }
// };

// const getAllCurrencies = async () => {
//   try {
//     const countriesData = require('../customs/restcountries.json');
//     const currencyData = require('../customs/restCountryCurrency.json');

//     const currencyInfo = {};

//     for (const country of countriesData) {
//       const currencyCode = country.currency;
//       const currency = currencyData.data.find((currency: any) => currency.currency === currencyCode); // find the currency object
//       const currencyFlag = country.flags.svg;

//       if (currency) {
//         (currencyInfo as any)[country.name] = {
//           currencyName: currency.name,
//           currencyCode: currencyCode,
//           currencySymbol: currency.symbol, // you can add the symbol if available
//           currencyFlag: currencyFlag,
//         };
//       } else {
//         console.log(`Currency not found for ${country.name}`);
//       }
//     }

//     const filePath = path.join(__dirname, "newcurrencies.json");
//     fs.writeFileSync(filePath, JSON.stringify(currencyInfo, null, 2));

//     console.log("All currencies information saved to currencies.json");
//   } catch (error) {
//     console.error("Error fetching currencies information:", error);
//   }
// };

// (async () => {
//   const me = await defaultCurrencyForCountry("Nigeria")
//   // console.log('me', { me })
//   return me;
// })()
