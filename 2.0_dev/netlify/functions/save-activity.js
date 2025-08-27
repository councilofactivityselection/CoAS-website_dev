// netlify/functions/save-activity.js
exports.handler = function(event, context, callback) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    });
  }

  try {
    // Parse the incoming data
    const { activity, time, image } = JSON.parse(event.body);
    
    // For now, we'll just log the data and return success
    console.log('Activity data received:', { activity, time, image });
    
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Activity saved successfully',
        activity: { activity, time, image }
      })
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    });
  }
};