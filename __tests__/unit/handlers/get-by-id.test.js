// Import all functions from get-by-id.js 
const lambda = require('../../../src/handlers/get-by-id.js'); 
// Import dynamodb from aws-sdk 
const dynamodb = require('aws-sdk/clients/dynamodb'); 
 
const html = require('../../../src/util/html-util');

// This includes all tests for getByIdHandler() 
describe('Test getByIdHandler', () => { 
    let getSpy; 
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get'); 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        getSpy.mockRestore(); 
    }); 
 
    // This test invokes getByIdHandler() and compare the result  
    it('deals with cors', async () => { 
        const item = { id: 'id1' }; 
 
        // Return the specified value whenever the spied get function is called 
        getSpy.mockReturnValue({ 
            promise: () => Promise.resolve({ Item: item }) 
        }); 
 
        const event = { 
            httpMethod: 'GET', 
            pathParameters: { 
                id: 'id1' 
            } 
        } 
 
        // Invoke getByIdHandler() 
        const result = await lambda.getByIdHandler(event); 
 
        const expectedResult = html.respond(200, item)
 
        // Compare the result with the expected result 
        expect(result.headers).toEqual(expectedResult.headers); 
    }); 
}); 
 