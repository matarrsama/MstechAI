export async function generateResponse(prompt, settings) {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${settings.apiKey}`;
  
  try {
    const fullPrompt = settings.customInstructions 
      ? `${settings.customInstructions}\n\n${prompt}`
      : prompt;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
          temperature: parseFloat(settings.temperature)
        }
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