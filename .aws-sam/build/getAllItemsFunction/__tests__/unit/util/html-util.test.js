 const html = require('../../../src/util/html-util');
describe('Test putItemHandler', function () { 
    let result;
    const headers=  {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    };
    const status = 200;
    const message = {"id": "ok"};
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        result = html.respond(status, message);
    }); 
 
 
    // This test invokes putItemHandler() and compare the result  
    it('should have correct status', async () => { 
        // Compare the result with the expected result 
        expect(result.statusCode).toEqual(status); 
    }); 
    it('should have correct message', async () => { 
        // Compare the result with the expected result 
        expect(result.body).toEqual(JSON.stringify(message)); 
    }); 
    it('should have correct headers', async () => { 
        // Compare the result with the expected result 
        expect(result.headers).toEqual(headers); 
    }); 
}); 
 