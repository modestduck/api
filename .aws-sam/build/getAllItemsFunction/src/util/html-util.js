module.exports = {
    respond: (status, message) => {
        return {
            statusCode: status,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(message) 
        }
    },
    Code: {
        OK: 200,
        BAD: 400,
        REJECT: 422
    }
}