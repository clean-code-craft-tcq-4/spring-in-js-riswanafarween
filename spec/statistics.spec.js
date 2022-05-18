const getStatistics = require("../app/statistics");
const EmailAlert = require("../app/emailAlert");
const LEDAlert = require("../app/ledAlert");
const StatsAlerter = require("../app/checker");
describe("StatisticsTest", function () {
  it("reportsAverageMinMaxx", function () {
    const r1 = 1.5;
    const r2 = 8.9;
    const r3 = 3.2;
    const r4 = 4.5;
    const numbers = [r1, r2, r3, r4];
    const stats = getStatistics(numbers);
    const epsilon = 0.001;

    expect(Math.abs(stats.min - 1.5)).toBeLessThan(epsilon);
    expect(Math.abs(stats.max - 8.9)).toBeLessThan(epsilon);
    expect(Math.abs(stats.average - 4.525)).toBeLessThan(epsilon);
  });

  it("reportsNaNForEmptyInput", function () {
    const numbers = [];
    const stats = getStatistics(numbers);

    expect(stats.min).toBeNaN();
    expect(stats.max).toBeNaN();
    expect(stats.average).toBeNaN();
  });
  it("raises alerts when max is greater than threshold", function () {
    const emailAlert = new EmailAlert();
    const ledAlert = new LEDAlert();
    const alerters = [emailAlert, ledAlert];

    const maxThreshold = 10.2;

    const statsAlerter = new StatsAlerter(maxThreshold, alerters);
    statsAlerter.checkAndAlert([99.8, 34.2, 4.5, 6.7]);

    expect(emailAlert.emailSent).toBe(true);
    expect(ledAlert.ledGlows).toBe(true);
  });
});
