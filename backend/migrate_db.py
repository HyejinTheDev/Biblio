import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "biblio.db")
conn = sqlite3.connect(db_path)
c = conn.cursor()

student_cols = [
    ("level", "INTEGER DEFAULT 1"),
    ("exp", "INTEGER DEFAULT 0"),
    ("streak_days", "INTEGER DEFAULT 1"),
    ("total_stars", "INTEGER DEFAULT 0"),
]

for col, col_type in student_cols:
    try:
        c.execute(f"ALTER TABLE students ADD COLUMN {col} {col_type};")
        print(f"Added {col} to students")
    except Exception as e:
        print(f"Column {col} already exists or error: {e}")

mastery_cols = [
    ("stars_earned", "INTEGER DEFAULT 0"),
    ("highest_difficulty", "VARCHAR(20) DEFAULT 'none'"),
]

for col, col_type in mastery_cols:
    try:
        c.execute(f"ALTER TABLE student_skill_masteries ADD COLUMN {col} {col_type};")
        print(f"Added {col} to student_skill_masteries")
    except Exception as e:
        print(f"Column {col} already exists or error: {e}")

conn.commit()
conn.close()
print("DATABASE MIGRATION COMPLETED SUCCESSFULLY!")
