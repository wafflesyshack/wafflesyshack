import pathlib
import sqlite3

db = pathlib.Path(__file__).parent.resolve() / "db" / "waffle.sqlite3"
sql_path=pathlib.Path(__file__).parent.resolve() / "db" / "schema.sql"

def get_db():
    if not db.exists():
        yield

    conn = sqlite3.connect(db, check_same_thread=False)
    conn.row_factory = sqlite3.Row  #
    try:
        yield conn
    finally:
        conn.close()


def setup_database():
    # データベースに接続して、ファイルがなければ新しく作る
    conn = sqlite3.connect(db)
    cursor = conn.cursor()

    # schema.sqlを開いてSQLコマンドを実行
    with open(sql_path, "r") as file:
        cursor.executescript(file.read())

    # 変更を保存して接続を閉じる
    conn.commit()
    conn.close()