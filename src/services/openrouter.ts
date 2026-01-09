// OpenRouter API Integration
// Based on OpenRouter API documentation from openrouter.ai

export interface BranchNameRequest {
  description: string;
  branchType: 'feature' | 'bugfix' | 'hotfix' | 'release' | 'support';
  workItemId?: string;
}

export interface BranchNameResponse {
  branchName: string;
  explanation: string;
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export class OpenRouterService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateBranchName(request: BranchNameRequest): Promise<BranchNameResponse> {
    const prompt = this.createPrompt(request);

    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Git Branch Name Generator',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet', // Using a reliable model
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: '' } }));
        throw new Error((errorData as any).error?.message || `API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No response from AI model');
      }

      return this.parseResponse(content, request.branchType);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to generate branch name');
    }
  }

  private createPrompt(request: BranchNameRequest): string {
    const workItemPrefix = request.workItemId ? `Include the work item ID "${request.workItemId}" in the branch name. ` : '';
    
    return `You are a Git branch naming expert following Git Flow conventions.

Git Flow Branch Types:
- feature/: New features (feature/user-authentication, feature/JIRA-123-payment-integration)
- bugfix/: Bug fixes during development (bugfix/login-error, bugfix/TICKET-456-memory-leak)
- hotfix/: Production bug fixes (hotfix/critical-security-patch, hotfix/PROD-789-api-timeout)
- release/: Release preparation (release/v1.2.0, release/2024-01-spring)
- support/: Maintenance branches (support/legacy-v1, support/ios-12)

Requirements:
1. Use lowercase letters and numbers only
2. Use hyphens (-) to separate words, NO underscores or spaces
3. Keep it concise (2-5 words max after the work item ID)
4. Be descriptive but brief
5. ${workItemPrefix}Follow pattern: ${request.branchType}/${request.workItemId ? request.workItemId.toLowerCase() + '-' : ''}descriptive-name

Task Description: "${request.description}"
Branch Type: ${request.branchType}${request.workItemId ? `\nWork Item ID: ${request.workItemId}` : ''}

Generate a single, perfect Git Flow branch name following the format above. Then provide a brief explanation (1-2 sentences) of why this name works well.

Format your response EXACTLY as:
BRANCH: [branch-name]
EXPLANATION: [explanation]`;
  }

  private parseResponse(content: string, branchType: string): BranchNameResponse {
    // Parse the structured response
    const branchMatch = content.match(/BRANCH:\s*(.+)/i);
    const explanationMatch = content.match(/EXPLANATION:\s*(.+)/is);

    let branchName = branchMatch?.[1]?.trim() || '';
    const explanation = explanationMatch?.[1]?.trim() || 'Branch name generated successfully.';

    // Clean up the branch name
    branchName = branchName
      .toLowerCase()
      .replace(/[^a-z0-9/-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Ensure it starts with the correct type
    if (!branchName.startsWith(branchType + '/')) {
      if (branchName.startsWith(branchType)) {
        branchName = branchName.replace(branchType, branchType + '/');
      } else {
        branchName = `${branchType}/${branchName}`;
      }
    }

    return {
      branchName,
      explanation,
    };
  }
}
