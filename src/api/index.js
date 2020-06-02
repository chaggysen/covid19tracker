import axios from "axios";

// This is the API url
const url = "https://covid19.mathdro.id/api";

// Here we use async await to fetch the data
export const fetchData = async (country) => {
  // Here we create a changeableurl that takes the country as parameter
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    // The destructuring assignment syntax is a JS expression that makes it possible to unpack values from
    // arrays or properties from objects into distinct variables
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    // Here we return the variables we need to use
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    // For each country we only want to return its nam
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
