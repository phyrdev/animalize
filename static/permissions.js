import { feedResults } from "@/prisma/report";

export const permissions = {
  createReport: ["admin", "super-admin", "receptionist"],
  viewReports: [
    "admin",
    "super-admin",
    "receptionist",
    "pathologist",
    "lab-technician",
  ],
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
  collectSamples: ["sample-collector", "admin", "super-admin"],
  feedResults: ["admin", "super-admin", "lab-technician"],
  reviewResults: ["pathologist", "admin", "super-admin"],
  takeAction: ["admin", "super-admin", "receptionist"],
  viewInvoice: ["admin", "super-admin", "receptionist"],
};
