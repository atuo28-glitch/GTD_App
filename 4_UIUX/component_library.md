---
title: "コンポーネントライブラリ"
updated: "2024-01-01T00:00:00Z"
owner: "TBD"
---

# コンポーネントライブラリ

## UIコンポーネント命名規則

### 命名規則

- **パスカルケース**: コンポーネント名はパスカルケース（例: `Button`, `InputField`）
- **接頭辞**: 必要に応じて接頭辞を使用（例: `AppButton`, `AppInput`）
- **ディレクトリ構造**: 1コンポーネント = 1ディレクトリ（例: `components/Button/Button.tsx`）

### コンポーネント分類

- **Atoms**: 最小単位のコンポーネント（Button, Input, Label等）
- **Molecules**: Atomsの組み合わせ（FormField, Card等）
- **Organisms**: Moleculesの組み合わせ（Header, Footer, Sidebar等）
- **Templates**: Organismsの組み合わせ（PageLayout等）

## プロパティ準拠

### 共通プロパティ

- **className**: スタイルのカスタマイズ
- **id**: 要素の識別
- **aria-***: アクセシビリティ属性
- **data-testid**: テスト用の識別子

### コンポーネント例

#### Button

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

#### InputField

```typescript
interface InputFieldProps {
  label: string;
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}
```

## 再利用方針

### 原則

- **DRY（Don't Repeat Yourself）**: 同じコードを繰り返さない
- **単一責任**: 1コンポーネントは1つの責務を持つ
- **プロップスドリル回避**: Context APIや状態管理ライブラリを使用

### コンポーネント共有

- **共通コンポーネント**: `components/common/` に配置
- **機能固有コンポーネント**: `components/features/` に配置
- **レイアウトコンポーネント**: `components/layouts/` に配置

## スタイリング

### CSS-in-JS / CSS Modules

- **方式**: TBD（例: styled-components, CSS Modules, Tailwind CSS）
- **テーマ**: 一貫したデザインシステムに基づく
- **レスポンシブ**: モバイルファーストで設計

## 関連ドキュメント

- [ワイヤーフレーム](./wireframes.md)
- [画面遷移図](./screen_flow.md)
- [ユーザビリティ](../2_NonFunctionalRequirements/usability.md)

## 追記履歴

| 日時 | 変更者 | 要旨 |
|------|--------|------|
| 2024-01-01 | TBD | 初版作成 |

## TODO

- [ ] コンポーネントライブラリを構築（Storybook等）
- [ ] デザインシステムを定義
- [ ] コンポーネントのドキュメントを作成
- [ ] スタイリング方式を確定
- [ ] コンポーネントのテスト戦略を策定

