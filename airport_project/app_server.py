import os
import json
import pandas as pd
from flask import Flask, request, Response, send_file
from flask_cors import CORS

# 📂 React build 경로 설정
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
REACT_BUILD_DIR = os.path.abspath(os.path.join(BASE_DIR, '../incheon-preview/build'))

app = Flask(__name__, static_folder=REACT_BUILD_DIR, static_url_path='')
CORS(app)

# ✅ React 정적 파일 라우팅
@app.route('/')
def serve_index():
    index_path = os.path.join(app.static_folder, 'index.html')
    print("👉 Index.html 접근 경로:", index_path)
    if not os.path.isfile(index_path):
        return "index.html not found", 404
    return send_file(index_path)
    
@app.route("/ping")
def ping():
    return "pong", 200

# ✅ 예측 API
pred_df = pd.read_csv('Predicted_Hourly_RF_with_Tuning_GoldenHoliday_2025_2026.csv')
pred_df.columns = pred_df.columns.str.strip()
pred_df['MonthDay'] = pred_df['MonthDay'].str.strip()
pred_df['TimeSlot'] = pred_df['TimeSlot'].str.strip()

def estimate_time(passenger_count):
    min_time, max_time = 25, 120
    min_passenger, max_passenger = 100, 6000
    p = max(min(passenger_count, max_passenger), min_passenger)
    ratio = (p - min_passenger) / (max_passenger - min_passenger)
    estimated = int(min_time + ratio * (max_time - min_time))
    level = "여유" if estimated < 40 else "보통" if estimated < 60 else "혼잡" if estimated < 80 else "심각"
    return estimated, level

@app.route('/predict', methods=['GET'])
def predict():
    date = request.args.get('date')
    hour = request.args.get('hour')
    try:
        hour = int(hour)
        year, month, day = date.split('-')
        formatted_date = f"{str(month).zfill(2)}-{str(day).zfill(2)}"
        formatted_timeslot = f"{str(hour).zfill(2)}:00 ~ {str(hour).zfill(2)}:59"
        row = pred_df[(pred_df['MonthDay'] == formatted_date) & (pred_df['TimeSlot'] == formatted_timeslot)]
        if row.empty:
            raise ValueError("예측 데이터가 없습니다.")
        passenger_count = int(row.iloc[0]['Predicted_RF'])
        estimated_time, level = estimate_time(passenger_count)
        graph_rows = pred_df[pred_df['MonthDay'] == formatted_date].sort_values('TimeSlot')
        hours = graph_rows['TimeSlot'].tolist()
        counts = graph_rows['Predicted_RF'].astype(int).tolist()
        return Response(json.dumps({
            "date": date,
            "hour": hour,
            "passenger_count": passenger_count,
            "congestion_level": level,
            "estimated_time_minutes": estimated_time,
            "graph_data": {
                "hours": hours,
                "passenger_counts": counts
            }
        }, ensure_ascii=False), content_type='application/json; charset=utf-8')
    except Exception as e:
        return Response(json.dumps({"error": str(e)}, ensure_ascii=False), content_type='application/json; charset=utf-8')

# ✅ React 라우팅 지원
@app.errorhandler(404)
def not_found(e):
    return send_file(os.path.join(app.static_folder, 'index.html'))

if __name__ == '__main__':
    print("📂 Serving React from:", REACT_BUILD_DIR)
    app.run(debug=True)
