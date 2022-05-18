const getStatistics = require("./statistics");

module.exports = function StatsAlerter(maxThreshold, alerters) {
  this.maxThreshold = maxThreshold;
  this.alerters = alerters;

  this.checkAndAlert = (numbers) => {
    const stats = getStatistics(numbers);
    let [emailAlert, ledAlert] = alerters;

    if (stats.max > this.maxThreshold) {
      emailAlert.emailSent = true;
      ledAlert.ledGlows = true;
    }
    return { emailAlert, ledAlert };
  };
};
