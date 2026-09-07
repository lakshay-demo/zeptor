# Zeptor Backend

This backend is structured for the current Supabase-based project.

## Setup

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials
3. Run:

```bash
npm install
npm run dev
```

## Available routes

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/resend-verification`
- `POST /api/auth/reset-password`

### Profile
- `GET /api/profile/me` (requires auth)
- `PUT /api/profile/me` (requires auth)

### Admin
- `GET /api/admin/dashboard` (requires auth + admin)

### Registrations
- `POST /api/registrations/season2`
- `GET /api/registrations/season2` (requires auth + admin)

## Notes

- Do not expose service-role or SMTP secrets in the frontend.
- Keep all private credentials in Supabase configuration or backend `.env` files only.
