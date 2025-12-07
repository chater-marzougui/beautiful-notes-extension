const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function transformDraft(content: string, apiKey: string): Promise<string> {
  if (!apiKey) {
    throw new Error('API Key is required. Please set it in Settings.');
  }

  const prompt = `You are a markdown formatting assistant. Transform the following draft text into clean, well-structured Markdown. 
  
Rules:
- Preserve the original meaning and content
- Add proper headings (# ## ###) where appropriate
- Format lists properly (- or 1.)
- Add emphasis (*italic* or **bold**) where it makes sense
- Keep checkboxes as - [ ] or - [x]
- Improve overall readability and structure
- Do NOT add extra content, only reformat

Draft to transform:
${content}

Return ONLY the formatted markdown, no explanations.`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to transform draft');
  }

  const data = await response.json();
  const transformedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!transformedText) {
    throw new Error('No response from API');
  }

  return transformedText.trim();
}

export async function suggestFileName(content: string, apiKey: string): Promise<string> {
  if (!apiKey) {
    throw new Error('API Key is required. Please set it in Settings.');
  }

  const prompt = `Based on the following note content, suggest a short, descriptive filename (2-5 words max). 
The filename should capture the main topic or purpose of the note.
Return ONLY the filename, no quotes, no file extension, no explanations.

Note content:
${content.substring(0, 500)}

Filename:`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to suggest filename');
  }

  const data = await response.json();
  const suggestedName = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!suggestedName) {
    throw new Error('No response from API');
  }

  return suggestedName.trim().replace(/[^\w\s-]/g, '').substring(0, 50);
}

