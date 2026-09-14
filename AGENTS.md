# Codex project instructions

This repository is a small Remotion experiment for 「考える夜」. Preserve the existing `ThinkingNightSample` composition and its render command when extending it.

Use the official Remotion Agent Skills in `.agents/skills/remotion-{create,markup,captions,render,studio,docs,interactivity}/` as relevant. They are vendored from `remotion-dev/skills` commit `bd566b65d521b40fe92e1f26766e82de9e291693`. Use `.agents/skills/thinking-night-video/SKILL.md` when creating or editing 「考える夜」 scenes; user-provided scripts and art direction take precedence over its defaults.

Keep compositions registered in `src/Root.tsx` and frame-driven animation in Remotion. Keep generated bundles and videos under `out/`. Run `npm run lint`, `npm run build`, and the relevant render command after changing video code. Check representative frames and the complete rendered video before presenting a finished video.
