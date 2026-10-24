# Images

Drop your files here and reference them from the data files in `src/data/`.
Paths are relative to this folder's parent — a file at
`public/images/profile/me.jpg` is referenced as `/images/profile/me.jpg`.

| Folder          | What goes in it                                              | Referenced from                     |
| --------------- | ------------------------------------------------------------ | ----------------------------------- |
| `profile/`      | Your profile photograph (one file)                            | `src/data/profile.ts` → `photo`     |
| `projects/`     | App/website screenshots and project UI shots                  | `src/data/projects.ts`, `gallery.ts` |
| `certificates/` | Certificates, award letters, academic recognition             | `src/data/gallery.ts`               |
| `gallery/`      | Event, competition, training and presentation photographs     | `src/data/gallery.ts`               |

## Before you add an image

- **Format** — use `.webp` where you can (much smaller than JPEG at the same
  quality). `.jpg` and `.png` work fine too.
- **Size** — nothing needs to be wider than about 1600px. The gallery renders
  thumbnails at roughly 400px and the lightbox at up to 1600px.
- **Profile photo** — a square or portrait crop works best. Anything from
  600×750 upwards is plenty.
- **Filenames** — lowercase, hyphenated, no spaces: `src-week-training.webp`.

Every image needs alt text in its data entry. Describe what is in the picture,
not "photo of me" — screen-reader users get that text instead of the image.
