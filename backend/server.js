const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const lark = require('@larksuiteoapi/node-sdk');
// Add these at the top after requiring modules
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// Token management
let currentAppToken = null;
let tokenExpireTime = 0;

// Function to get a valid app token
async function getValidAppToken() {
  const now = Date.now();
  
  // If token exists and is not expired (with 5 min buffer), return it
  if (currentAppToken && tokenExpireTime > now + 300000) {
    return currentAppToken;
  }
  
  try {
    // Request a new app token
    const tokenResponse = await client.auth.appAccessToken.internal({});
    
    if (tokenResponse.code !== 0) {
      console.error('Failed to get app token:', tokenResponse);
      throw new Error(`Failed to get app token: ${tokenResponse.msg}`);
    }
    
    currentAppToken = tokenResponse.app_access_token;
    // Set expiry time (token valid for 30 days)
    tokenExpireTime = now + (30 * 24 * 60 * 60 * 1000); 
    
    console.log('New app token acquired, expires:', new Date(tokenExpireTime));
    return currentAppToken;
  } catch (error) {
    console.error('Error getting app token:', error);
    throw error;
  }
}

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://foursightsurvey.vercel.app',
    'https://foursightsurvey-fuil9b27x-zacs-projects-6354f309.vercel.app', // Add your deployed URL
    /\.vercel\.app$/],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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

    // Get a valid app token
    const appToken = await getValidAppToken();

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
    lark.withUserAccessToken(appToken)
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