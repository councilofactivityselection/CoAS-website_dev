const fs = require('fs');
const path = require('path');

exports.handler = function(event, context, callback) {
  try {
    // Read from the JSON file
    const dataPath = path.join(process.cwd(), 'netlify', 'data', 'activity.json');
    
    let activityData = {
      activity: "",
      time: "",
      image: "",
      updated: ""
    };
    
    // Check if file exists
    if (fs.existsSync(dataPath)) {
      const fileData = fs.readFileSync(dataPath, 'utf8');
      activityData = JSON.parse(fileData);
    }
    
    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: true, 
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