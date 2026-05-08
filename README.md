# Dreamers to Doers

A production-oriented Next.js rebuild of the original Dreamers to Doers landing experience.

## Stack

- Next.js App Router
- React 19
- File-based content loading for facilitator bios and impact galleries
- Public asset pipeline for all media

## Routes

- `/` landing page
- `/host` host profile
- `/facilitators` facilitator profiles
- `/impact-footprints` impact gallery

Legacy `covener` and `convener` routes redirect to `/host`.

## Development

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

## Project Structure

- `src/app` route entrypoints and global styling
- `src/components` reusable UI and interactive client components
- `src/lib/content.js` content loading and gallery discovery
- `public/images` shared root images
- `public/facilitators` facilitator portraits, bios, and impact assets
