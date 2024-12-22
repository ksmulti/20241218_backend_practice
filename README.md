# 20241218_backend_test

## 環境構築
### 前提条件
- nodeヴァージョン：v22.12.0
- docker、docker composeがインストール済み

## モジュールのインストール
```
npm install --include=dev
```

## DBの設置
```
docker compose up -d
```

## 開発環境の実行
```
npm run dev
```

## 今後の課題
- routingの改善（手動追加しないように）
- unit testの追加（DBをmock）
- integration testの追加（DBを含める）
- 画像の置く場所（s3など）、画像のパスを追加
- 食事履歴の追加
- コラムページの追加

## APIの使用例
### 運動記録の作成（POST /api/exercise-records）
```
curl --location 'http://127.0.0.1:3000/api/exercise-records' \
--header 'Content-Type: application/json' \
--data '{
    "exerciseType": "walking",
    "date": "2024-12-22",
    "duration": 10
}'
```

### 運動記録の一覧取得（GET /api/exercise-records）
```
curl --location 'http://127.0.0.1:3000/api/exercise-records?type=walking'
```

### 運動目標の作成（POST /api/exercise-goals）
```
curl --location 'http://127.0.0.1:3000/api/exercise-goals' \
--header 'Content-Type: application/json' \
--data '{
    "exerciseType": "walking",
    "date": "2024-12-22",
    "targetMinutes": 10
}'
```

### 運動目標の達成率一覧取得（GET /api/exercise-completion）
dateを入力すれば該当の日のみ取得
```
curl --location 'http://127.0.0.1:3000/api/exercise-completion?date=2024-12-22'
```

### ボディーレコードの作成（POST /api/body-records）
```
curl --location 'http://127.0.0.1:3000/api/body-records' \
--header 'Content-Type: application/json' \
--data '{
    "date": "2024-12-22",
    "weight": 60.7,
    "bodyFatPercentage": 32.2
}'
```

### ボディーレコードの一覧取得（GET /api/body-records）
```
curl --location 'http://127.0.0.1:3000/api/body-records'
```

### 日記の作成（POST /api/diaries）
```
curl --location 'http://127.0.0.1:3000/api/diaries' \
--header 'Content-Type: application/json' \
--data '{
    "content": "test content"
}'
```

### 特定の日記の取得（GET /api/diaries/:id）
```
curl --location 'http://127.0.0.1:3000/api/diaries/1'
```

### 日記一覧の取得（GET /api/diaries）
```
curl --location 'http://127.0.0.1:3000/api/diaries'
```

### 日記の更新（PUT /api/diaries/:id）
```
curl --location --request PUT 'http://127.0.0.1:3000/api/diaries/1' \
--header 'Content-Type: application/json' \
--data '{
    "content": "test content11"
}'
```

### 日記の削除（DELETE /api/diaries/:id）
```
curl --location --request DELETE 'http://127.0.0.1:3000/api/diaries/1'
```

