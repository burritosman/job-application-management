import type { ApplicationStatus } from "../utils/constants";

export type Application = {
    id: number;
    role: string;
    company: string;
    status: ApplicationStatus;
    date: string;
  };