import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchdata = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  const {
    data: { confirmed, recovered, deaths, lastUpdate },
  } = await axios.get(changeableUrl);
  return { confirmed, recovered, deaths, lastUpdate };
};

export const fetchDataDaily = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {}
};

export const country = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {}
};
