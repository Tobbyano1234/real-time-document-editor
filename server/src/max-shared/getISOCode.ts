import path from "path";
import { loadJsonData } from "./defaultCurrencyForCountry";

let cachedCountryData: any[] | null = null;

async function loadCountryData() {
  if (cachedCountryData === null) {
    const countryFilePath = path.join(
      __dirname,
      "../customs/restcountries.json"
    );
    cachedCountryData = await loadJsonData(countryFilePath);
  }
  return cachedCountryData;
}

export const getISOCode = async (country: string) => {
  try {
    const countryData = await loadCountryData();
    return countryData.find(
    (c) => c.name.common.toLowerCase() === country.toLowerCase()
    )?.cca2;
  } catch (error) {
    return null;
  }
};
