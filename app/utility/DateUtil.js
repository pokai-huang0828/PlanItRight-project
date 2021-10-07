import moment from "moment";

const formatDate = (date, formatString) => {
  return moment(date).format(formatString);
};

// Date String in format "YYYY-MM-DD"
const calculateDayDifference = (dateString1, dateString2) => {
  var date1 = moment(dateString1, "YYYY-MM-DD");
  var date2 = moment(dateString2, "YYYY-MM-DD");
  return moment.duration(date1.diff(date2)).asDays();
};

const convertStringToDate = (str) => {
  return moment(str, "YYYY-MM-DD").toDate();
};

export default {
  formatDate,
  calculateDayDifference,
  convertStringToDate,
};
