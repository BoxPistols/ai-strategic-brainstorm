# AI Strategic Brainstorm

> Expert-grade strategic ideation tool powered by multi-provider AI APIs

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![TypeScript Ready](https://img.shields.io/badge/Vite-5+-646CFF.svg)

## Overview

BCG/McKinsey/Accenture級の戦略コンサルティング品質で、プロジェクトの課題分析・アイデア生成・深掘りリサーチを行うAIブレインストーミングツールです。

### Key Features

**🤖 Multi-Provider AI**
- **Anthropic** (Built-in / APIキー不要) — Haiku 4.5, Sonnet 4.5, Sonnet 4, Opus 4
- **OpenAI** — GPT-4.1 Nano/Mini, o4-mini, GPT-5 Nano/Mini
- **Google AI** — Gemini 2.5 Flash/Pro

**📊 Expert-Grade Analysis**
- 4段階の分析深度 (Quick → BCG Grade)
- ツリー構造の課題入力（サブ課題・背景・定量データ対応）
- セッションタイプ別のサジェスト質問で深掘り
- Web検索連携による最新業界データ調査

**📝 Rich Output**
- Markdown → リッチHTML変換（見出し・テーブル・リスト・リンク）
- 参照元URLのアンカーリンク（別タブ対応）
- レポートプレビュー → Markdown / テキスト / PDF エクスポート

**💾 Session History (localStorage)**
- 全Q&A / 回答のみ / OFF の保存モード選択
- 検索・ソート・複数選択対応の履歴一覧
- 詳細ビューでのドリルダウン表示
- JSON import/export（全件・選択・個別）

**🔄 Iterative Refinement**
- レビュー入力によるブラッシュアップ
- 会話履歴を保持した連続深掘り分析
- AI自動プロジェクト命名（クリシェ回避）

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/ai-strategic-brainstorm.git
cd ai-strategic-brainstorm
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173

### Build

```bash
npm run build
npm run preview
```

## Configuration

### Default (No API Key Required)

Anthropic Haiku 4.5がデフォルトで使用可能です（Claude.aiアーティファクト環境内）。

### External API Keys

スタンドアロン環境で使用する場合、設定パネルからAPIキーを入力：

| Provider | Key Format | 取得先 |
|----------|-----------|--------|
| Anthropic | `sk-ant-...` | https://console.anthropic.com |
| OpenAI | `sk-...` | https://platform.openai.com |
| Google AI | `AIza...` | https://aistudio.google.com |

> ⚠️ APIキーはlocalStorageに保存されません。セッションごとに入力が必要です。

## Project Structure

```
ai-strategic-brainstorm/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── LICENSE
└── README.md
```

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Styling
- **Lucide React** — Icons
- **Anthropic / OpenAI / Google AI APIs** — LLM providers

## Data Privacy

- すべてのデータはブラウザのlocalStorageにのみ保存
- APIキーはメモリ内のみ（永続化なし）
- サーバーサイドのデータ収集なし
- 企業名の入力は不要（プロジェクト名で管理）

## License

MIT License — see [LICENSE](./LICENSE)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
