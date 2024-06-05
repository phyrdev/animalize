import { currencies } from "@/static/lists";

export const getCurrencySymbol = (abbr) => {
  let c = currencies.find((c) => c.abbr === abbr);
  return c ? c.symbol : "";
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getRole = (role) => {
  return capitalizeFirstLetter(role.replace("-", " "));
};
