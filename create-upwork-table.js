const calcEightPctTax = require('./calc-8pct-tax').default

const EXCHANGE_RATE = 50
const UPWORK_RATES = [.2, .1, .05]
const POSSIBLE_HOURS_PER_WEEK = [20, 30, 40]
const WEEKS_PER_MONTH = 4

const createTwoDimenTable = (xs, ys) =>
  xs.reduce((xAcc, x) => [
    ...xAcc,
    ...ys.reduce((yAcc, y) => [
      ...yAcc,
      [x, y]
    ], [])
  ], [])

const RATE_HOUR_TUPLES = createTwoDimenTable(UPWORK_RATES, POSSIBLE_HOURS_PER_WEEK)

const createUpworkTable = hourlyRate =>
  RATE_HOUR_TUPLES.map(([upworkRate, hoursPerWk]) => {
    const description = `$${hourlyRate}, ${upworkRate * 100}% fee, ${hoursPerWk}/week, at $${EXCHANGE_RATE} exchange rate`

    // 8% of gross sales or receipts and other income, in excess of P250,000
    const grossIncomePerMonth = hourlyRate * (1 - upworkRate) * EXCHANGE_RATE * hoursPerWk * WEEKS_PER_MONTH

    const taxPerMonth = calcEightPctTax(grossIncomePerMonth)
    const netIncomePerMonth = grossIncomePerMonth - taxPerMonth

    return { description, grossIncomePerMonth, taxPerMonth, netIncomePerMonth }
  })

module.exports.default = createUpworkTable
