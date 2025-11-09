---
title: "FR_003: 通知システム"
updated: "2024-01-01T00:00:00Z"
owner: "TBD"
---

# FR_003: 通知システム

## 目的

ユーザーに重要な情報やイベントを適切なタイミングで通知する機能を提供する。

## 利用者

- エンドユーザー（通知受信者）
- システム（自動通知送信）

## 前提・制約

- 通知はリアルタイムで配信される
- ユーザーは通知の種類ごとにオン/オフを設定可能
- 通知は最大100件まで保持（古いものから自動削除）

## ユースケース

### メインフロー: 通知受信

1. システムが通知イベントを検知
2. 通知設定を確認
3. 通知を生成して保存
4. リアルタイムでユーザーに配信
5. ユーザーが通知を確認

### 代替フロー: 通知設定変更

1. ユーザーが通知設定画面にアクセス
2. 通知の種類ごとの設定を変更
3. 「保存」ボタンをクリック
4. 設定を保存

### 例外フロー: 通知の一括削除

1. ユーザーが「すべて削除」ボタンをクリック
2. 確認ダイアログを表示
3. ユーザーが確認
4. すべての通知を削除

## 入力/出力

### 入力項目

#### 通知送信

- `user_id` (string, required): 通知先ユーザーID
- `type` (string, required): 通知タイプ（例: "message", "system", "reminder"）
- `title` (string, required): 通知タイトル
- `body` (string, required): 通知本文
- `action_url` (string, optional): アクションURL

#### 通知設定

- `notification_type` (string, required): 通知タイプ
- `enabled` (boolean, required): 有効/無効

### 出力項目

#### 通知一覧取得時

- `notifications` (array): 通知リスト
  - `id` (string): 通知ID
  - `type` (string): 通知タイプ
  - `title` (string): 通知タイトル
  - `body` (string): 通知本文
  - `read` (boolean): 既読/未読
  - `created_at` (datetime): 作成日時
  - `action_url` (string): アクションURL

## 受入条件（Acceptance Criteria）

- [ ] 通知がリアルタイムで配信される
- [ ] 通知の既読/未読状態を管理できる
- [ ] 通知の種類ごとにオン/オフを設定できる
- [ ] 通知一覧を閲覧できる
- [ ] 通知を個別に削除できる
- [ ] 通知を一括削除できる
- [ ] 通知が100件を超えた場合、古いものから自動削除される

## 関連ドキュメント

- [API仕様](../3_SystemDesign/api_specifications.md)
- [データモデル・ERD](../3_SystemDesign/data_model_ERD.md)
- [エラーハンドリング](../3_SystemDesign/error_handling.md)
- [外部サービス連携](../3_SystemDesign/external_services.md)

## 追記履歴

| 日時 | 変更者 | 要旨 |
|------|--------|------|
| 2024-01-01 | TBD | 初版作成 |

## TODO

- [ ] プッシュ通知（ブラウザ・モバイル）の要件を定義
- [ ] メール通知の要件を定義
- [ ] 通知の優先度設定を検討
- [ ] 通知のグループ化・カテゴリ分けを検討
- [ ] 通知のテンプレート機能を検討

