const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const lark = require('@larksuiteoapi/node-sdk');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create Lark client
const client = new lark.Client({
  appId: process.env.LARK_APP_ID || 'YOUR_APP_ID',
  appSecret: process.env.LARK_APP_SECRET || 'YOUR_APP_SECRET',
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Survey submission endpoint
app.post('/api/submit-survey', async (req, res) => {
  try {
    const { userData, profileResult } = req.body;
    
    console.log('Received submission:', { userData, profileResult });

    // Submit to Lark Base
    const response = await client.bitable.appTableRecord.create({
      path: {
        app_token: process.env.LARK_APP_TOKEN || 'YmTib3BYcavbeUssxXRcRCwJnAb',
        table_id: process.env.LARK_TABLE_ID || 'tblut066VHRVSYBm',
      },
      data: {
        fields: {
          'Name': userData.name,
          'Class Code': userData.classCode,
          'Group Number': userData.groupNumber,
          'Colour': userData.avatarColor,
          'Profile 1': profileResult.primaryType,
          'Profile 2': profileResult.secondaryType,
          'Date': Date.now() // Current timestamp
        }
      },
    }, 
    lark.withUserAccessToken(process.env.LARK_USER_ACCESS_TOKEN || "u-d3tBNlNmF5prVDiGrBCSKf1k0JNakk8pXg0wglg00y07")
    );

    console.log('Lark API response:', response);
    res.json({ success: true });
  } catch (error) {
    console.error('Error submitting to Lark:', error);
    
    // Provide a more user-friendly error message
    let errorMessage = 'Failed to submit survey';
    if (error.response && error.response.data) {
      errorMessage = error.response.data.msg || errorMessage;
    }
    
    res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});