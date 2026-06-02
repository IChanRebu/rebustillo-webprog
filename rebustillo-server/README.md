Deployment and Vercel setup

1) Required production environment variables (set via Vercel Dashboard or CLI):

- MONGODB_URI
  - Example: mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
- JWT_SECRET
  - Example: a long random secret string used to sign tokens
- FRONTEND_URL
  - Example: https://rebustillo-webprog.vercel.app

2) Recommended: Add secrets via Vercel CLI

```bash
# login once
vercel login
# add secrets (replace values)
vercel secrets add mongo_uri "mongodb+srv://REPLACE_USER:REPLACE_PASSWORD@rebustillo.akuwx3j.mongodb.net/rebustillo?retryWrites=true&w=majority"
vercel secrets add jwt_secret "REPLACE_WITH_LONG_JWT_SECRET"
```

After creating secrets you can reference them in `vercel.json` as `@mongo_uri` and `@jwt_secret`, or add environment variables via the Project Settings UI.

3) Deploying

From the `rebustillo-server` folder:

```bash
vercel --prod
```

From the `rebustillo-client` folder (ensure `VITE_API_BASE_URL` is set to the backend URL in Project Settings):

```bash
vercel --prod
```

4) Troubleshooting

- If you see `MongoDB connect attempt X failed: querySrv ECONNREFUSED` in logs, ensure your Vercel project has the correct `MONGODB_URI` and that Atlas network access allows connections from Vercel (allow access from anywhere or add Vercel IP ranges).
- Use `vercel logs <project-alias> --prod` to inspect recent function logs.
- Use `/health` endpoint to check DB connectivity: `https://<your-backend>.vercel.app/health`
