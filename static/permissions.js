export const permissions = {
  createReport: ["admin", "super-admin", "receptionist"],
  previewReport: ["admin", "super-admin", "receptionist"],
  editReport: ["admin", "super-admin"],
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
  managePayments: ["admin", "super-admin"],
  collectSamples: ["sample-collector", "admin"],
};
