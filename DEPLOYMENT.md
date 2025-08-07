# Deployment Guide - Swaggoz

This guide will help you deploy Swaggoz to Vercel (frontend) and Render (backend).

## 🚀 Quick Deployment

### Step 1: Push to GitHub

1. **Initialize Git and push to your repository:**
```bash
git add .
git commit -m "Initial commit: Swaggoz AI API Testing Platform"
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" and select "Web Service"**
3. **Connect your GitHub repository:**
   - Select the `gonaakshay/Swaggoz` repository
   - Choose the main branch

4. **Configure the service:**
   - **Name**: `swaggoz-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd swagteam/backend && npm install`
   - **Start Command**: `cd swagteam/backend && node server.js`
   - **Plan**: Free

5. **Set Environment Variables:**
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `OPENROUTER_API_KEY`: `your_openrouter_api_key_here`
   - `OPENROUTER_BASE_URL`: `https://openrouter.ai/api/v1`
   - `QWEN3_MODEL`: `qwen/qwen3-coder`
   - `CORS_ORIGINS`: `https://your-frontend-url.vercel.app` (you'll update this after frontend deployment)

6. **Click "Create Web Service"**

7. **Wait for deployment to complete and note the URL** (e.g., `https://swaggoz-backend.onrender.com`)

### Step 3: Deploy Frontend to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository:**
   - Select the `gonaakshay/Swaggoz` repository
   - Choose the main branch

4. **Configure the project:**
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `swagteam/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. **Set Environment Variables:**
   - `REACT_APP_BACKEND_URL`: `https://your-backend-url.onrender.com` (use the URL from Step 2)

6. **Click "Deploy"**

7. **Wait for deployment to complete and note the URL** (e.g., `https://swaggoz-frontend.vercel.app`)

### Step 4: Update CORS Settings

1. **Go back to Render Dashboard**
2. **Find your backend service**
3. **Go to Environment Variables**
4. **Update `CORS_ORIGINS`** with your frontend URL:
   - `https://swaggoz-frontend.vercel.app`

5. **Redeploy the backend service**

## 🔧 Manual Deployment

### Backend (Render)

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Use these settings:**
   ```yaml
   Name: swaggoz-backend
   Environment: Node
   Build Command: cd swagteam/backend && npm install
   Start Command: cd swagteam/backend && node server.js
   ```

4. **Environment Variables:**
   ```env
   NODE_ENV=production
   PORT=5000
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
   QWEN3_MODEL=qwen/qwen3-coder
   CORS_ORIGINS=https://your-frontend-url.vercel.app
   ```

### Frontend (Vercel)

1. **Create a new project on Vercel**
2. **Import your GitHub repository**
3. **Use these settings:**
   - Framework: Create React App
   - Root Directory: `swagteam/frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Environment Variables:**
   ```env
   REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
   ```

## 🔑 Required API Keys

### OpenRouter API Key

1. **Go to [OpenRouter](https://openrouter.ai/)**
2. **Sign up for an account**
3. **Navigate to API Keys**
4. **Create a new API key**
5. **Copy the key and use it in your backend environment variables**

## 📊 Monitoring

### Render Monitoring

- **Logs**: Available in the Render dashboard
- **Metrics**: CPU, memory, and response time
- **Health Checks**: Automatic health checks

### Vercel Monitoring

- **Analytics**: Built-in analytics
- **Performance**: Core Web Vitals
- **Functions**: Serverless function logs

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `CORS_ORIGINS` is set correctly
   - Include the full frontend URL (with https://)

2. **Build Failures**
   - Check if all dependencies are in `package.json`
   - Verify Node.js version compatibility

3. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names

4. **API Key Issues**
   - Verify your OpenRouter API key is valid
   - Check if the key has sufficient credits

### Debug Mode

To enable debug logging:

1. **Add to backend environment variables:**
   ```env
   NODE_ENV=development
   ```

2. **Check logs in Render dashboard**

## 🔄 Updates

### Updating the Application

1. **Make changes to your code**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```

3. **Automatic deployment** will trigger on both Vercel and Render

### Manual Redeployment

- **Vercel**: Go to project dashboard → Deployments → Redeploy
- **Render**: Go to service dashboard → Manual Deploy

## 📞 Support

If you encounter issues:

1. **Check the logs** in both Vercel and Render dashboards
2. **Verify environment variables** are set correctly
3. **Test locally** before deploying
4. **Open an issue** on GitHub if the problem persists

---

**Happy Deploying! 🚀**
