import 'dotenv/config';
import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function generateResponse(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No valid response from API');
    }
  } catch (error) {
    console.error('Error:', error.message);
    return 'Sorry, I encountered an error processing your request.';
  }
}

// Example usage
const prompt = "Explain how AI works";
console.log('Asking:', prompt);
generateResponse(prompt)
  .then(response => {
    console.log('\nResponse:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });