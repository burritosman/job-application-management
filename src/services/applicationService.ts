import rawData from "../data/applications.json";
import type { Application } from "../types/application";
import type { ApplicationStatus } from "../utils/constants";


let applications: Application[] = rawData.map((item) => ({
  ...item,
  status: item.status as ApplicationStatus,
}));

// Simulating backend calls with json data
export const getApplications = async (): Promise<Application[]> => {
  return new Promise((resolve) => {
      setTimeout(() => {
      resolve(rawData as Application[]);
      }, 300); 
  });
};

// Simulating backend call, adding new application to memory
export const addApplication = async (newApp: Application): Promise<Application> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      applications.push(newApp);
      resolve(newApp);
    }, 300);
  });
};

export const searchCompanies = async (query: string) => {
  const res = await fetch(
    `https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`
  );
  const data = await res.json();
  console.log(data)
  return data;
};

//   Original implementation of autocomplete using logo dev api, however requires secret key
// export const searchCompanies = async (query: string) => {
// if (!query) return [];

// const res = await fetch(
//     `https://api.logo.dev/search?q=${query}`,
//     {
//         headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_LOGO_API_KEY}`,
//         },
//     }
// );

// const data = await res.json();
// console.log(data)
// return data;
// };