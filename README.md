# Emmanuel Acquah — Portfolio

A personal portfolio site for Emmanuel Acquah: software developer, Computer Science
graduate of Koforidua Technical University (Ghana), with research interests in
cybersecurity.

It is a single scrolling page covering about, skills, projects, experience,
leadership, education, research interests, achievements and contact — built so
the content can be updated by editing data files, not JSX.

> **Not yet published.** The production build works and the project is
> deployment-ready, but nothing has been deployed. See
> [Before you publish](#before-you-publish) and [Deployment](#deployment).

---

## Tech stack

| Area        | Choice                                               |
| ----------- | ---------------------------------------------------- |
| Framework   | React 19 + TypeScript                                 |
| Build       | Vite 8                                                |
| Styling     | Tailwind CSS v4 (CSS-variable design tokens)          |
| Icons       | `lucide-react`, plus four hand-written brand marks    |
| Fonts       | Space Grotesk, Inter, JetBrains Mono — self-hosted    |
| Animation   | None. ~40 lines of `IntersectionObserver` + CSS       |
| Lint        | oxlint                                                |

**No animation library.** Scroll reveals are a small `<Reveal>` component over
`IntersectionObserver` and a CSS transition. That keeps the bundle to React plus
icons, and the whole motion system is disabled by one `prefers-reduced-motion`
block in `src/index.css`.

**No router.** Everything lives on one page, so section anchors are enough. A
branded `public/404.html` covers unknown URLs on both Vercel and Netlify.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Dev server with hot reload                       |
| `npm run build`   | Type-check (`tsc -b`) then build to `dist/`      |
| `npm run preview` | Serve the production build locally               |
| `npm run lint`    | Run oxlint                                       |

Requires Node 20 or newer (built and tested on Node 26).

---

## Updating the content

Everything you will want to change lives in `src/data/`. You should not need to
touch a component to add a project or update your education.

| File              | What it holds                                                |
| ----------------- | ------------------------------------------------------------ |
| `profile.ts`      | Name, headline, intro, **contact links**, **feature switches**, nav order, SEO strings |
| `about.ts`        | About paragraphs and the three highlight cards                |
| `skills.ts`       | Skill groups and each skill's honesty level                   |
| `projects.ts`     | Project cards — description, problem, contribution, features, tech, links, optional `award` badge, `motif` and `screenshots` |
| `experience.ts`   | Professional timeline — role, organization, `engagement` badge, optional `context` and `focus` chips |
| `leadership.ts`   | University leadership roles                                   |
| `education.ts`    | Qualifications, CGPA, gated honours                           |
| `research.ts`     | Research interests and intro                                  |
| `achievements.ts` | Achievements — award/competition details, optional project block linking into `projects.ts`, each behind a `verified` flag |
| `gallery.ts`      | Gallery *types and categories*. The images themselves are JSON files in `content/gallery/` — see below |
| `seo.ts`          | Page title, descriptions and the canonical domain              |

Two things are *not* in `src/data/` because the CMS needs to write them:
`content/settings/contact.json` (email + social links) and
`content/settings/profile-photo.json` (the hero portrait).

### How "not configured yet" is handled

Any link left as an empty string (`''`) is **hidden**, not rendered as a dead
link. In `npm run dev` an amber hint appears in its place telling you what is
missing; in a production build that hint renders nothing at all. So you can see
your outstanding to-dos locally without a visitor ever seeing a placeholder.

### Claims that stay off the page until you confirm them

Two things are deliberately gated, because they depend on an official record:

- **`src/data/education.ts`** → `record.honours.verified`. On the **B.Tech.**
  entry this is still `false`, so the *Distinction* classification does not
  render; your CGPA renders either way, since you supplied it directly. On the
  **HND** entry it is `true`, so the *Best Graduating Student* award shows.
- **`src/data/achievements.ts`** → each entry's `verified`. While `false`, that
  achievement is not shown. With nothing verified, the whole Achievements
  section is omitted from the page rather than rendered empty. Both current
  entries are `true`.

Flip them to `true` once you have the transcript, award letter or certificate.

### Honesty levels in the skills section

There are no percentage bars. Each skill carries a level, shown as a legend at
the top of the section:

- `applied` — *Used in projects*
- `working` — *Working knowledge*
- `learning` — *Currently learning* (carries a visible "Learning" tag)

### Shipped vs planned features

Each project has two separate lists: `features` (built, demonstrable) and
`inProgress` (planned or partially built). They render as **Key features** and
**In development** and are never merged, so a planned feature cannot read as a
shipped one.

---

## Images: profile photo and gallery

All images live under `public/images/`, which has one folder per purpose and a
`README.md` of its own with sizing and naming guidance.

```
public/images/
  profile/        your photograph (one file)
  projects/       app and website screenshots
  certificates/   certificates and award letters
  gallery/        event, competition and training photographs
```

A file at `public/images/profile/me.webp` is referenced as
`/images/profile/me.webp` — the `public/` part is dropped.

### Your profile photo

Either upload it at `/admin` → **Profile → Profile photo**, or by hand:

1. Save the photograph into `public/images/profile/`.
2. Set `src` in `content/settings/profile-photo.json`:

```json
{
  "src": "/images/profile/emmanuel-acquah.webp",
  "alt": "Emmanuel Acquah",
  "position": "center 30%",
  "caption": "Emmanuel Acquah · Koforidua, Ghana"
}
```

That is the only edit. The hero portrait and its caption both read from here.

The frame holds a fixed 4:5 ratio and the image is `object-fit: cover`, so your
photo is never stretched and the hero never jumps as it loads. If the crop cuts
your head off, adjust `position` — `'center 20%'` pulls the crop higher,
`'center 50%'` centres it.

While `src` is empty the frame shows an **EA monogram panel**. That is
deliberate: no stock face is ever substituted for you, and the monogram is
presentable enough to ship if you would rather not use a photograph at all. In
`npm run dev` an amber hint under the frame names the exact file to add; it
renders nothing in a production build.

## Uploading images from /admin

The site ships with a content editor at **`/admin`**, powered by
[Sveltia CMS](https://github.com/sveltia/sveltia-cms). You log in, drag an
image in, fill in a title and category, and hit publish. Behind the scenes it
commits the image and a small JSON file to your GitHub repo, which triggers a
rebuild — so what you publish genuinely persists. There is no database and no
upload server to run.

It manages two things: **gallery images** and **your profile photo**. The rest
of the site stays in `src/data/*.ts`, which is simpler to edit directly.

### Why the gallery data moved

A CMS can edit JSON and Markdown, not TypeScript. So each gallery image is now
its own file in `content/gallery/`, and `src/data/gallery.ts` collects them at
build time with `import.meta.glob`. You can still write those JSON files by
hand — the CMS is a convenience, not a requirement.

### Setting it up

**1. Put the project on GitHub.** The repo is already initialised locally with
one commit on `main`. Create an empty repository on github.com, then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

**2. Point the CMS at it.** In `public/admin/config.yml`, change:

```yaml
backend:
  name: github
  repo: your-username/my-portfolio-website   # ← your repo
  branch: main
```

**3. Deploy** to Vercel or Netlify as described under [Deployment](#deployment).

**4. Sign in** at `https://your-domain.com/admin`. Three options, easiest
first:

| Method | Setup needed | Good for |
| ------ | ------------ | -------- |
| **Access token** | None. Create a GitHub [fine-grained personal access token](https://github.com/settings/tokens) with read/write access to *Contents* on this one repo, then click *Sign In Using Access Token*. | Getting going today |
| **Sveltia authenticator** | Deploy [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) to a free Cloudflare Workers account, register a GitHub OAuth app, then add `base_url: https://your-worker-url` under `backend:` | A proper *Sign in with GitHub* button |
| **Netlify** | If hosting on Netlify, register a GitHub OAuth app and link it in the Netlify dashboard. No config change needed. | Netlify users |

The access-token route needs no extra infrastructure at all. You can move to
OAuth later without changing anything else.

### Editing without deploying

You don't need GitHub to try it. Run `npm run dev`, open
`http://localhost:5173/admin/`, and click **Work with Local Repository** —
Sveltia asks for permission to this folder and edits the files on disk
directly. Your changes show up in the running dev server immediately. (Chrome
or Edge; the API this uses isn't in Safari or Firefox yet.)

### A note on the pinned version

`public/admin/index.html` loads Sveltia from a CDN at an **exact version**,
not `latest`. The package is pre-1.0 and releases very often, and an admin
screen that silently changes under you is worse than one you update
deliberately. To update, bump the version in that file and check the page
still loads.

Sveltia is config-compatible with [Decap CMS](https://decapcms.org), so if you
ever want to switch, it's a one-line change to the script tag.

### The gallery

The Gallery section holds screenshots, certificates and photographs, grouped
into four categories:

| Category id    | Shown as     | For                                              |
| -------------- | ------------ | ------------------------------------------------ |
| `projects`     | Projects     | App and website screenshots                       |
| `certificates` | Certificates | Certificates, award letters, academic recognition |
| `events`       | Events       | Competitions, tech events, presentations          |
| `professional` | Professional | Training sessions and other professional activity |

The easy way is `/admin`. By hand: save the file into `public/images/...` and
create one JSON file in `content/gallery/`, named however you like:

```json
{
  "src": "/images/gallery/src-week-training.webp",
  "alt": "Leading a Microsoft Office session for students at SRC Week",
  "title": "Digital skills training",
  "category": "events",
  "date": "2026",
  "caption": "GNUT training program, Koforidua Technical University",
  "order": 1,
  "width": 1600,
  "height": 1200
}
```

`src`, `alt`, `title` and `category` are required; the rest are optional. An
entry missing an image or carrying an unknown category is skipped rather than
rendered broken, so a half-finished draft can't break the grid.

Nothing else needs changing:

- **Category filters** appear automatically, and only for categories that
  actually contain images. With images in one category only, no filter bar is
  shown at all.
- **The nav link** appears once there is at least one image, and the whole
  section stays out of the production build while the list is empty — so you
  never ship an empty gallery or a nav link pointing at nothing. In `npm run
  dev` the section stays visible with instructions.
- **The lightbox** is wired up for every image: click a tile to enlarge, arrow
  keys or the on-screen arrows to move between images, Escape or a click on the
  backdrop to close.

`width` and `height` are the file's real pixel dimensions. They are optional,
but supplying them lets the browser reserve the right space before the image
arrives. The grid itself uses fixed 4:3 tiles, so thumbnails never cause layout
shift either way.

`alt` matters: describe what is in the picture. Someone using a screen reader
gets that sentence in place of the image.

## Configuring links and the résumé

All of this is in `src/data/profile.ts`.

### Contact and social links

Edit at `/admin` → **Settings → Contact and social links**, or by hand in
`content/settings/contact.json`:

```json
{
  "email": "emmanuel.a@xolaceinc.com",
  "github": "https://github.com/your-username",
  "linkedin": "https://www.linkedin.com/in/your-handle",
  "x": "https://x.com/your-handle",
  "locationLine": "Koforidua, Ghana"
}
```

Paste the **full URL including `https://`** — a bare username will not work.
Any link left as `""` is hidden everywhere (footer, Contact section) rather
than rendered as a dead button, so there is never a broken link on the page.

### Feature switches

```ts
export const features = {
  openToOpportunities: true,   // the green hero pill — set false any time
  resume: { enabled: false, href: '/emmanuel-acquah-resume.pdf', label: 'View My Résumé' },
  achievements: true,
  themeToggle: true,           // dark stays the default either way
}
```

### Résumé download

1. Put the PDF at `public/emmanuel-acquah-resume.pdf`.
2. Set `features.resume.enabled` to `true`.

The link then appears in the hero and the contact section. Until then it is
hidden in both — there is no broken download.

### Optional contact form

The site works entirely on `mailto:` links by default. If you want a form as
well, copy `.env.example` to `.env.local` and set:

```
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
```

Any service that accepts a JSON `POST` works — Formspree, Web3Forms, your own
function. With the variable unset, the form simply does not render.

The form validates inputs, shows loading / success / error states, and reports
success **only** on a 2xx response — a failure says so and points to the email
address instead. It carries a honeypot field for bots.

> **Never put a secret in a `VITE_`-prefixed variable.** Anything so prefixed is
> bundled into the JavaScript and is publicly readable. Form-relay endpoint URLs
> are public by design; API keys are not.

---

## Design system

All colour lives in CSS custom properties in `src/index.css`, defined twice —
once for dark (the default) and once for `.light`. Tailwind utilities read them
through `@theme inline`, so changing a brand colour is a one-line edit and
nothing drifts.

```
--c-base      #0B1020   page background        --c-accent  #4F8CFF  electric blue
--c-surface   #11182B   cards                  --c-violet  #8B5CF6  violet
--c-ink       #F8FAFC   primary text           --c-cyan    #22D3EE  cyan
--c-muted     #A7B0C0   secondary text
```

Two naming traps worth knowing if you extend the theme:

- The background token is exposed to Tailwind as **`canvas`**, not `base`. A
  `--color-base` entry would make Tailwind generate `text-base` as a *colour*
  utility and silently clobber the font size.
- Shadow tokens are stored as `--sh-card` / `--sh-lift` and mapped to
  `--shadow-card` / `--shadow-lift` in `@theme`, to avoid a self-referential
  variable.

Theme choice is stored in `localStorage` under `ea-theme` and applied by a tiny
inline script in `index.html` before first paint, so there is no flash of the
wrong background.

---

## Project structure

```
public/            favicon.svg · og-image.png · 404.html
  admin/           the CMS editor (index.html + config.yml)
                   (robots.txt and sitemap.xml are generated at build time)
  images/          profile/ · projects/ · certificates/ · gallery/
                   — drop your files here; see images/README.md
scripts/
  og-image.html    source for the social preview image (see below)
content/           CMS-editable content (JSON)
  settings/        profile-photo.json
  gallery/         one file per gallery image
vite-plugins/
  site-metadata.ts substitutes seo.ts into index.html; emits robots/sitemap
src/
  components/      Navbar · Footer · Button · Section · SectionHeading · Chip
                   ProjectCard · ProjectMotif · Timeline · SkillGroupCard
                   CodeCard · ProfilePhoto · Lightbox · ContactForm
                   SocialLinks · BrandIcons
                   Reveal · Backdrop · ThemeToggle · DevHint
  sections/        Hero · About · Skills · Projects · Experience · Leadership
                   Education · Research · Achievements · Gallery · Contact
  data/            all editable content (see table above)
  hooks/           useTheme · useActiveSection · useScrolled
  lib/utils.ts     cx() · scrollToSection() · prefersReducedMotion()
  data/seo.ts      page metadata — the only place the domain is written
  index.css        design tokens, base layer, utilities, motion
```

---

## SEO and social sharing

- Title, meta description, Open Graph and Twitter card tags are in `index.html`.
- Page title, meta description and the shorter social description all live in
  `profile.seo`; `index.html` carries `%EA_*%` tokens rather than copies.
- `public/og-image.png` (1200×630) is the social preview. To regenerate it after
  changing the wording, edit `scripts/og-image.html` and screenshot it at
  1200×630 — e.g.
  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --headless --allow-file-access-from-files --window-size=1200,630 \
    --screenshot=public/og-image.png scripts/og-image.html
  ```
- `index.html` carries a `Person` JSON-LD block. Every field in it is factual;
  add your profile URLs to its `sameAs` array once you have them.
- The favicon is an inline SVG EA monogram at `public/favicon.svg`.

**`https://example.com` is a placeholder — change it in one place.** Set
`siteUrl` in `src/data/seo.ts`. A small build plugin
(`vite-plugins/site-metadata.ts`) substitutes the title, descriptions and
canonical URL into `index.html` and generates `robots.txt` and `sitemap.xml`
from it, so those three files cannot drift apart.

---

## Accessibility

- Semantic landmarks; one `<h1>`; `h2` per section, `h3` per item.
- Skip-to-content link as the first tab stop.
- Mobile menu wired with `aria-expanded` / `aria-controls`, closes on Escape,
  returns focus to its trigger, and locks background scrolling while open.
- Section jumps move keyboard focus, not just the scroll position.
- Visible focus rings everywhere, on an accent outline.
- Full `prefers-reduced-motion` support — reveals resolve to plain content and
  smooth scrolling turns off.
- Every external link carries `rel="noreferrer noopener"` and says it opens in a
  new tab.
- The gallery lightbox is a native `<dialog>`, so focus is trapped inside it,
  the page behind is inert to assistive tech, Escape closes it, and focus
  returns to the thumbnail that opened it.

---

## Deployment

The build output is a static `dist/` folder — any static host will serve it.
Config for the two easiest options is already committed.

### Vercel

`vercel.json` is present (build command, output dir, cache and security
headers).

```bash
npx vercel          # preview deploy
npx vercel --prod   # production
```

Or connect the repository at vercel.com and accept the detected settings.

### Netlify

`netlify.toml` is present.

```bash
npx netlify deploy --build          # preview
npx netlify deploy --build --prod   # production
```

### Environment variables

Only one, and it is optional: `VITE_CONTACT_ENDPOINT`. Set it in your host's
dashboard if you are using the contact form. `.env*` files are git-ignored.

### After deploying

1. Set `siteUrl` in `src/data/seo.ts` to your real domain.
2. Redeploy.
3. Check the preview card with the LinkedIn Post Inspector and `opengraph.xyz`.

---

## Before you publish

A checklist of everything that still needs your input. Nothing here is
guesswork-filled — it is all either hidden or marked until you confirm it.

### Required

- [ ] **Email** — confirm `email` in `content/settings/contact.json`. It currently
      uses your Xolace address; a personal address may suit graduate and
      scholarship applications better.
- [ ] **GitHub URL** — `/admin` → Settings, or `content/settings/contact.json`.
      Hidden until set. Use the full `https://…` URL.
- [ ] **LinkedIn URL** — same place. Hidden until set.
- [ ] **X / Twitter URL** — same place. Optional; hidden until set.
- [ ] **Domain** — set `siteUrl` in `src/data/seo.ts`. That one
      value now drives the canonical URL, Open Graph tags, `robots.txt` and
      `sitemap.xml`.

### Verify, then enable

- [ ] **B.Tech. Distinction** — `education.ts` → the `btech-cs` entry still has
      `record.honours.verified: false`, so the classification is not shown. Flip
      it once the official transcript confirms it. Both CGPAs (B.Tech. 4.89,
      HND 4.46) render as supplied.
- [ ] **Competition name** — the chatbot achievement is labelled *"Coding
      competition organised with DKT and Lydia"*, since no official competition
      name was confirmed. If there is one you can evidence, set it as the
      `organization` on the `srh-chatbot-competition` entry.
- [ ] **Competition year** — that entry's `year` is `''`, so no year renders.
      Add it if you can evidence it.

### Confirm the details

- [ ] **Xolace start date** — `experience.ts` → the `xolace-coo` entry has an
      empty `period`, so no date renders; the row shows only its badges.
- [ ] **GNUT training dates** — `experience.ts` → the `gnut-digital-skills`
      entry also has an empty `period`. It shows the SRC Week context line
      instead. Add a range once you can confirm it.
- [ ] **Timeline position of the GNUT entry** — with no date, its place in the
      chronology is a layout choice, not a claim. Reorder the array if it sat
      somewhere else in time.
- [ ] **Xolace tech stack** — `projects.ts` → `tech: []`. The row is hidden
      while empty.
- [ ] **SRH chatbot tech stack** — `projects.ts` → `tech: []`. Nothing in this
      repo records what it was built on, so nothing is shown. Fill it in from
      the competition repo.
- [ ] **SRH chatbot category** — written as *"Health Technology · Chatbot"* so
      it fits the card chip. Widen it if you want "Software Development" named
      explicitly.
- [ ] **Xolace shipped vs planned** — check that the split between `features`
      and `inProgress` matches what is actually live.
- [ ] **KTU SRC app stack** — currently `['React Native', 'Expo']`. Correct it
      to the real implementation.
- [ ] **KTU SRC store links** — add Google Play / App Store URLs if the app is
      published; buttons are hidden otherwise.
- [ ] **Next.js skill level** — `skills.ts` lists it as `working`. Change to
      `learning` if you have not shipped a Next.js project.
- [ ] **Traffic project repo / demo** — add a GitHub URL if the code is public.
- [ ] **Model accuracy** — intentionally not shown anywhere. Only add a figure
      once you can state the exact metric and test setup alongside it.

### Optional

- [ ] **Push to GitHub** — the repo is initialised with one commit on `main`;
      it needs a remote before `/admin` can save anything.
- [ ] **Set `repo:` in `public/admin/config.yml`** to your GitHub repository.
- [ ] **Profile photograph** — upload at `/admin`, or set `src` in
      `content/settings/profile-photo.json`. A monogram panel shows until then.
- [ ] **Gallery images** — add via `/admin`, or by hand into `content/gallery/`.
      The section and its nav link stay hidden in production while empty.
- [ ] **Résumé PDF** — add the file and set `features.resume.enabled`.
- [ ] **Project screenshots** — drop images in `public/projects/` and set
      `image` on a project to replace its abstract motif in the card header.
      For a strip of interface shots under the card, fill the `screenshots`
      array instead: `{ src: '/projects/x.webp', alt: 'what the screen shows' }`.
      The SRH chatbot entry has an empty `screenshots` array ready for its
      conversation screens.
- [ ] **Achievement photographs or certificates** — drop files in
      `public/achievements/` and set `image` + `imageAlt` on an achievement to
      replace its abstract crest. No certificate imagery has been generated.
- [ ] **"Open to opportunities" pill** — set `features.openToOpportunities` to
      `false` when it no longer applies.
- [ ] **Contact form** — set `VITE_CONTACT_ENDPOINT` if you want one.

---

## Avoiding repetition across sections

The same fact can legitimately appear in two places, but the same *paragraph*
should not. Where sections overlap, one owns the prose and the other links to
it:

- The **chatbot** is written up in full on its Projects card. The Achievements
  card carries only the result and what the work demonstrates, plus a link
  through to the project.
- The **traffic project** is written up on its Projects card. The Research
  section uses its own one-line framing (`researchProjectNote`) rather than
  echoing the card.
- The **Best Graduating Student** award shows as a badge on the HND in
  Education and as a card in Achievements — a short fact, worth both places.

## What is deliberately absent

- No publications list — there is nothing verified to cite, so the section does
  not exist rather than being filled with invented papers.
- No claim that the health chatbot was clinically validated, publicly deployed
  or endorsed by healthcare professionals.
- No invented competition name, date, prize, team size or certificate URL.
- No trainee numbers, training dates, certifications or measurable outcomes for
  the tutoring and training roles.
- No claim about pay or employment status: each role's badge repeats what its
  own title already says.
- No download counts, user numbers, revenue, funding or performance statistics.
- No model accuracy figure for the traffic project.
- No proficiency percentages.
- No claim that any project is deployed for public use, and no suggestion that
  the traffic system reads live GPS or sensor data.
- No stand-in image is ever presented as a real application screenshot. Cards
  without a supplied image show an abstract motif that could not be mistaken
  for a UI.
- No stock or generated face stands in for the profile photograph, and no
  placeholder certificates or event photographs are shipped in the gallery.
