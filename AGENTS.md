<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions

- Package manager: **pnpm** (never npm/yarn/bun).
- Animation: before writing or changing any GSAP code, read `docs/animation.md` — it is the binding motion spec for this site.
- Icon libraries: `@hugeicons/*` is primary, `lucide-react` is secondary (only where Hugeicons has no free equivalent).
