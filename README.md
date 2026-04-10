# Job Application Management

## Folder Structure
// Created folders to have separation of concerns, providing modular and reusable code
src/
│   
// In components and pages folder, store items within subfolders, assuming that in production env, each folder would also store corresponding css and test file
├── components/        # Reusable UI components
├── pages/             # Page-level components
│
├── services/          # APIs
├── types/             # TypeScript type definitions
├── utils/             # Reusable validations, constants
├── context/           # Global state management

## Implemented features
1. On Home page, display applications json data into a table
2. "Add application" button to open a form popup, allowing users to add new data
3. utils/validation.ts to store reusable field validations, simplified to just required validation
4. Form submit simulates backend call using a service to add application, appends to table
5. Theme toggle on NavBar, saved when user leaves and reopen page
6. External API call to clearbit to perform auto complete when user searches for company within the form, use extracted domains to load logo images from Logo.dev cdn 
7. Deployed on Azure using free plan
8. Simple mobile responsiveness
