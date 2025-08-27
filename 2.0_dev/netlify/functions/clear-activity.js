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
    // Create an empty activity object
    const activity = {
      activity_name: '',
      start_time: '',
      image_url: '',
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
    console.error('Error in clear-activity:', error);
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
        details: "Failed to clear activity data"
      })
    };
  }
};