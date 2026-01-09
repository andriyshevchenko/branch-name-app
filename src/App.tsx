import { useState } from 'react';
import { BRANCH_TYPES, BranchType } from './types/branch-types';
import './App.css';

function App() {
  const [workItemId, setWorkItemId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedType, setSelectedType] = useState<BranchType>('feature');
  const [generatedBranch, setGeneratedBranch] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please describe what this branch is for');
      return;
    }

    setError('');
    setIsLoading(true);
    setGeneratedBranch('');
    setExplanation('');
    setCopied(false);

    try {
      const response = await fetch('/api/generate-branch-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description.trim(),
          branchType: selectedType,
          workItemId: workItemId.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate branch name');
      }

      const data = await response.json();
      setGeneratedBranch(data.branchName);
      setExplanation('Branch name generated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate branch name');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (generatedBranch) {
      await navigator.clipboard.writeText(generatedBranch);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const selectedBranchType = BRANCH_TYPES.find(bt => bt.type === selectedType);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-icon">🌿</div>
          <h1 className="title">Git Flow Branch Name Generator</h1>
          <p className="subtitle">
            AI-powered branch naming following Git Flow conventions
          </p>
        </header>

        <div className="main-content">
          {/* Work Item ID Input */}
          <div className="input-group">
            <label className="label">
              <span className="label-icon">🎫</span>
              Work Item ID (Optional)
            </label>
            <input
              type="text"
              value={workItemId}
              onChange={(e) => setWorkItemId(e.target.value)}
              placeholder="e.g., JIRA-123, TICKET-456, #789..."
              className="input"
            />
            <p className="help-text">
              Include a ticket/issue number in your branch name
            </p>
          </div>

          {/* Branch Type Selection */}
          <div className="input-group">
            <label className="label">
              <span className="label-icon">🏷️</span>
              Branch Type
            </label>
            <div className="branch-types">
              {BRANCH_TYPES.map((branchType) => (
                <button
                  key={branchType.type}
                  className={`branch-type-btn ${selectedType === branchType.type ? 'active' : ''}`}
                  onClick={() => setSelectedType(branchType.type)}
                  style={{
                    borderColor: selectedType === branchType.type ? branchType.color : 'transparent',
                  }}
                >
                  <span className="branch-type-icon">{branchType.icon}</span>
                  <span className="branch-type-label">{branchType.label}</span>
                </button>
              ))}
            </div>
            {selectedBranchType && (
              <div className="branch-type-info">
                <p className="branch-type-description">{selectedBranchType.description}</p>
                <p className="branch-type-examples">
                  <strong>Examples:</strong> {selectedBranchType.examples.map(ex => 
                    `${selectedBranchType.type}/${ex}`
                  ).join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Description Input */}
          <div className="input-group">
            <label className="label">
              <span className="label-icon">📝</span>
              What are you working on?
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your task... (e.g., 'Add user authentication with OAuth2')"
              className="textarea"
              rows={4}
            />
            <p className="help-text">Press Enter to generate or Shift+Enter for new line</p>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading || !description.trim()}
            className="generate-btn"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate Branch Name
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Result */}
          {generatedBranch && (
            <div className="result-card">
              <div className="result-header">
                <span className="result-icon">🎯</span>
                <h3>Your Branch Name</h3>
              </div>
              <div className="result-content">
                <div className="branch-name-display">
                  <code className="branch-name">{generatedBranch}</code>
                  <button
                    onClick={handleCopy}
                    className="copy-btn"
                    title="Copy to clipboard"
                  >
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                {explanation && (
                  <div className="explanation">
                    <p className="explanation-label">Status</p>
                    <p className="explanation-text">{explanation}</p>
                  </div>
                )}
                <div className="git-command">
                  <p className="git-command-label">Create this branch:</p>
                  <code className="git-command-text">
                    git checkout -b {generatedBranch}
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>
            Built with ❤️ using{' '}
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
            {' '}&{' '}
            <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer">OpenRouter</a>
          </p>
          <p className="footer-note">
            Following{' '}
            <a href="https://nvie.com/posts/a-successful-git-branching-model/" target="_blank" rel="noopener noreferrer">
              Git Flow
            </a>
            {' '}conventions
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
