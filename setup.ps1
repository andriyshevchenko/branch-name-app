# Development Setup Script

Write-Host "🌿 Git Flow Branch Name Generator - Setup" -ForegroundColor Green
Write-Host ""

# Check if .env exists
if (Test-Path .env) {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
} else {
    Write-Host "📝 Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ .env file created!" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  Please edit .env and add your OpenRouter API key" -ForegroundColor Yellow
    Write-Host "   Get your key at: https://openrouter.ai/settings/keys" -ForegroundColor Cyan
    Write-Host ""
}

# Check if node_modules exists
if (Test-Path node_modules) {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
} else {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🚀 Setup complete! Run 'npm run dev' to start the dev server" -ForegroundColor Green
Write-Host ""
