# Git Flow Branch Name Generator 🌿

A stylish, AI-powered React application that generates git branch names following Git Flow conventions using OpenRouter API.

> ✅ **Deployed to Vercel** - Live at your Vercel deployment URL

![Branch Name Generator](screenshot.png)

## Features ✨

- **AI-Powered Generation**: Uses OpenRouter API with Claude 3.5 Sonnet for intelligent branch naming
- **Git Flow Conventions**: Follows industry-standard Git Flow branching model
- **5 Branch Types**:
  - 🌟 **feature/**: New features and enhancements
  - 🐛 **bugfix/**: Bug fixes during development
  - 🔥 **hotfix/**: Critical production fixes
  - 🚀 **release/**: Release preparation branches
  - 🛠️ **support/**: Maintenance and legacy support
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Dark Mode**: Eye-friendly dark theme
- **One-Click Copy**: Copy generated branch names instantly
- **Git Command**: Shows ready-to-use git checkout command

## Tech Stack 🚀

- **React 18** with TypeScript
- **Vite** for blazing-fast builds
- **OpenRouter API** for AI capabilities
- **CSS3** with modern gradients and animations
- **Git Flow** branching model

## Getting Started 🏁

### Prerequisites

- Node.js 18+ and npm/yarn
- An OpenRouter API key (get one free at [openrouter.ai](https://openrouter.ai/settings/keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd branch-name-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

The production build will be in the `dist/` folder.

## Usage 💡

1. **Enter Your OpenRouter API Key**
   - Get your free API key from [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
   - Paste it in the API key field (you can toggle visibility)

2. **Select a Branch Type**
   - Choose from feature, bugfix, hotfix, release, or support
   - Each type follows Git Flow conventions

3. **Describe Your Task**
   - Write a brief description of what you're working on
   - Example: "Add user authentication with OAuth2"
   - Press Enter to generate (Shift+Enter for new line)

4. **Get Your Branch Name**
   - AI generates a perfect Git Flow branch name
   - See explanation of why the name works
   - Copy to clipboard with one click
   - Use the provided git command to create the branch

## Git Flow Conventions 📚

This app follows the [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) branching model:

### Branch Naming Format
```
<type>/<descriptive-name>
```

### Examples
- `feature/user-authentication`
- `bugfix/login-error`
- `hotfix/security-patch`
- `release/v1.2.0`
- `support/legacy-v1`

### Rules
- Lowercase letters and numbers only
- Hyphens to separate words (no underscores or spaces)
- Concise (2-5 words max)
- Descriptive but brief

## Project Structure 📁

```
branch-name-app/
├── src/
│   ├── services/
│   │   └── openrouter.ts       # OpenRouter API integration
│   ├── types/
│   │   └── branch-types.ts     # TypeScript types and branch info
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Styling and animations
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## API Integration 🔌

The app uses the OpenRouter API to access Claude 3.5 Sonnet:

```typescript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'anthropic/claude-3.5-sonnet',
    messages: [{ role: 'user', content: prompt }],
  }),
});
```

## Environment Variables 🔐

This app doesn't use `.env` files for security reasons. Users enter their API keys directly in the UI, which are:
- Stored only in browser memory (not persisted)
- Never sent to any server except OpenRouter
- Can be hidden/shown with the visibility toggle

### For Production Deployment

Set `VITE_OPENROUTER_API_KEY` as an environment variable on your hosting platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add: `VITE_OPENROUTER_API_KEY` = your_api_key
3. Select all environments (Production, Preview, Development)
4. Redeploy

**Local Development with Environment Variable:**
```bash
# Copy example file
cp .env.example .env

# Edit .env and add your key
VITE_OPENROUTER_API_KEY=your_api_key_here

# Restart dev server
npm run dev
```

When an environment variable is set, users won't need to enter their API key manually.

## Deployment 🚀

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com/new)
   - Import your repository
   - Add environment variable: `VITE_OPENROUTER_API_KEY`
   - Deploy

3. **Done!** Your app is live with automatic deployments on push

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/branch-name-app)

## Browser Compatibility 🌐

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (responsive design)

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments 🙏

- [OpenRouter](https://openrouter.ai) for providing unified AI API access
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) by Vincent Driessen
- [React](https://react.dev) team for the amazing framework
- [Vite](https://vitejs.dev) for the blazing-fast build tool

## Support 💬

For issues, questions, or suggestions, please:
- Open an issue on GitHub
- Contact via the repository

---

Built with ❤️ using React and OpenRouter

**Happy coding! 🚀**
