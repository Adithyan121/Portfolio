---
description: How to fix email sending configuration in hosted environment
---

# Fix Email Sending Configuration

If email sending works locally but not in your hosted environment (e.g., Vercel, Netlify, Render), it is almost certainly because the required environment variables are missing in the production configuration.

### 1. Identify Required Variables

Open your local `.env` file and look for the following keys:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID2` (Note: The code uses `TEMPLATE_ID2`, make sure you set this one)
- `VITE_EMAILJS_PUBLIC_KEY`

### 2. Add Variables to Hosting Provider

**For Vercel:**
1.  Go to your project dashboard.
2.  Navigate to **Settings** > **Environment Variables**.
3.  Add each of the keys above with their corresponding values from your local `.env` file.
4.  **Redeploy** your application for the changes to take effect.

**For Netlify:**
1.  Go to **Site configuration** > **Environment variables**.
2.  Add the variables similarly.
3.  Trigger a new deploy.

**For Render:**
1.  Go to your service dashboard.
2.  Click **Environment**.
3.  Add the environment variables.

### 3. Verify Domain Whitelist

1.  Log in to your [EmailJS Dashboard](https://dashboard.emailjs.com/).
2.  Go to **Account** (or Settings).
3.  Check if there is a **Domain Whitelist** or **Origin Check**.
4.  Ensure your production domain (e.g., `https://your-portfolio.vercel.app`) is allowed. If "Allow all origins" is unchecked, add your domain.

### 4. Debugging

I have updated `About.jsx` to provide specific error alerts. 
- If you see **"Configuration Error: Email sending service is not properly configured."**, it means the environment variables are missing.
- If you see **"Failed to send email..."**, check the browser console (F12) for the exact error message from EmailJS.
