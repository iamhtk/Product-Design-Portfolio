# Deploy your portfolio to Cloudflare Pages (GitHub + Cloudflare)

Your project is a **Vite + React** app. Build output goes to the `build/` folder. Follow these steps to host it on Cloudflare Pages using your GitHub repo.

---

## Step 1: Push your code to GitHub

### 1.1 Initialize Git (if not already)

In the project folder, open Terminal and run:

```bash
cd "/Users/hrithiksanyal/Downloads/Portfolio playground/Portfolio 2026"
git init
```

### 1.2 Stage and commit

```bash
git add .
git commit -m "Initial commit: portfolio site"
```

### 1.3 Create a repo on GitHub and push

1. Go to [github.com](https://github.com) → **New repository**.
2. Name it (e.g. `portfolio-2026`). Don’t add a README or .gitignore (you already have one).
3. Copy the “push an existing repository” commands and run them in your project folder. They look like:

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio-2026.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `portfolio-2026` with your GitHub username and repo name.

---

## Step 2: Deploy with Cloudflare Pages

### 2.1 Log in to Cloudflare

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com).
2. Sign in (or create an account).

### 2.2 Create a Pages project from GitHub

1. In the left sidebar, open **Workers & Pages**.
2. Click **Create** → **Pages** → **Connect to Git**.
3. Choose **GitHub** and authorize Cloudflare to access your account (if asked).
4. Select the repository you just pushed (e.g. `portfolio-2026`).
5. Click **Begin setup**.

### 2.3 Set build settings

Use these values:

| Setting              | Value            |
|----------------------|------------------|
| **Project name**     | e.g. `portfolio-2026` (or any name you like) |
| **Production branch**| `main`           |
| **Build command**    | `npm run build`   |
| **Build output directory** | `build`   |

Then click **Save and Deploy**.

### 2.4 Wait for the first deploy

Cloudflare will install dependencies, run `npm run build`, and deploy the `build/` folder. The first run may take 1–2 minutes.

### 2.5 Get your live URL

When the deploy finishes, you’ll see a URL like:

- `https://portfolio-2026.pages.dev`

That’s your live site. You can share it or add a custom domain later.

---

## Step 3 (optional): Custom domain

1. In Cloudflare Pages, open your project.
2. Go to **Custom domains**.
3. Click **Set up a custom domain** and follow the steps (e.g. add a CNAME or use Cloudflare nameservers if you use Cloudflare DNS).

---

## Step 4: Updates

Whenever you push to the `main` branch on GitHub, Cloudflare will automatically rebuild and redeploy:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

---

## Quick reference

| Item        | Value              |
|------------|--------------------|
| Build cmd  | `npm run build`     |
| Output dir | `build`             |
| Branch     | `main`              |

If a build fails, check the **Build logs** in the Cloudflare Pages project for errors.
