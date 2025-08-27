const fs = require('fs');
const path = require('path');

exports.handler = function(event, context, callback) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    });
  }

  try {
    // Parse the incoming data
    const { activity, time, image } = JSON.parse(event.body);
    
    // Create activity object
    const activityData = {
      activity: activity || '',
      time: time || '',
      image: image || '',
      updated: new Date().toISOString()
    };
    
    // Save to a JSON file
    const dataPath = path.join(process.cwd(), 'netlify', 'data', 'activity.json');
    
    // Ensure directory exists
    const dir = path.dirname(dataPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write file
    fs.writeFileSync(dataPath, JSON.stringify(activityData, null, 2));
    
    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Activity saved successfully',
        activity: activityData
      })
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ error: error.message })
    });
  }
};