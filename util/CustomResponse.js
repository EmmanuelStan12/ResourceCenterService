module.exports.handleResponse = (status, payload = null, error = null) => {
    return {
        status,
        error,
        payload
    }
}