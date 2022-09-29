const express = require('express')
const controller = require('../controllers/auth.controller')
const router = express.Router()

// router.get('/', controller.getAll)
// router.post('/', controller.login)
// router.get('/:id', controller.getByID)
// router.put('/:id', controller.update)
// router.delete('/:id', controller.delete)

router.get('/', controller.authencation)
router.post('/', controller.postAuthencation)

module.exports = router