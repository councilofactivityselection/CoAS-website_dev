exports.handler = function(event, context, callback) {
    console.log("Test function called");
    
    callback(null, {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ 
            success: true, 
            message: 'Hello from Netlify Function!',
            timestamp: new Date().toISOString()
        })
    });
};