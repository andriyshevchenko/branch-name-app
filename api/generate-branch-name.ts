import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { description, branchType, workItemId } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  const apiKey = process.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = `Generate a git branch name based on the following information:
Branch Type: ${branchType}
${workItemId ? `Work Item ID: ${workItemId}` : ''}
Description: ${description}

Rules for branch naming:
1. Use kebab-case (lowercase with hyphens)
2. Start with the branch type prefix (feature/, bugfix/, hotfix/, release/, support/)
3. If Work Item ID exists, include it after the prefix: ${branchType}/${workItemId}-...
4. Keep it concise (50 characters max after prefix)
5. Be descriptive of the work

Return ONLY the branch name, nothing else.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3.5-sonnet',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter API error:', error);
      return res.status(response.status).json({
        error: 'Failed to generate branch name',
        details: error,
      });
    }

    const data = await response.json();
    const branchName = data.choices[0].message.content.trim();

    return res.status(200).json({ branchName });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Failed to generate branch name',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
