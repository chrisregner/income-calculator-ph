const MONTHS_PER_YEAR = 12
const ELIGIBLE_ANNUAL_INCOME_CEIL = 3000000
const TAXABLE_ANNUAL_INCOME_FLR = 250001
const TAX_EXCEMPTED_AMOUNT = 250000
const TAX_RATE = 0.08

module.exports.default = monthlyIncome => {
  const annualIncome = monthlyIncome * MONTHS_PER_YEAR

  if (annualIncome < TAXABLE_ANNUAL_INCOME_FLR)
    throw new Error('Annual income less than ₱250,001 isn’t taxable')

  if (annualIncome > ELIGIBLE_ANNUAL_INCOME_CEIL)
    throw new Error('Annual income over ₱3,000,000 isn’t eligible for 8% tax rate')

  const monthlyTax = ((annualIncome - TAX_EXCEMPTED_AMOUNT) * TAX_RATE) / MONTHS_PER_YEAR

  return monthlyTax
}
