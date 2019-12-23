const getMYSQLFormattedJoinDate = () => {
  const date = new Date();
  const YEAR = date.getFullYear();
  const MONTH = ('0' + (date.getMonth() + 1)).slice(-2);
  const DAY = ('0' + date.getDate()).slice(-2);

  return `${YEAR}-${MONTH}-${DAY}`;
};

const getMYSQLFormattedEndDate = () => {
  const date = new Date();
  const YEAR = date.getFullYear() + 1;
  const MONTH = ('0' + (date.getMonth() + 1)).slice(-2);
  const DAY = ('0' + date.getDate()).slice(-2);

  return `${YEAR}-${MONTH}-${DAY}`;
};

module.exports = {
  getMYSQLFormattedJoinDate,
  getMYSQLFormattedEndDate
};
