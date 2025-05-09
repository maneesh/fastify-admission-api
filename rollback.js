const { Postgrator } = require('postgrator')
const config = require('./postgrator-config')

const postgrator = new Postgrator(config)

postgrator.rollback() // You can specify a version to rollback to
  .then((result) => {
    console.log("Rollback complete")
    console.dir(result, { depth: null })
  })
  .catch((error) => {
    console.error(error)
  })