# Thinking Night Remotion Sample

「考える夜」向けのRemotionモーショングラフィックス検証用サンプルです。

## Preview

```bash
npm install
npm run studio
```

Remotion Studioで `ThinkingNightSample` を開いてください。

## Render

```bash
npm run render
```

`out/thinking-night-sample.mp4` に1920x1080 / 30fps / 約20秒のH.264 MP4を生成します。

## GitHub Actions

`main` への変更時に `.github/workflows/render.yml` が自動実行され、レンダリング済みMP4を `thinking-night-sample` というArtifactとして14日間保存します。

## Current visual direction

- dark editorial / educational motion graphics
- ivory typography + muted gold accent
- Japanese Mincho-style typography
- silhouette figures
- restrained camera movement
- infographic-driven composition
- subtle grain and vignette

次段階ではAI生成の人物・美術・背景素材を入れ、パララックス、マスク、被写界深度、ナレーション同期を追加する想定です。
