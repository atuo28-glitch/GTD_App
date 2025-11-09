---
title: "API仕様"
updated: "2024-01-01T00:00:00Z"
owner: "TBD"
---

# API仕様

## 基本情報

- **ベースURL**: `https://api.example.com/v1`
- **認証方式**: Bearer Token (JWT)
- **データ形式**: JSON
- **文字コード**: UTF-8

## 代表エンドポイント一覧

### 認証

| Method | Path | 説明 | 認証 | リクエスト | レスポンス |
|--------|------|------|------|-----------|-----------|
| POST | `/auth/login` | ログイン | 不要 | `{ email, password, remember_me }` | `{ access_token, refresh_token, user_id, expires_in }` |
| POST | `/auth/logout` | ログアウト | 必要 | `{ refresh_token }` | `{ message }` |
| POST | `/auth/refresh` | トークンリフレッシュ | 不要 | `{ refresh_token }` | `{ access_token, expires_in }` |
| POST | `/auth/password/reset` | パスワードリセット要求 | 不要 | `{ email }` | `{ message }` |
| POST | `/auth/password/reset/confirm` | パスワードリセット確定 | 不要 | `{ token, new_password }` | `{ message }` |

### ユーザー

| Method | Path | 説明 | 認証 | リクエスト | レスポンス |
|--------|------|------|------|-----------|-----------|
| GET | `/users/me` | 自分のプロフィール取得 | 必要 | - | `{ user_id, display_name, email, avatar_url, bio, phone_number, created_at, updated_at }` |
| PUT | `/users/me` | プロフィール更新 | 必要 | `{ display_name?, email?, bio?, phone_number? }` | `{ user_id, display_name, email, avatar_url, bio, phone_number, updated_at }` |
| POST | `/users/me/avatar` | プロフィール画像アップロード | 必要 | `multipart/form-data` | `{ avatar_url }` |

### 通知

| Method | Path | 説明 | 認証 | リクエスト | レスポンス |
|--------|------|------|------|-----------|-----------|
| GET | `/notifications` | 通知一覧取得 | 必要 | `?page=1&limit=20&unread_only=false` | `{ notifications: [...], total, page, limit }` |
| GET | `/notifications/{id}` | 通知詳細取得 | 必要 | - | `{ id, type, title, body, read, created_at, action_url }` |
| PUT | `/notifications/{id}/read` | 通知を既読にする | 必要 | - | `{ id, read: true }` |
| DELETE | `/notifications/{id}` | 通知削除 | 必要 | - | `{ message }` |
| GET | `/notifications/settings` | 通知設定取得 | 必要 | - | `{ settings: [...] }` |
| PUT | `/notifications/settings` | 通知設定更新 | 必要 | `{ notification_type, enabled }` | `{ settings: [...] }` |

### データエクスポート

| Method | Path | 説明 | 認証 | リクエスト | レスポンス |
|--------|------|------|------|-----------|-----------|
| POST | `/export` | エクスポートジョブ作成 | 必要 | `{ export_type: { profile, activity, settings, data } }` | `{ job_id, status, created_at, estimated_completion }` |
| GET | `/export/{job_id}` | エクスポートジョブ状態取得 | 必要 | - | `{ job_id, status, created_at, completed_at?, download_url? }` |
| GET | `/export/history` | エクスポート履歴取得 | 必要 | `?page=1&limit=20` | `{ exports: [...], total, page, limit }` |

## エラーモデル

### エラーレスポンス形式

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": {
      "field": "エラー詳細"
    }
  }
}
```

### エラーコード一覧

| コード | HTTPステータス | 説明 |
|--------|---------------|------|
| `INVALID_REQUEST` | 400 | リクエストが不正 |
| `UNAUTHORIZED` | 401 | 認証が必要 |
| `FORBIDDEN` | 403 | 権限が不足 |
| `NOT_FOUND` | 404 | リソースが見つからない |
| `CONFLICT` | 409 | リソースの競合 |
| `RATE_LIMIT_EXCEEDED` | 429 | レート制限超過 |
| `INTERNAL_ERROR` | 500 | サーバー内部エラー |
| `SERVICE_UNAVAILABLE` | 503 | サービス利用不可 |

## バージョニング方針

- **URLベース**: `/v1`, `/v2` のようにURLにバージョンを含める
- **後方互換性**: メジャーバージョン変更時は移行期間を設ける（例: 6ヶ月）
- **非推奨通知**: 非推奨APIには `Deprecation` ヘッダーを付与

## レート制限

- **認証済みユーザー**: 1分あたり100リクエスト
- **未認証ユーザー**: 1分あたり20リクエスト
- **超過時**: `429 Too Many Requests` を返却

## 関連ドキュメント

- [アーキテクチャ概要](./architecture_overview.md)
- [エラーハンドリング](./error_handling.md)
- [FR_001: ユーザー認証](../1_FunctionalRequirements/FR_001_user_authentication.md)

## 追記履歴

| 日時 | 変更者 | 要旨 |
|------|--------|------|
| 2024-01-01 | TBD | 初版作成 |

## TODO

- [ ] OpenAPI/Swagger仕様書を生成
- [ ] APIエンドポイントの詳細仕様を記載
- [ ] リクエスト/レスポンスのサンプルを追加
- [ ] 認証・認可の詳細を記載
- [ ] APIテスト計画を策定

