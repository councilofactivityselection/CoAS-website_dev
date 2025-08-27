// netlify/functions/get-activity.js
exports.handler = function(event, context, callback) {
  try {
    // For now, we'll just return a success message
    // In a real implementation, you would fetch from a database or file
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        activity: {
          activity: "Sample from Netlify",
          time: "19:00",
          image: "https://images.unsplash.com/photo-1610917040803-1fccf9623064?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        }
      })
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    });
  }
};