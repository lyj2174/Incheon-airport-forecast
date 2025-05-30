import pandas as pd
import pymysql
import os
from dotenv import load_dotenv

# .env 로드
load_dotenv()

# CSV 파일 경로
csv_path = "Predicted_Hourly_RF_with_Tuning_GoldenHoliday_2025_2026.csv"

# CSV 로드 및 정제
df = pd.read_csv(csv_path)
df['date'] = pd.to_datetime(df['Year'].astype(str) + '-' + df['MonthDay'], format='%Y-%m-%d')
df['hour'] = df['TimeSlot'].str.slice(0, 2).astype(int)
df['predicted_passengers'] = df['Predicted_RF']
df_final = df[['date', 'hour', 'predicted_passengers']]

# DB 연결
conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASS"),
    db=os.getenv("DB_NAME"),
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

try:
    with conn.cursor() as cursor:
        # 테이블 초기화 또는 생성
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS predictions (
                date DATE,
                hour INT,
                predicted_passengers INT,
                PRIMARY KEY (date, hour)
            );
        """)
        cursor.execute("DELETE FROM predictions;")

        # 데이터 삽입
        for _, row in df_final.iterrows():
            cursor.execute(
                "INSERT INTO predictions (date, hour, predicted_passengers) VALUES (%s, %s, %s)",
                (row['date'].strftime('%Y-%m-%d'), int(row['hour']), int(row['predicted_passengers']))
            )
    conn.commit()
    print("✅ 데이터베이스에 성공적으로 삽입 완료!")
finally:
    conn.close()
