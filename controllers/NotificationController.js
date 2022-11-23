const { Notification } = require("../models/Notification");
const { handleResponse } = require("../util/CustomResponse");


module.exports.createNotification = async (request, response) => {
    try {
        console.log(request.payload)
        const result = await Notification.create(request.payload.sub, request.body);
        const res = handleResponse(201, result, null)
        response.status(201).send(res)
    } catch (error) {
        const res = handleResponse(402, {}, error.message)
        response.status(402).send(res)
    }
}

module.exports.deleteNotification = async (request, response) => {
    try {
        const result = await Notification.delete(request.payload.sub, request.body);
        const res = handleResponse(201, result, null)
        response.status(201).send(res)
    } catch (error) {
        const res = handleResponse(402, {}, error.message)
        response.status(402).send(res)
    }
}

module.exports.deleteUserNotification = async (request, response) => {
    
}

module.exports.getNotifications = async (request, response) => {
    try {
        const { track } = request.query;
        console.log(request.query, request.payload)
        const notifications = await Notification.getNotificationsByUserID(request.payload.sub)
        response.status(200).send(handleResponse(200, notifications, null))
    } catch (error) {
        response.status(401).send(handleResponse(401, null, error.message))
    }
}