# Iroshan Dissanayake — Portfolio

A fast, static portfolio site (plain HTML, CSS and JavaScript). No build step, no
dependencies, and fonts are self-hosted, so it works on GitHub Pages as-is.

```
.
├── index.html                 all page content
├── css/style.css              styling
├── js/script.js               tabs, project filter, mobile menu
├── .nojekyll                  tells GitHub Pages to serve files as they are
└── assets/
    ├── fonts/                 Bricolage Grotesque + IBM Plex Sans (SIL OFL)
    ├── images/
    │   ├── profile.jpg
    │   └── projects/          one image per project card (incl. Autonomous-UAV.jpeg)
    └── resume/
        └── Iroshan_Dissanayake_CV.pdf   <- public CV (references removed)
```

## Publish on GitHub Pages

1. **Create the repository.** On github.com click **New repository**.
   - For the address `https://<your-username>.github.io/`, name it exactly
     `<your-username>.github.io`.
   - Any other name also works and publishes at
     `https://<your-username>.github.io/<repo-name>/`.
   - Set it to **Public**, then create it.
2. **Add the files** (pick one way).
   - *In the browser:* on the empty repo page choose **uploading an existing file**,
     then drag in the **contents** of this folder (`index.html`, `css`, `js`,
     `assets`), not the outer folder itself, so that `index.html` sits at the
     top level. Click **Commit changes**.
   - *With Git:*
     ```
     cd portfolio
     git init
     git add .
     git commit -m "Initial portfolio site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<repo-name>.git
     git push -u origin main
     ```
3. **Turn on Pages.** In the repo go to **Settings → Pages**. Under
   **Build and deployment**, set **Source** to **Deploy from a branch**, choose
   branch **main** and folder **/ (root)**, then **Save**.
4. **Wait 1 to 2 minutes**, refresh the Pages screen, and your live link appears at
   the top. Add it to your LinkedIn and CV.
5. **Update later:** edit a file on GitHub (pencil icon) or `git push`. The site
   redeploys automatically.

Optional custom domain: **Settings → Pages → Custom domain**, then add a `CNAME`
record at your DNS provider pointing to `<your-username>.github.io`.

## Before you publish, check these

- **CV file.** `assets/resume/Iroshan_Dissanayake_CV.pdf` is already included, with the
  References section removed. The public repo exposes anything you upload.
- **LinkedIn link.** It uses `linkedin.com/in/iroshan-dissanayake` from your CV. Open it
  once to confirm it reaches your profile.

## Add or edit a project

In `index.html`, find the comment "To add a project", copy one
`<article class="tile" ...>` block, then change the image path, title, text, chips
and `data-tags`. Valid tags: `vision`, `robotics`, `automation`, `iot` (separate
several with a space). Tags drive the filter buttons on the Projects tab.

## Run it locally

Open `index.html` in a browser, or serve it the way GitHub does:

```
python3 -m http.server 8000
```

then visit http://localhost:8000
