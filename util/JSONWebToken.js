const jwt = require('jsonwebtoken');
const { handleResponse } = require('./CustomResponse');


module.exports.issueToken = (_id, expiresIn = '1d') => {
    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn,
        algorithm: 'HS256'
    })

    return {
        token: `Bearer ${token}`,
        expiresIn
    }
}

module.exports.verifyJWTMiddleware = (request, response, next) => {
    if (!request.headers.authorization) {
        next(handleResponse(401, {}, "Invalid Token"))
        return;
    }
    const tokenParts = request.headers.authorization.split(" ");
    
    if (
        tokenParts[0] === "Bearer" &&
        tokenParts[1]
    ) {
        try {
            const payload = jwt.verify(tokenParts[1], process.env.JWT_TOKEN, (err, decoded) => {
                if (decoded && !err) {
                    request.payload = decoded;
                    next();
                } else {
                    next(handleResponse(422, {}, "Invalid or Expired Token"))
                }
            });
           
        } catch (error) {
            next(handleResponse(401, {}, error.message || 'Unknown error occured'))
        }
    } else {
        const res = handleResponse(401, {}, 'Unauthorized')
        next(res);
    }
};

module.exports.verifyJWT = (request) => {
    const tokenParts = request.headers.authorization.split(" ");
    const token = tokenParts[1]
    try {
        if (tokenParts[0] === "Bearer") {
            const payload = jwt.verify(token, process.env.JWT_TOKEN, {
                algorithms: ["HS256"],
            });
            if (payload) {
                return payload
            }
            throw Error("invalid token")
        } else {
            throw Error("Unauthorized")
        }
    } catch (error) {
        throw error;
    }
}