const { Curriculum } = require('../models/Curriculum')
const { handleResponse } = require('../util/CustomResponse')

module.exports.getCurriculum = async (request, response) => {
    const track = request.query.track;
    try {
        const curs = await Curriculum.findCurriculum(track)
        const res = handleResponse(200, curs, null)
        response.status(res.status).send(res)
    } catch (error) {
        response.status(404).send(error.message || error);
    }
}