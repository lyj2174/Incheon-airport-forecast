# 🛫 Incheon Airport Congestion Prediction API

This Flask API provides predicted passenger congestion levels for Incheon Airport based on date and time.
It supports integration with web frontends for real-time travel planning assistance.

## ✅ How to Run

1. Clone or unzip this project into a folder named `airport_project`.
2. Navigate into the folder via terminal:

```bash
cd airport_project
```

3. Install required libraries:

```bash
pip install -r requirements.txt
```

4. Make sure `.env` file is present in the same folder with the following contents (adjust if needed):

```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=airport
```

5. Start the Flask server:

```bash
python app_server.py
```

The server will run at: `http://127.0.0.1:5000`

---

## 🧪 API: `/predict`

- **Method:** POST  
- **URL:** `http://127.0.0.1:5000/predict`  
- **Content-Type:** `application/json`

### 🔸 Request Body

```json
{
  "date": "2025-04-15",
  "hour": 9
}
```

### 🔸 Response Example

```json
{
  "date": "2025-04-15",
  "hour": 9,
  "predicted_passengers": 6424,
  "congestion_level": "혼잡",
  "recommended_arrival_time": "7:00"
}
```

### 🚦 Congestion Criteria

- 1000 or more → 혼잡
- 500 to 999 → 보통
- below 500 → 여유
