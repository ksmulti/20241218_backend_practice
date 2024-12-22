# 20241218_backend_test

## DBの設置
```
docker compose up -d
```

## APIの使用例
### 運動記録の作成（POST /exercise-records）
```
curl --location 'http://127.0.0.1:3000/api/exercise-records' \
--header 'Content-Type: application/json' \
--data '{
    "exerciseType": "walking",
    "date": "2024-12-22",
    "duration": 10
}'
```

### 運動記録の一覧取得（GET /exercise-records）
```
curl --location 'http://127.0.0.1:3000/api/exercise-records?type=walking'
```
