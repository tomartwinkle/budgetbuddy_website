from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route('/api/what_if', methods=['POST'])
def handle_question():
    data = request.get_json()
    question = data.get('question', '')
    user_id = data.get('user_id', '')

    # Respond with a dummy message or logic
    response = f"Your question: '{question}' has been processed!"
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
