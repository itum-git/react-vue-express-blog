const express = require('express')
const { deleteUser } = require('../../controller/user')

const router = express.Router()

// 注销用户
router.delete('/', deleteUser)

module.exports = router