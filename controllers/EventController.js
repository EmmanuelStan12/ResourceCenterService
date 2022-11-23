const { Event } = require('../models/Event')

module.exports.createEvent = async (request, response) => {
    try {
        const result = await Event.create(request.body);
    } catch (error) {
        
    }
}