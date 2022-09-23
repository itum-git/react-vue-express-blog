

const JWT = require('../../common/utils/token')

module.exports = new JWT(process.env.ADMIN_SECRET_KEY)