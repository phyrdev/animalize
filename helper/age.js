export const calculateAge = (bd = null) => {
  if (!bd) bd = new Date();

  // return age in string .. years, months, days

  // if bd> today, return 0 years 0 months 0 days

  if (new Date(bd).toDateString() === new Date().toDateString())
    return "0 days";
  else if (new Date(bd) > new Date()) {
    return "Can't be born in future!";
  } else {
    let today = new Date();
    let birthDate = new Date(bd);
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      days += 30;
    }

    let string = "";

    if (years > 0) {
      string += years + " years ";
    }

    if (months > 0) {
      string += months + " months ";
    }

    if (days > 0) {
      string += days + " days ";
    }

    return string;
  }
};
