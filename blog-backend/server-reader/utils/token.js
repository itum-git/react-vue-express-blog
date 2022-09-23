

const JWT = require('../../common/utils/token')

module.exports = new JWT(process.env.SECRET_KEY)