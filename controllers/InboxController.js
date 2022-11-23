const { Inbox } = require("../models/Inbox")
const { handleResponse } = require('../util/CustomResponse')

module.exports.sendMessage = async (request, response) => {
    try {
        const inbox = await Inbox.create(request.body);
        response.status(201).send(handleResponse(201, inbox))
    } catch (error) {
        response.send(404).send(handleResponse(404, null, error.message || error));
    }
}

module.exports.getMessages = async (request, response) => {
    const { q } = request.query;
    try {
        if (q === 'receiver') {
            const inbox = await Inbox.getReceivedInbox(request.payload.sub);
            response.status(200).send(handleResponse(200, inbox, null))
        } else {
            const inbox = await Inbox.getSentInbox(request.payload.sub);
            response.status(200).send(handleResponse(200, inbox, null))
        }
    } catch (error) {
        response.status(404).send(handleResponse(404, null, error.message || error));
    }
}