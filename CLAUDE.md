# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `pnpm build` (Turborepo builds all packages)
- Dev: `pnpm dev` (starts dev servers)
- Lint: `pnpm lint` (lints all packages)
- Format: `pnpm format` (runs Prettier on TS/MD files)
- Types: `pnpm check-types` (TypeScript checking)
- Tauri: `cd apps/gui && pnpm tauri dev` (run desktop app)
- Rust test: `cd apps/gui/src-tauri && cargo test [test_name]` (optional test name)

## Code Style
- TypeScript: Strict typing, React functional components
- Rust: Library name `disco_lib`, error handling with `expect()`
- Project: Monorepo with Turborepo/pnpm workspaces
- Structure: `apps/` for applications, `packages/` for shared libraries
- Stack: React 18.3, TypeScript 5.6+, Vite 6.0+, Rust, Tauri 2.0