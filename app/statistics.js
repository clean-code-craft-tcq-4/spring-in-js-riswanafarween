module.exports = function getStatistics(numbers) {
  let max, min, average;
  if (numbers.length === 0) {
    min = NaN;
    max = NaN;
    average = NaN;
  } else {
    max = Math.max(...numbers);
    min = Math.min(...numbers);
    average = numbers.reduce((a, b) => a + b) / numbers.length;
  }
  return { max: max, min: min, average: average };
};
