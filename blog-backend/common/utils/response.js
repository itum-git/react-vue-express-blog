

class Response {

	codeMap = null

	constructor(response, codeMap) {
		this.codeMap = codeMap
	}

	/**
	 * @description request success
	 * @param {number} code customize response status code
	 * @param {object} data response data
	 * @param {string} msg response message
	 */
	success(code = 0, data = null, msg = '') {
		if (this.$responsed) return

		this.$responsed = true

		if (typeof code === 'object') {
			data = code
			code = 0
		}

		if (typeof data === 'string') {
			msg = data
			data = {}
		}

		this.json({
			code,
			data,
			msg: msg ? msg : codeMap[code]
		})
	}

	/**
	 * @description request failed
	 * @param {number} code customize response status code
	 * @param {string} msg response message
	 */
	fail(code = 1, msg) {
		if (this.$responsed) return

		this.$responsed = true

		if (typeof msg !== 'string') {
			msg = codeMap[code]
		}

		if (msg instanceof Error) {
			msg = msg.message
		}

		this.json({
			code,
			msg
		})
	}

}

module.exports = Response
