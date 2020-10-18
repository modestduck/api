// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const emoji = require("emoji-dictionary");
const html = require('../util/html-util');

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;
/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const body = JSON.parse(event.body)
    const id = body.id;
    if (!emoji.names.includes(id)) {
        return html.respond(html.Code.REJECT, "bad emoji code")
    }
    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    var params = {
        TableName: tableName,
        Key:{
            "id": id,
        },
        UpdateExpression: "add #c :v",
        ExpressionAttributeValues:{
            ":v":1,
        },
        ExpressionAttributeNames:{
            "#c": "count"
        },
        ReturnValues:"UPDATED_NEW"
    };

    const result = await docClient.update(params).promise();

    return html.respond(html.Code.OK, result);
}
