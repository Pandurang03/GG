import ollama

# Crisis resources dictionary
CRISIS_RESOURCES = {
    "india": """
If you're in crisis or need immediate support in India:
- AASRA: 91-9820466726
- Kiran Mental Health Rehabilitation: 1800-599-0019
- iCall Helpline (TISS): 022-25521111
- National Emergency: 112
- Vandrevala Foundation: 1860-2662-345

Please remember that I'm just a chatbot and not a replacement for professional help.""",

    "global": """
If you're experiencing a crisis or having thoughts of self-harm:
- Contact your local emergency services immediately
- Crisis Text Line (Global): Text HOME to 741741
- Find local crisis resources: https://findahelpline.com

Please remember that I'm just a chatbot and not a replacement for professional help."""
}

def detect_crisis(text):
    """Detect potential crisis keywords in text"""
    crisis_keywords = [
        'suicide', 'kill myself', 'end it all', 'want to die', 'harm myself',
        'self-harm', 'end my life', 'better off dead', 'no reason to live'
    ]
    return any(keyword in text.lower() for keyword in crisis_keywords)

def chat_with_mistral(user_input, location="global"):
    """Enhanced chat function with mental health focus and crisis detection"""
    
    system_prompt = """You are a supportive and empathetic mental health chatbot. Your role is to:
- Listen actively and respond with genuine empathy
- Ask thoughtful follow-up questions when appropriate
- Avoid giving medical advice or diagnosis
- Maintain a professional but warm tone
- Encourage seeking professional help when appropriate
- Recognize signs of distress and respond with care
- Focus on validation and emotional support
- Use inclusive and non-judgmental language

Remember that your role is supportive listening, not therapy or medical advice."""

    # Combine system prompt with user input
    prompt = f"{system_prompt}\n\nUser: {user_input}\nAI:"

    # Get response from Mistral
    response = ollama.chat(model="mistral", messages=[{"role": "user", "content": prompt}])
    reply = response["message"]["content"]

    # Check for crisis indicators and append resources if needed
    if detect_crisis(user_input):
        resources = CRISIS_RESOURCES.get(location, CRISIS_RESOURCES["global"])
        reply += "\n\n" + resources

    return reply

if __name__ == "__main__":
    # Get user's location at start
    print("Welcome to Mental Health Support Chat 💭")
    print("Where are you located? (india/other): ")
    location = input().lower().strip()

    print("\nI'm here to listen and support you. Type 'exit', 'quit', 'bye', or 'goodbye' to end the chat.\n")

    while True:
        user_message = input("You: ")
        if user_message.lower() in ["exit", "quit", "bye", "goodbye"]:
            print("Chatbot: Take care! Remember, it's okay to reach out for help when you need it. 💙")
            break
        
        mistral_reply = chat_with_mistral(user_message, location)
        print(f"\nChatbot: {mistral_reply}\n")