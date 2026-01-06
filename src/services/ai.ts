import OpenAI from 'openai';

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
