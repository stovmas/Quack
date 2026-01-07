import OpenAI from 'openai';

export interface ProcessedNote {
  title: string;
  cleanedText: string;
  themes: string[];
}

export async function processNote(text: string, apiKey: string): Promise<ProcessedNote> {
  if (!apiKey) {
    return {
      title: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      cleanedText: text,
      themes: ['uncategorized'],
    };
  }

  try {
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that processes voice transcriptions.

Given a voice transcription, you should:
1. Fix any grammar, punctuation, and capitalization errors
2. Generate a short, descriptive title (3-6 words max)
3. Extract 1-3 thematic categories

Return your response as a JSON object with this exact format:
{
  "title": "Short Descriptive Title",
  "cleanedText": "The corrected transcription with proper grammar and punctuation.",
  "themes": ["theme1", "theme2"]
}

Theme examples:
- A joke about parenting → ["stand up", "motherhood"]
- A business idea about food delivery → ["business ideas", "food tech"]
- A personal reflection on meditation → ["personal growth", "mindfulness"]

Keep theme names concise (1-2 words), general enough to group similar notes together.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from API');
    }

    const result = JSON.parse(content);

    if (!result.title || !result.cleanedText || !Array.isArray(result.themes)) {
      throw new Error('Invalid response format');
    }

    return {
      title: result.title,
      cleanedText: result.cleanedText,
      themes: result.themes.map((t: any) => String(t)),
    };
  } catch (error) {
    console.error('Error processing note:', error);
    // Fallback: create basic title and use original text
    return {
      title: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      cleanedText: text,
      themes: ['uncategorized'],
    };
  }
}

export async function extractThemes(text: string, apiKey: string): Promise<string[]> {
  try {
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that extracts thematic categories from text.
          Analyze the given text and identify 1-3 main themes or categories it belongs to.
          Return ONLY a JSON array of theme names as strings, like: ["theme1", "theme2"]

          Examples:
          - A joke about parenting → ["stand up", "motherhood"]
          - A business idea about food delivery → ["business ideas", "food tech"]
          - A personal reflection on meditation → ["personal growth", "mindfulness"]

          Keep theme names concise (1-2 words), general enough to group similar notes together.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from API');
    }

    // Parse the JSON array response
    const themes = JSON.parse(content);

    if (!Array.isArray(themes)) {
      throw new Error('Invalid response format');
    }

    return themes.map(t => String(t));
  } catch (error) {
    console.error('Error extracting themes:', error);
    return ['uncategorized'];
  }
}
