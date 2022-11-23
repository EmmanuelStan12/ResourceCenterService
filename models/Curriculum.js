const { Database } = require("../data/Database");

class Curriculum {
    constructor(track, scheme) {

    }

    static async findCurriculum(track) {
        const response = await Database.instance().find('track', track, 'curriculum');
        return response
    }
}

module.exports.Curriculum = Curriculum