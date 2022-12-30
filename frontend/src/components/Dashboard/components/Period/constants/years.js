const generatePeriods = (initialYear) => {
  const years = [];
  let year = parseInt(Date().split(" ")[3]);
  let end = year + 1;
  for (let i = initialYear; i <= end; i++) {
    years.push(i)
  }

  return years
};

const periods = generatePeriods(2022)

export { periods }