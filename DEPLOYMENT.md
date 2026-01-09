# 🚀 Deployment Guide - Vercel

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/branch-name-app.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **Add Environment Variable**
   - In your Vercel project dashboard
   - Go to **Settings** → **Environment Variables**
   - Add variable:
     - **Name**: `VITE_OPENROUTER_API_KEY`
     - **Value**: Your OpenRouter API key
     - **Environment**: Production, Preview, Development (select all)
   - Click "Save"
   - Redeploy your project

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variable**
   ```bash
   vercel env add VITE_OPENROUTER_API_KEY
   ```
   - Select: Production, Preview, Development
   - Paste your OpenRouter API key
   - Press Enter

5. **Redeploy**
   ```bash
   vercel --prod
   ```

## Environment Variables

### Local Development

1. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

2. **Add your API key**
   ```env
   VITE_OPENROUTER_API_KEY=your_actual_api_key_here
   ```

3. **Restart dev server**
   ```bash
   npm run dev
   ```

### Production (Vercel)

Add in Vercel Dashboard → Settings → Environment Variables:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `VITE_OPENROUTER_API_KEY` | Your API key | Production, Preview, Development |

## How It Works

### With Environment Variable
- API key is loaded automatically from `VITE_OPENROUTER_API_KEY`
- Users don't need to enter their key
- Perfect for team/public deployments
- More secure (key not visible in UI)

### Without Environment Variable
- Users enter their own API key in the UI
- Key stored only in browser memory
- Good for local development or public demos

## Build Commands

```bash
# Local development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Vercel Configuration

The `vercel.json` file configures:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- Environment variables

## Custom Domain

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (usually < 5 minutes)

## Automatic Deployments

Once connected to GitHub:
- **Push to main** → Deploys to production
- **Pull requests** → Creates preview deployments
- **Commits** → Auto-rebuilds

## Troubleshooting

### Environment Variable Not Working
1. Check variable name is exactly: `VITE_OPENROUTER_API_KEY`
2. Redeploy after adding environment variable
3. Check Vercel deployment logs for errors

### Build Fails
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run lint
```

### CORS Issues
OpenRouter API supports CORS, but ensure:
- HTTP-Referer header is set (already configured)
- API key is valid and active

## Security Notes

### ⚠️ Important
- Never commit `.env` file to git (already in `.gitignore`)
- Never expose API keys in client-side code (except via env vars)
- Rotate keys if accidentally exposed
- Consider using Vercel's encrypted environment variables

### Best Practices
1. **Use environment variables** for production
2. **Restrict API key** in OpenRouter dashboard (set allowed domains)
3. **Monitor usage** in OpenRouter dashboard
4. **Set spending limits** to prevent unexpected costs

## Performance

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Edge caching
- ✅ Brotli compression
- ✅ Image optimization
- ✅ Analytics

## Cost

- **Vercel Hobby Plan**: Free
  - Unlimited deployments
  - Automatic HTTPS
  - 100GB bandwidth/month
  - Perfect for this app!

- **OpenRouter**: Pay-as-you-go
  - Claude 3.5 Sonnet: ~$0.003 per request
  - Free credits available for new users

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **OpenRouter Docs**: [openrouter.ai/docs](https://openrouter.ai/docs)

---

**Ready to deploy?** Run `vercel` or connect to GitHub! 🚀
