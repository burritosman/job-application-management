// Collection of constant values to avoid duplication and easier updates
export const APPLICATION_STATUS = {
    APPLIED: "Applied",
    INTERVIEWING: "Interviewing",
    OFFER: "Offer",
    REJECTED: "Rejected",
 } as const;
  
 export type ApplicationStatus =
 typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];