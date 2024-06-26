export const organizationTypes = [
  "Veterinary Clinic",
  "Animal Hospital",
  "Pathology Lab",
];

export const currencies = [
  {
    abbr: "USD",
    name: "United States Dollar",
    symbol: "$",
  },
  {
    abbr: "EUR",
    name: "Euro",
    symbol: "€",
  },

  {
    abbr: "INR",
    name: "Indian Rupee",
    symbol: "₹",
  },

  {
    abbr: "GBP",
    name: "British Pound",
    symbol: "£",
  },
];

export const petsex = [
  { label: "Male intact", value: "male-intact" },
  { label: "Male neutered", value: "male-neutered" },
  { label: "Female intact", value: "femamale-intact" },
  { label: "Female spayed", value: "femamale-spayed" },
];

export const petspecies = [
  { label: "Canine", value: "canine" },
  { label: "Feline", value: "feline" },
  { label: "Avian", value: "avian" },
];

export const petbreeds = [
  { label: "Labrador", value: "labrador" },
  { label: "Pug", value: "pug" },
  { label: "Beagle", value: "beagle" },
  { label: "Bulldog", value: "bulldog" },
  { label: "Boxer", value: "boxer" },
  { label: "Dalmatian", value: "dalmatian" },
  { label: "German Shepherd", value: "german-shepherd" },
  { label: "Golden Retriever", value: "golden-retriever" },
  { label: "Poodle", value: "poodle" },
  { label: "Rottweiler", value: "rottweiler" },
  { label: "Shih Tzu", value: "shih-tzu" },
  { label: "Siberian Husky", value: "siberian-husky" },
  { label: "Yorkshire Terrier", value: "yorkshire-terrier" },
  { label: "Siamese", value: "siamese" },
  { label: "Persian", value: "persian" },
];

export const navmenuitems = [
  {
    name: "Home",
    visibleSm: true,
    access: [
      "super-admin",
      "admin",
      "receptionist",
      "pathologist",
      "sample-collector",
      "lab-technician",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79zm-2-1V9.978l-7-5.444l-7 5.444V19z"
        ></path>
      </svg>
    ),
    path: "/dashboard",
  },
  {
    name: "Reports",
    visibleSm: true,
    access: [
      "super-admin",
      "admin",
      "receptionist",
      "pathologist",
      "sample-collector",
      "lab-technician",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 48 48"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={4}
        >
          <path d="M41 14L24 4L7 14v20l17 10l17-10z"></path>
          <path strokeLinecap="round" d="M24 22v8m8-12v12m-16-4v4"></path>
        </g>
      </svg>
    ),
    path: "/dashboard/reports",
  },
  {
    name: "People",
    access: ["admin", "super-admin"],
    visibleSm: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 12 12"
      >
        <path
          fill="currentColor"
          d="M3 4a1 1 0 1 1 2 0a1 1 0 0 1-2 0m1-2a2 2 0 1 0 0 4a2 2 0 0 0 0-4m4 2.5a.5.5 0 1 1 1 0a.5.5 0 0 1-1 0M8.5 3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M1 8.25C1 7.56 1.56 7 2.25 7h3.5C6.44 7 7 7.56 7 8.25v.048a1 1 0 0 1-.008.109a2 2 0 0 1-.045.26a2.2 2.2 0 0 1-.355.768C6.168 10.018 5.378 10.5 4 10.5s-2.168-.482-2.592-1.065a2.2 2.2 0 0 1-.4-1.028L1 8.297zm1 .026l.002.027q.004.043.023.129c.027.113.082.264.192.415c.2.276.66.653 1.783.653s1.582-.377 1.783-.653A1.2 1.2 0 0 0 6 8.277V8.25A.25.25 0 0 0 5.75 8h-3.5a.25.25 0 0 0-.25.25zM8.499 10q-.531-.002-.933-.1a2.9 2.9 0 0 0 .383-.942q.232.04.55.042c.89 0 1.228-.272 1.36-.437a.7.7 0 0 0 .14-.316v-.005A.25.25 0 0 0 9.749 8H7.986a2.24 2.24 0 0 0-.365-1H9.75c.69 0 1.25.56 1.25 1.25v.017a1 1 0 0 1-.007.093a1.67 1.67 0 0 1-.352.827c-.369.46-1.03.813-2.141.813"
        ></path>
      </svg>
    ),
    path: "/dashboard/people",
  },
  {
    name: "Issues",
    visibleSm: true,
    access: ["super-admin", "admin"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="M1.5 8a6.5 6.5 0 0 1 13 0A.75.75 0 0 0 16 8a8 8 0 1 0-8 8a.75.75 0 0 0 0-1.5A6.5 6.5 0 0 1 1.5 8"
        ></path>
        <path
          fill="currentColor"
          d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m1.5 1.75a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m2.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5z"
        ></path>
      </svg>
    ),
    path: "/dashboard/issues",
  },
  {
    name: "Facilities",
    visibleSm: false,
    access: ["super-admin", "admin"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.55"
          d="M6 18h8M3 22h18m-7 0a7 7 0 1 0 0-14h-1m-4 6h2m-2-2a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Zm3-6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
        />
      </svg>
    ),
    path: "/dashboard/facilities",
  },
  {
    name: "Payments",
    visibleSm: true,
    access: ["super-admin", "admin"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <g fill="none" fillRule="evenodd">
          <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
          <path
            fill="currentColor"
            fillRule="nonzero"
            d="M17 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
          ></path>
          <path
            fill="currentColor"
            d="m4.813 5.728l11-3.143A2.5 2.5 0 0 1 19 4.989V6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.045.835-1.993 1.813-2.272m11.55-1.22a.5.5 0 0 1 .637.48V6h-5.86zM5 8h14v10H5z"
          ></path>
        </g>
      </svg>
    ),
    path: "/dashboard/payments",
  },
  {
    name: "Settings",
    access: [
      "super-admin",
      "admin",
      "receptionist",
      "pathologist",
      "sample-collector",
      "lab-technician",
    ],
    visibleSm: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11 11 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.5 11.5 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11 11 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.5 11.5 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51ZM25.21 24l-3.43-1.16a8.9 8.9 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.4 9.4 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.9 8.9 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.4 9.4 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20Z"
        ></path>
        <path
          fill="currentColor"
          d="M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6m0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4"
        ></path>
      </svg>
    ),
    path: "/dashboard/settings",
  },
];

export const paymentmodes = [
  { label: "Cash", value: "cash" },
  { label: "Card", value: "card" },
  { label: "Cheque", value: "cheque" },
  { label: "Wallets", value: "wallets" },
  { label: "UPI", value: "upi" },
];

export const paymentstatus = [
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
  { label: "Refunded", value: "refunded" },
];

export const employeeroles = [
  //   { label: "Super Admin", value: "super-admin" },
  { label: "Admin", value: "admin" },
  { label: "Receptionist", value: "receptionist" },
  { label: "Laboratory technician", value: "lab-technician" },
  { label: "Pathologist", value: "pathologist" },
  { label: "Sample Collector", value: "sample-collector" },
];

export const actionslist = [
  {
    label: "Create fresh report",
    url: "/dashboard/reports/create",
    access: ["super-admin", "admin", "receptionist"],
  },
  {
    label: "Add new facility",
    url: "/dashboard/facilities/create",
    access: ["super-admin", "admin"],
  },
  {
    label: "Collect samples",
    url: "/dashboard/reports/",
    access: ["sample-collector"],
  },
  {
    label: "Review reports",
    url: "/dashboard/reports/",
    access: ["pathologist"],
  },
  {
    label: "Manage employees",
    url: "/dashboard/people/",
    access: ["super-admin", "admin"],
  },
  {
    label: "Manage facilities",
    url: "/dashboard/facilities/",
    access: ["super-admin", "admin"],
  },
  {
    label: "Manage payments",
    url: "/dashboard/payments/",
    access: ["super-admin", "admin"],
  },
  {
    label: "Manage issues",
    url: "/dashboard/issues/",
    access: ["super-admin", "admin"],
  },
  {
    label: "Report an issue",
    url: "/dashboard/issues/create",
    access: [
      "super-admin",
      "admin",
      "receptionist",
      "pathologist",
      "sample-collector",
    ],
  },
  {
    label: "Account settings",
    url: "/dashboard/settings",
    access: [
      "super-admin",
      "admin",
      "receptionist",
      "pathologist",
      "sample-collector",
    ],
  },
];

export const facilityavailability = [
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Unavailable",
    value: "unavailable",
  },
  {
    label: "Permanently removed",
    value: "permanently-removed",
  },
];

export const issuestatus = [
  {
    label: "Open",
    value: "open",
  },
  {
    label: "Closed",
    value: "closed",
  },
];

export const issuepriorities = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];

export const testparameteruits = [
  {
    label: "mg/dL",
    value: "mg/dL",
  },
  {
    label: "mg/L",
    value: "mg/L",
  },
  {
    label: "g/dL",
    value: "g/dL",
  },

  {
    label: "IU/L",
    value: "IU/L",
  },

  {
    label: "mmol/L",
    value: "mmol/L",
  },
  {
    label: "g/dL",
    value: "g/dL",
  },
  {
    label: "10^9/L",
    value: "10^9/L",
  },
  {
    label: "10^12/L",
    value: "10^12/L",
  },
  {
    label: "%",
    value: "%",
  },
  {
    label: "fL",
    value: "fL",
  },
  {
    label: "pg",
    value: "pg",
  },
  {
    label: "g/dL",
    value: "g/dL",
  },
  {
    label: "mEq/L",
    value: "mEq/L",
  },
  {
    label: "mmom/L",
    value: "mmom/L",
  },
  {
    label: "U/L",
    value: "U/L",
  },
  {
    label: "gm/dL",
    value: "gm/dL",
  },
  {
    label: "mm/hr",
    value: "mm/hr",
  },
  {
    label: "ng/ml",
    value: "ng/ml",
  },
  {
    label: "µIU/ml",
    value: "µIU/ml",
  },
  {
    label: "µg/dl",
    value: "µg/dl",
  },
  {
    label: "boolean",
    value: "boolean",
  },
];

export const reportstatus = {
  S200: {
    label: "Ready for sample collection",
    access: ["sample-collector", "admin", "super-admin"],
    buttonLabel: "Collect sample",
    target: "collect-sample",
  },
  S201: {
    label: "Ready for diagnosis",
    access: ["admin", "super-admin", "lab-technician"],
    buttonLabel: "Feed results",
    target: "feed-results",
  },
  S202: {
    label: "Ready for review",
    access: ["pathologist", "admin", "super-admin"],
    buttonLabel: "Review",
    target: "review-results",
  },

  S203: {
    label: "Ready for delivery",
    access: ["receptionist", "admin", "super-admin"],
    buttonLabel: "Deliver report",
    target: "deliver-report",
  },

  S204: {
    label: "Needs retesting",
    access: ["admin", "super-admin", "receptionist"],
    buttonLabel: "Take action",
    target: "take-action",
  },

  S205: {
    label: "Delivered successfully",
    access: ["admin", "super-admin", "receptionist"],
    buttonLabel: "Resend report",
    target: "deliver-report",
  },
};

export const reportstatuslist = [
  {
    label: "Ready for sample collection",
    value: "S200",
  },
  {
    label: "Ready for diagnosis",
    value: "S201",
  },
  {
    label: "Ready for review",
    value: "S202",
  },
  {
    label: "Ready for delivery",
    value: "S203",
  },
  {
    label: "Needs retesting",
    value: "S204",
  },
  {
    label: "Delivered successfully",
    value: "S205",
  },
];
