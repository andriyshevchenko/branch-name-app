# Git Flow Branch Name Generator - Quick Start Guide

## 🚀 Quick Start (3 steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Get Your OpenRouter API Key
1. Go to [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
2. Sign up (it's free!)
3. Create a new API key
4. Copy and paste it into the app

## 📋 What You Get

✨ **AI-Powered Branch Names** - Smart branch naming using Claude 3.5 Sonnet  
🎨 **Beautiful UI** - Modern dark theme with smooth animations  
🌿 **Git Flow Support** - feature/, bugfix/, hotfix/, release/, support/ branches  
📋 **One-Click Copy** - Copy branch names instantly  
⚡ **Fast** - Built with Vite for lightning-fast dev experience  

## 🎯 How to Use

1. **Enter API Key** - Paste your OpenRouter key (toggle visibility with the eye icon)
2. **Pick Branch Type** - Choose from 5 Git Flow branch types
3. **Describe Task** - Write what you're working on
4. **Generate** - Click button or press Enter
5. **Copy & Use** - Copy the generated branch name

## 📚 Git Flow Branch Types

- **feature/** - New features (e.g., `feature/user-authentication`)
- **bugfix/** - Development bugs (e.g., `bugfix/login-error`)
- **hotfix/** - Production fixes (e.g., `hotfix/security-patch`)
- **release/** - Release prep (e.g., `release/v1.2.0`)
- **support/** - Legacy support (e.g., `support/legacy-v1`)

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start dev server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── services/
│   └── openrouter.ts      # OpenRouter API integration
├── types/
│   └── branch-types.ts    # TypeScript types
├── App.tsx                # Main component
├── App.css                # Styles
└── main.tsx               # Entry point
```

## 🔒 Security Note

Your API key is:
- ✅ Only stored in browser memory
- ✅ Never sent to any server except OpenRouter
- ✅ Not persisted to disk
- ✅ Can be hidden/shown for privacy

## ⚡ Troubleshooting

### TypeScript Errors in Editor
If you see TypeScript errors in VS Code, try:
1. Close and reopen VS Code
2. Run: `npx tsc --noEmit` to verify (errors are cosmetic if build works)
3. Restart TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

## 💡 Tips

1. **Press Enter** to generate (Shift+Enter for new line in textarea)
2. **Be specific** in your description for better names
3. **Check examples** for each branch type
4. **Copy with one click** - no need to select text

## 🎨 Customization

Want to customize? Edit these files:
- **Colors/Theme**: `src/App.css` (CSS variables at top)
- **Branch Types**: `src/types/branch-types.ts`
- **AI Prompt**: `src/services/openrouter.ts` (createPrompt method)

## 📖 Learn More

- [Git Flow Guide](https://nvie.com/posts/a-successful-git-branching-model/)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)

---

**Ready to start?** Run `npm install && npm run dev` 🚀
