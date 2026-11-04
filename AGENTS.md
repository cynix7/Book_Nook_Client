<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

- Next.js 16 (App Router) + React 19 + Tailwind CSS v4, single app (not a monorepo). Routes live in `src/app/`; `src/app/layout.tsx` is the root layout.
- Path alias `@/*` → `./src/*` (tsconfig). npm is the package manager (`package-lock.json`).
- No test framework, CI workflows, or `typecheck` script exist — don't guess at test commands.

## Commands

- `npm run dev` — dev server. Turbopack is the default bundler in Next 16; no flag needed.
- `npm run build` — production build (includes type checking).
- `npm run lint` — ESLint flat config in `eslint.config.mjs`.
- Typecheck a focused change with `npx tsc --noEmit`. Full verify: `npm run lint && npx tsc --noEmit && npm run build`.

## UI stack (shadcn + Tailwind v4)

- shadcn/ui components in `src/components/ui/` are generated — add/regenerate with `npx shadcn add <component>` (config: `components.json`, style `base-nova`). Don't hand-edit generated primitives; changes are overwritten on the next `add`.
- Primitives are `@base-ui/react` (Base UI), **not** Radix. Icons: `lucide-react`.
- `cn` comes from the `cn` npm package, re-exported from `src/lib/utils.ts`.
- Tailwind v4 is CSS-first: there is no `tailwind.config`. Theme tokens and dark mode are defined in `src/app/globals.css` (`@theme inline`, CSS custom properties, `.dark` class + `@custom-variant dark`). The `@tailwindcss/turbopack` CSS loader is wired in `next.config.ts`.

## Next.js 16 specifics

- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — keep components pure; no side effects during render.
- `params` / `searchParams` are async (await them). Route prop types such as `LayoutProps<"/">` are generated globals — regenerate with `npx next typegen` if they go stale.
- App Router docs for this exact Next version are bundled at `node_modules/next/dist/docs/01-app/` (see managed block above).
