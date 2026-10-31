#!/usr/bin/env node

/**
 * Autonomous Chrome Web Store API Publisher
 * Uploads dist/civitai-theater-extension.zip and submits for review.
 *
 * Requirements (Environment Variables or CLI flags):
 *   CHROME_WEBSTORE_CLIENT_ID
 *   CHROME_WEBSTORE_CLIENT_SECRET
 *   CHROME_WEBSTORE_REFRESH_TOKEN
 *   CHROME_EXTENSION_ID (Item ID from Chrome Web Store Developer Console)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ZIP_PATH = path.resolve(__dirname, '../dist/civitai-theater-extension.zip');

const CLIENT_ID = process.env.CHROME_WEBSTORE_CLIENT_ID || '';
const CLIENT_SECRET = process.env.CHROME_WEBSTORE_CLIENT_SECRET || '';
const REFRESH_TOKEN = process.env.CHROME_WEBSTORE_REFRESH_TOKEN || '';
const EXTENSION_ID = process.env.CHROME_EXTENSION_ID || process.argv[2] || '';

async function getAccessToken() {
  console.log('[1/3] Requesting Google OAuth2 Access Token...');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`Failed to acquire access token: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function uploadZip(token) {
  console.log(`[2/3] Uploading ${ZIP_PATH} to Item ID: ${EXTENSION_ID}...`);
  if (!fs.existsSync(ZIP_PATH)) {
    throw new Error(`Zip package not found at ${ZIP_PATH}`);
  }

  const zipBuffer = fs.readFileSync(ZIP_PATH);
  const uploadUrl = `https://www.googleapis.com/upload/chromewebstore/v1.1/items/${EXTENSION_ID}`;

  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-goog-api-version': '2'
    },
    body: zipBuffer
  });

  const data = await res.json();
  if (data.uploadState !== 'SUCCESS') {
    throw new Error(`Upload failed: ${JSON.stringify(data)}`);
  }
  console.log('✔ Zip upload successful!');
  return data;
}

async function publishItem(token) {
  console.log('[3/3] Submitting for review / publishing to Chrome Web Store...');
  const publishUrl = `https://www.googleapis.com/chromewebstore/v1.1/items/${EXTENSION_ID}/publish`;

  const res = await fetch(publishUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-goog-api-version': '2',
      'Content-Length': '0'
    }
  });

  const data = await res.json();
  console.log('Publish API Response:', JSON.stringify(data, null, 2));
  return data;
}

async function main() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !EXTENSION_ID) {
    console.error('❌ Missing Chrome Web Store API credentials.');
    console.error('Please configure the following environment variables:');
    console.error('  CHROME_WEBSTORE_CLIENT_ID');
    console.error('  CHROME_WEBSTORE_CLIENT_SECRET');
    console.error('  CHROME_WEBSTORE_REFRESH_TOKEN');
    console.error('  CHROME_EXTENSION_ID');
    console.error('\nIf this is your first upload for this extension, create the item manually at:');
    console.error('  https://chrome.google.com/webstore/devconsole');
    process.exit(1);
  }

  const token = await getAccessToken();
  await uploadZip(token);
  await publishItem(token);
}

main().catch(err => {
  console.error('Error during Chrome Web Store publishing:', err.message);
  process.exit(1);
});
