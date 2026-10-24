# content/

Edited through the CMS at `/admin`, and plain JSON if you'd rather edit by hand.

| Path                             | What it is                                   |
| -------------------------------- | -------------------------------------------- |
| `settings/profile-photo.json`    | The hero portrait — one object                |
| `gallery/*.json`                 | One file per gallery image                    |

Everything else on the site still lives in `src/data/*.ts`. Only these two
things are CMS-managed, because they're the ones that involve uploading files.

Images themselves go in `public/images/` — the CMS puts them there for you.
