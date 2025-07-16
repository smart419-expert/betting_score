# OAuth Setup Guide

## For Local Development

1. **Supabase Dashboard Settings** (Local):
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Set Site URL: `http://localhost:3000`
   - Add Redirect URLs:
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/auth/callback/`

## For Production (Vercel)

1. **Supabase Dashboard Settings** (Production):
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Set Site URL: `https://gambino-ten.vercel.app`
   - Add Redirect URLs:
     - `https://gambino-ten.vercel.app/auth/callback`
     - `https://gambino-ten.vercel.app/auth/callback/`

## Environment Variables

Make sure you have these environment variables set:

### Local (.env.local):
```
NEXT_PUBLIC_SUPABASE_URL=https://fojrhumfkvkivwdjahpf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Vercel (Environment Variables):
```
NEXT_PUBLIC_SUPABASE_URL=https://fojrhumfkvkivwdjahpf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## How It Works

The application now automatically detects the environment:

- **Local Development**: Uses `http://localhost:3000/auth/callback`
- **Production**: Uses `https://gambino-ten.vercel.app/auth/callback`

## Testing

1. **Local Testing**:
   - Run `npm run dev`
   - Go to `http://localhost:3000/register`
   - Try Google OAuth signup

2. **Production Testing**:
   - Deploy to Vercel
   - Go to `https://gambino-ten.vercel.app/register`
   - Try Google OAuth signup

## Debug Components

The dashboard now includes debug components that show:
- Current authentication state
- Environment configuration
- OAuth redirect URLs being used

Remove these components after testing is complete. 