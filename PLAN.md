# Miller Columns Style Desktop Application Plan

## Overview

Inoreaderライクなデスクトップアプリケーション。Miller Columnsスタイルで、ファイルブラウザ、フィードリーダー、Webブラウザの機能を統合。

## UI Layout Structure

```
[Workspace Sidebar] [Parent Column] [Child Column] [Browser Panel]
     (細長い)         (左半分)       (左半分)      (右半分)
```

### Layout Details

- **Workspace Sidebar**: 細長いサイドバー、ワークスペース一覧
- **Parent Column**: 選択されたワークスペースのアイテム一覧
- **Child Column**: 選択されたアイテムの詳細/サブアイテム
- **Browser Panel**: 画面右半分、選択されたコンテンツを表示

## Core Features

### 1. Workspace System

- **複数ワークスペース**: 作成・削除・管理可能
- **キーボードナビゲーション**: `gj/gk` で上下移動
- 各ワークスペースに複数のアイテムタイプを混在可能

### 2. Multi-Purpose Items

#### File Browser

- **サポート形式**: txt, md, images, PDF等（Webブラウザで閲覧可能なもの）
- ローカルファイル/フォルダブラウジング
- ファイルプレビュー機能

#### Feed Reader

- **RSS/Atom フィード**対応
- 記事一覧表示
- 記事詳細表示（記事閲覧特化）

#### Web Browser

- Webページブックマーク
- **記事閲覧特化**の簡易ブラウザ
- 右半分パネルでコンテンツ表示

### 3. Data Storage

- **ローカルストレージ**: 初期実装
- **将来対応**: クラウド同期機能

## Technical Architecture

### Frontend (React + TypeScript)

- **Layout Components**:
  - WorkspaceSidebar
  - ParentColumn
  - ChildColumn
  - BrowserPanel
- **Navigation**: キーボードショートカット対応
- **Content Viewers**: ファイル、RSS、Web用

### Backend (Rust + Tauri)

- ファイルシステムアクセス
- RSS/Atom パーサー
- Web コンテンツ取得（記事特化）
- ローカルデータ永続化

### Data Structure

```typescript
interface Workspace {
  id: string;
  name: string;
  items: WorkspaceItem[];
}

interface WorkspaceItem {
  type: "file" | "feed" | "web";
  path: string;
  title: string;
  metadata?: {
    lastRead?: Date;
    unreadCount?: number;
  };
}
```

## Keyboard Navigation

### Global Shortcuts (IME対応)

- `gj`: 上のワークスペースに移動
- `gk`: 下のワークスペースに移動
- `gh`: 左の領域に移動（ワークスペース→カラム→ブラウザ）
- `gl`: 右の領域に移動（ワークスペース→カラム→ブラウザ）
- `j/k`: カラム内でアイテム選択（上下）
- `Enter`: アイテム選択/展開

### Shortcut Key Features

- **IME対応**: 日本語入力モード中でも動作
- **グローバル**: アプリケーション全体で有効
- **設定保存**: ユーザー設定として永続化

## Implementation Phases

### Phase 1: Core UI Framework

- [ ] 4分割レイアウト実装
- [ ] ワークスペースサイドバー
- [ ] グローバルキーボードナビゲーション基盤（IME対応）
- [ ] ショートカットキー設定システム

### Phase 2: File Browser

- [ ] ローカルファイル表示
- [ ] txt/md/画像/PDF プレビュー
- [ ] ファイル操作基本機能

### Phase 3: Feed Reader

- [ ] RSS/Atom パーサー (Rust側)
- [ ] フィード管理UI
- [ ] 記事表示・既読管理

### Phase 4: Web Browser Integration

- [ ] 記事特化Webビューア
- [ ] ブックマーク機能
- [ ] コンテンツ取得・表示

### Phase 5: Settings & Polish

- [ ] ショートカットキー設定UI
- [ ] ローカルデータ保存
- [ ] ユーザー設定機能
- [ ] パフォーマンス最適化

## Technology Stack

- **Frontend**: React 18.3 + TypeScript 5.6+
- **Backend**: Rust + Tauri 2.0
- **Build**: Vite 6.0+ + Turborepo
- **Styling**: CSS Modules
- **Navigation**: Custom keyboard handler
