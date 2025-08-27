const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }
  
  try {
    // Parse the incoming data
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ 
          success: false, 
          error: "Invalid JSON in request body" 
        })
      };
    }
    
    const { activity_name, start_time, image_url } = body;
    
    // Validate required fields
    if (!activity_name || !start_time) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ 
          success: false, 
          error: "Activity name and start time are required" 
        })
      };
    }
    
    // Create the activity object
    const activity = {
      activity_name,
      start_time,
      image_url: image_url || '',
      updated_at: new Date().toISOString()
    };
    
    // Write to the JSON file
    const dataPath = path.resolve(__dirname, '..', '..', 'data', 'activity.json');
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(activity, null, 2));
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ success: true, activity })
    };
  } catch (error) {
    console.error('Error in update-activity:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message,
        details: "Failed to update activity data"
      })
    };
  }
};