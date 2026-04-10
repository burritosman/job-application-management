import rawData from "../data/applications.json";
import type { Application } from "../types/application";
import type { ApplicationStatus } from "../utils/constants";

// Use as memory for applications instead of DB
let applications: Application[] = rawData.map((item) => ({
  ...item,
  status: item.status as ApplicationStatus,
}));

// Simulating backend call and delay to get all applications from json data
export const getApplications = async (): Promise<Application[]> => {
  return new Promise((resolve) => {
      setTimeout(() => {
      resolve(rawData as Application[]);
      }, 500); 
  });
};

// Simulating backend call, adding new application to memory
export const addApplication = async (newApp: Application): Promise<Application> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      applications.push(newApp);
      resolve(newApp);
    }, 500);
  });
};

// Call external API to receive list of companies associated with inputted string
export const searchCompanies = async (query: string) => {
  const res = await fetch(
    `https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`
  );
  const data = await res.json();
  return data;
};