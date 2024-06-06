export const permissions = {
  createReport: ["admin", "super-admin", "receptionist"],
  manageFacilities: ["admin", "super-admin"],
  manageEmployees: ["admin", "super-admin"],
  manageIssues: ["admin", "super-admin"],
  createIssue: [
    "admin",
    "super-admin",
    "receptionist",
    "pathologist",
    "sample-collector",
  ],
};
