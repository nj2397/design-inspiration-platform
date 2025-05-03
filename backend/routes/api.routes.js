const router = require('express').Router();
const ApiController = require('../controller/api.controller.js');
const { validateRequest } = require('../middleware/api.middleware.js');
const { urlValidation, inspirationLinksValidation } = require('../validator/api.validator.js');
const apiController = new ApiController();

router.post('/extract-links', validateRequest(urlValidation), apiController.getLinks)
router.post('/inspirations', validateRequest(inspirationLinksValidation), apiController.addInspiration)
router.get('/inspirations', apiController.getInspirations)
router.get('/inspirations/:slug', apiController.getInspirationBySlug)

module.exports = router;