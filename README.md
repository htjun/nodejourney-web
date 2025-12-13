# Nodejourney Website

Marketing website for [Nodejourney](https://github.com/htjun/nodejourney), a desktop visual editor for AI workflows.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Release Integration

Download links and version numbers are fetched from the [nodejourney-releases](https://github.com/htjun/nodejourney-releases) repo via GitHub API. Data is cached for 1 hour (ISR).

See `lib/releases.ts` for implementation.

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- TypeScript
