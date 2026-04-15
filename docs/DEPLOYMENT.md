# Deployment and Release Guide

This guide defines how YourHome is built, validated, deployed, and rolled back.

## Environments

- **Local**: developer machine using `.env.local`.
- **Preview**: auto-created per pull request.
- **Production**: deployed from protected `main`.

Keep secrets out of the repository. Use host-managed environment variables for preview and production.

## Required Environment Variables

Base app/auth:

- `NEXTAUTH_URL`
- `AUTH_SECRET`
- `DATABASE_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

Payments (when enabled):

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

Use `.env.example` as the canonical list of variables.

## Continuous Integration

GitHub Actions workflow: `.github/workflows/ci.yml`

Checks run on pull requests and pushes to `main`:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`

All checks must pass before merging.

## Continuous Delivery

Recommended: Vercel Git integration

- Pull requests create **Preview Deployments**.
- `main` deploys to **Production**.
- Preview and production use separate environment values.

## Merge Definition of Done

- CI is green (`lint`, `typecheck`, `build`).
- Feature has at least one manual verification in preview.
- No secrets or sensitive values are committed.

## Rollback Procedure

If a production issue is detected:

1. Open hosting dashboard deployment history.
2. Promote/redeploy the last healthy production build.
3. Confirm app health on home, listings, and property detail routes.
4. Open a follow-up fix PR with root-cause details.

## Release Checklist

- [ ] CI passing on target commit
- [ ] Environment variables set in production
- [ ] Preview smoke test complete
- [ ] Monitoring/error tracking checked
- [ ] Rollback target identified
