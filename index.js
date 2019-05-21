const createUpworkTable = require('./create-upwork-table').default

const args = process.argv.slice(2)
const [rate] = args

const upworkTable = createUpworkTable(rate)

upworkTable.forEach(row => {
  Object.entries(row)
    .forEach(([k, v]) => {
      if (k === 'description')
        console.log(`# ${v}`)
      else
        console.log(k, v)
    })

  console.log('\n')
})
