export const response = (data, succeeded, statusCode, message) => {
    return {
        data, succeeded: succeeded, statusCode: statusCode, message: message
    }
}