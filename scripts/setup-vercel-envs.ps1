<#
PowerShell helper to add Vercel secrets and production envs.
Run this locally after installing the Vercel CLI and logging in (`vercel login`).
#>

param()

function Read-SecureInput($prompt) {
    $ss = Read-Host -Prompt $prompt -AsSecureString
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($ss)
    try { [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
}

Write-Host "This script will add two Vercel secrets: 'mongo_uri' and 'jwt_secret', and then remind you to deploy."

$mongo = Read-SecureInput "Enter MongoDB Atlas connection string (MONGODB_URI)"
$jwt = Read-SecureInput "Enter JWT secret (JWT_SECRET)"

if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Error "Vercel CLI not found. Install it first: npm i -g vercel"
    exit 1
}

Write-Host "Adding secrets to Vercel (these commands will send the secret values to Vercel)."

# Add secrets (will error if secret exists)
try {
    vercel secrets add mongo_uri "$mongo" 2>$null
    Write-Host "Added secret 'mongo_uri'"
} catch {
    Write-Warning "Could not add 'mongo_uri' (it may already exist)."
}

try {
    vercel secrets add jwt_secret "$jwt" 2>$null
    Write-Host "Added secret 'jwt_secret'"
} catch {
    Write-Warning "Could not add 'jwt_secret' (it may already exist)."
}

Write-Host "Secrets added (or already existed). Next steps:"
Write-Host "1) Ensure you have the `vercel.json` in the backend referencing @mongo_uri and @jwt_secret (already updated in repo)."
Write-Host "2) From the 'rebustillo-server' folder, run:"
Write-Host "   vercel --prod"
Write-Host "3) For the frontend, set `VITE_API_BASE_URL` in the frontend project settings (Dashboard) to point to the deployed backend API URL, then run:"
Write-Host "   cd ../rebustillo-client && vercel --prod"

Write-Host "If you prefer the Dashboard UI: open your Project -> Settings -> Environment Variables, and add MONGODB_URI and JWT_SECRET pointing to the secrets."
