export const APPLICATION_STATUS = {
    APPLIED: "Applied",
    INTERVIEWING: "Interviewing",
    OFFER: "Offer",
    REJECTED: "Rejected",
 } as const;
  
 export type ApplicationStatus =
 typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];