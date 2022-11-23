const { Router } = require('express')
const { getCurriculum } = require('../controllers/CurriculumController');
const { verifyJWTMiddleware } = require('../util/JSONWebToken');

const router = Router()

router.get('/', verifyJWTMiddleware, getCurriculum)

module.exports.curriculumRouter = router;