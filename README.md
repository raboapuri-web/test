# Thinking Night Remotion Sample

「考える夜」向けのRemotionモーショングラフィックス検証用サンプルです。

## Preview

```bash
npm install
npm run studio
```

Remotion Studioで既存の `ThinkingNightSample` または新しい `ThinkingNightPilot` を開いてください。

## Render

```bash
npm run render
npm run render:pilot
```

`out/thinking-night-sample.mp4` は既存の1920x1080 / 30fps / 約20秒のH.264 MP4です。`out/thinking-night-pilot.mp4` は「選んでいるのは誰なのか。」を題材にした16秒の無音プロトタイプで、オリジナルのコード描画だけを使っています。台本、ナレーション、素材は未投入です。

## Checks

```bash
npm run lint
npm run build
npm run render:pilot
```

`lint` はTypeScriptの型検査とESLint、`build` はRemotionのbundle生成を行います。生成物は `out/` に置き、Gitには含めません。

## Codex setup

ルートの `AGENTS.md` がCodex向けの作業方針です。`.agents/skills/remotion-*/` に制作・描画・字幕・Studio・レンダリング・ドキュメント・編集操作の[Remotion公式Agent Skills](https://github.com/remotion-dev/skills)をコミット `bd566b65d521b40fe92e1f26766e82de9e291693` からプロジェクト用に配置し、`.agents/skills/thinking-night-video/` にシリーズ専用の映像ルールを置いています。リポジトリをCodexで開けば両方を参照できます。

## GitHub Actions

動画コードに関係するPull Requestと `main` への変更時に `.github/workflows/render.yml` がlint・bundle・両Compositionのレンダリングを実行します。MP4を `thinking-night-sample` と `thinking-night-pilot` というArtifactとして14日間保存します。

## Current visual direction

- dark editorial / educational motion graphics
- ivory typography + muted gold accent
- Japanese Mincho-style typography
- silhouette figures
- restrained camera movement
- infographic-driven composition
- subtle grain and vignette

次段階では実際の台本とナレーションの尺を確定し、必要な人物・美術・背景素材を用意して、パララックスやマスク、音声同期を加えます。
