const { User } = require('../models/User');
const { handleResponse } = require('../util/CustomResponse');
const { issueToken } = require('../util/JSONWebToken');

module.exports.login = async (request, response) => {
    const { email, password } = request.body;
    try {
        const user = await User.login(email, password);
        const _id = user.id;
        const token = issueToken(_id);
        const res = handleResponse(200, { user, token }, null)
        response.status(200).json(res);
    } catch (error) {
        const res = handleResponse(404, {}, error.message)
        response.status(401).send(res);
    }
}

module.exports.register = async (request, response) => {
    const { firstname, lastname, password, email, username, track } = request.body;
    try {
        const user = await User.register(request.body);
        const token = issueToken(user.id);
        const res = handleResponse(201, { token, user }, null);
        response.status(res.status).send(res);  
    } catch (error) {
        const res = handleResponse(404, {}, error.message)
        response.status(res.status).send(res);
    }
    // try {
    //     const user = await User.create({ firstName, lastName, username, email, password })
    //     await sendMail(email)
    //     const res = handleResponse("otp sent successfully", true, { user })
    //     response.status(200).send(res)
    // } catch (error) {
    //     const res = handleResponse("an error occured", false, { error: error.message })
    //     response.status(404).send(res);
    // }
}

module.exports.update = async (request, response) => {

}

module.exports.delete = async (request, response) => {
    
}

module.exports.validate = async (request, response) => {
    try {
        const user = await User.findUser(request.payload.sub);
        user.id = request.payload.sub
        if (!user) {
            response.send(handleResponse(422, {}, 'User does not exist'))
        }
        const res = handleResponse(200, { user }, null)
        response.status(200).json(res);
    } catch (error) {
        const res = handleResponse(404, {}, error.message)
        response.status(401).send(res);
    }
}

module.exports.getUsers = async (request, response) => {
    const { track } = request.query;
    try {
        if (!track) {
            response.status(401).send(handleResponse(401, null, 'Invalid input'))
        }
        if (track === 'all') {
            const users = await User.getAllUsers(request.payload.sub)
            response.status(200).send(handleResponse(200, users))
        } else {
            const users = await User.findUsers(track, request.payload.sub);
            response.status(200).send(handleResponse(200, users))
        }
    } catch (error) {
        response.status(401).send(handleResponse(401, null, error.message || error))
    }
}