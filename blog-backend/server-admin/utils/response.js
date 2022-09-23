
const Response = require('../../common/utils/response')

const codeMap = {
	"0": "success",
	"1": "fail",
	"201": "invalid token",
	"202": "expired token",
	"301": "parameters missing ",
	"302": "parameters error",
	"501": "server error",
	"502": "database error"
}

module.exports = function (_, res, next) {
	const instance = new Response(codeMap)
	res.$success = instance.success
	res.$fail = instance.fail
	next()
}