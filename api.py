from flask import Flask, request, jsonify
from flask_cors import CORS 
import pyodbc
import bcrypt
import schedule
import time
import threading

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Database connection
DB_CONN_STRING = "DRIVER={SQL Server};SERVER=localhost;DATABASE=InternetProject"

def get_db_connection():
    return pyodbc.connect(DB_CONN_STRING)

# Fetch all todos
@app.route('/todos', methods=['GET'])
def get_todos():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, task, due_date, completed FROM todos")
    todos = [{"id": row[0], "task": row[1], "due_date": row[2], "completed": bool(row[3])} for row in cursor.fetchall()]
    conn.close()
    return jsonify(todos)

@app.route('/todos/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
    todo = cursor.fetchone()
    conn.close()
    
    if todo:
        return jsonify({
            "id": todo[0],  
            "task": todo[1],  
            "due_date": todo[2],
              "completed": todo[3]  
        })
    else:
        return jsonify({"error": "Todo not found"}), 404

# Add a new todo
@app.route('/todos', methods=['POST'])
def add_todo():
    data = request.json
    task = data['task']
    due_date = data.get('due_date')  # Can be null
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO todos (task, due_date) VALUES (?, ?)", (task, due_date))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo added successfully"}), 201

# Update todo status (mark as completed)
@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    data = request.json
    completed = data['completed']
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE todos SET completed = ? WHERE id = ?", (completed, todo_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo updated successfully"})

# Delete a todo
@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo deleted successfully"})

# Route for User Signup (Registration)
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']
    
    # Check if the user already exists
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Users WHERE username = ?", (username,))
    user = cursor.fetchone()

    if user:
        return jsonify({"message": "Username already exists"}), 400

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    # Insert new user
    cursor.execute("INSERT INTO Users (username, password) VALUES (?, ?)", (username, hashed_password))
    conn.commit()
    conn.close()

    return jsonify({"message": "User registered successfully!"}), 201

# Route for User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    # Check if the user exists
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Users WHERE username = ?", (username,))
    user = cursor.fetchone()
    
    if not user:
        return jsonify({"message": "Incorrect username or password!"}), 401

    # Check if the password is correct
    stored_password = user[2]  # Assuming the password is stored in the 3rd column
    if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Incorrect username or password!"}), 401

def move_todos_to_logs():
    """Move all todos to logs and clear the main table daily."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("EXEC MoveTodosToLogs")  # Calls stored procedure
        conn.commit()
        conn.close()
        print("✅ To-Dos moved to logs successfully")
    except Exception as e:
        print("❌ Error in moving todos:", e)

def delete_old_logs():
    """Delete logs older than 30 days."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("EXEC DeleteOldLogs")  # Calls stored procedure
        conn.commit()
        conn.close()
        print("🗑️ Old logs deleted successfully")
    except Exception as e:
        print("❌ Error in deleting logs:", e)

# Schedule the functions to run at midnight daily
schedule.every().day.at("00:00").do(move_todos_to_logs)
schedule.every().day.at("00:10").do(delete_old_logs)  # Deletes logs 10 minutes later

# Run scheduled jobs in a separate thread
def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(60)

scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
scheduler_thread.start()

if __name__ == '__main__':
    app.run(debug=True)
