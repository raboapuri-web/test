# Remotion Animation Library

Remotion用の再利用可能な映像テンプレート／演出ライブラリを作るための検証リポジトリです。

現在は既存サンプル演出を削除し、空のSandbox Compositionだけを残しています。

## Preview

```bash
npm install
npm run studio
```

Remotion Studioで `Sandbox` を開いてください。

## Render

```bash
npm run render
```

`out/sandbox.mp4` に1920x1080 / 30fpsのH.264 MP4を生成します。

## GitHub Actions

`main` への変更時に `.github/workflows/render.yml` が自動実行され、レンダリング済みMP4を `remotion-sandbox` Artifactとして14日間保存します。

今後は、再利用できるテンプレートをカテゴリ別に追加し、Registry経由で呼び出せる構成へ拡張します。
