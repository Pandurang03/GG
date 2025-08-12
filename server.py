from flask import Flask, request, jsonify
from flask_cors import CORS
from mistral_template import chat_with_mistral

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

@app.route("/chat", methods=["POST"])
def chat():
    """API endpoint to handle chatbot conversations"""
    try:
        data = request.get_json()
        user_input = data.get("message", "").strip()
        location = data.get("location", "global").strip().lower()

        if not user_input:
            return jsonify({"error": "Empty message received"}), 400

        response = chat_with_mistral(user_input, location)
        return jsonify({"response": response})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
