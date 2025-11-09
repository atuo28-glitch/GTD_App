---
title: "データモデル・ERD"
updated: "2024-01-01T00:00:00Z"
owner: "TBD"
---

# データモデル・ERD

## 主要エンティティとリレーション

### ユーザー（users）

- **説明**: システムに登録されているユーザー情報
- **主キー**: `user_id` (UUID)
- **属性**:
  - `user_id`: UUID, PRIMARY KEY
  - `email`: VARCHAR(255), UNIQUE, NOT NULL
  - `password_hash`: VARCHAR(255), NOT NULL
  - `display_name`: VARCHAR(100)
  - `avatar_url`: VARCHAR(500)
  - `bio`: TEXT
  - `phone_number`: VARCHAR(20)
  - `email_verified`: BOOLEAN, DEFAULT FALSE
  - `account_locked`: BOOLEAN, DEFAULT FALSE
  - `locked_until`: TIMESTAMP
  - `failed_login_attempts`: INTEGER, DEFAULT 0
  - `created_at`: TIMESTAMP, NOT NULL
  - `updated_at`: TIMESTAMP, NOT NULL

### セッション（sessions）

- **説明**: ユーザーのログインセッション
- **主キー**: `session_id` (UUID)
- **外部キー**: `user_id` → `users.user_id`
- **属性**:
  - `session_id`: UUID, PRIMARY KEY
  - `user_id`: UUID, FOREIGN KEY, NOT NULL
  - `access_token`: TEXT, NOT NULL
  - `refresh_token`: TEXT, NOT NULL
  - `expires_at`: TIMESTAMP, NOT NULL
  - `created_at`: TIMESTAMP, NOT NULL

### 通知（notifications）

- **説明**: ユーザーへの通知
- **主キー**: `notification_id` (UUID)
- **外部キー**: `user_id` → `users.user_id`
- **属性**:
  - `notification_id`: UUID, PRIMARY KEY
  - `user_id`: UUID, FOREIGN KEY, NOT NULL
  - `type`: VARCHAR(50), NOT NULL (例: "message", "system", "reminder")
  - `title`: VARCHAR(200), NOT NULL
  - `body`: TEXT, NOT NULL
  - `read`: BOOLEAN, DEFAULT FALSE
  - `action_url`: VARCHAR(500)
  - `created_at`: TIMESTAMP, NOT NULL

### 通知設定（notification_settings）

- **説明**: ユーザーの通知設定
- **主キー**: `setting_id` (UUID)
- **外部キー**: `user_id` → `users.user_id`
- **属性**:
  - `setting_id`: UUID, PRIMARY KEY
  - `user_id`: UUID, FOREIGN KEY, NOT NULL
  - `notification_type`: VARCHAR(50), NOT NULL
  - `enabled`: BOOLEAN, DEFAULT TRUE
  - `created_at`: TIMESTAMP, NOT NULL
  - `updated_at`: TIMESTAMP, NOT NULL
  - UNIQUE(`user_id`, `notification_type`)

### エクスポートジョブ（export_jobs）

- **説明**: データエクスポートジョブ
- **主キー**: `job_id` (UUID)
- **外部キー**: `user_id` → `users.user_id`
- **属性**:
  - `job_id`: UUID, PRIMARY KEY
  - `user_id`: UUID, FOREIGN KEY, NOT NULL
  - `status`: VARCHAR(20), NOT NULL (例: "pending", "processing", "completed", "failed")
  - `export_type`: JSONB, NOT NULL
  - `file_url`: VARCHAR(500)
  - `error_message`: TEXT
  - `created_at`: TIMESTAMP, NOT NULL
  - `completed_at`: TIMESTAMP

## リレーション

- **users** 1:N **sessions** (1ユーザーは複数のセッションを持つ)
- **users** 1:N **notifications** (1ユーザーは複数の通知を受信)
- **users** 1:N **notification_settings** (1ユーザーは複数の通知設定を持つ)
- **users** 1:N **export_jobs** (1ユーザーは複数のエクスポートジョブを作成)

## 制約・正規化方針

### 正規化

- **第3正規形（3NF）**: すべてのテーブルは第3正規形に準拠
- **非正規化**: パフォーマンス要件に応じて、読み取り専用テーブルで非正規化を検討

### 制約

- **NOT NULL**: 必須項目にはNOT NULL制約を設定
- **UNIQUE**: 一意性が必要な項目にはUNIQUE制約を設定
- **CHECK**: 値の範囲・形式を制限する場合はCHECK制約を設定
- **FOREIGN KEY**: 参照整合性を保つため、外部キー制約を設定

### インデックス

- **主キー**: すべてのテーブルに主キーインデックス
- **外部キー**: 外部キーにインデックスを設定
- **検索頻度の高いカラム**: `email`, `user_id`, `created_at` 等にインデックスを設定

## データ保持ポリシー

- **セッション**: 30日間保持、期限切れセッションは自動削除
- **通知**: 100件まで保持、古いものから自動削除
- **エクスポートジョブ**: 完了後7日間保持、その後自動削除

## 関連ドキュメント

- [アーキテクチャ概要](./architecture_overview.md)
- [API仕様](./api_specifications.md)
- [FR_001: ユーザー認証](../1_FunctionalRequirements/FR_001_user_authentication.md)
- [FR_003: 通知システム](../1_FunctionalRequirements/FR_003_notification_system.md)

## 追記履歴

| 日時 | 変更者 | 要旨 |
|------|--------|------|
| 2024-01-01 | TBD | 初版作成 |

## TODO

- [ ] ER図を可視化（PlantUML / Mermaid等）
- [ ] データベースマイグレーション戦略を定義
- [ ] バックアップ・復旧戦略を定義
- [ ] パフォーマンス最適化のためのインデックス戦略を詳細化
- [ ] データアーカイブ戦略を定義

