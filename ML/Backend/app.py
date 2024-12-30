import os
import requests
from flask import Flask, request, jsonify
import whisper
from fpdf import FPDF
from flask_cors import CORS
import google.generativeai as genai
import logging

# Initialize the Whisper model
model = whisper.load_model("small")

# Configure the Google Generative AI model
genai.configure(api_key="AIzaSyAbnXHMGE5DaZlpMa9i4ReriBSGgQq5cUE")
genai_model = genai.GenerativeModel('gemini-1.5-flash')

# Create the Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Enable CORS for all routes

# Setup logging
if not os.path.exists('logs'):
    os.makedirs('logs')

logging.basicConfig(
    filename='logs/app.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s'
)

metrics_logger = logging.getLogger('metrics')
metrics_handler = logging.FileHandler('logs/metrics.log')
metrics_handler.setLevel(logging.INFO)
metrics_handler.setFormatter(logging.Formatter('%(asctime)s %(message)s'))
metrics_logger.addHandler(metrics_handler)

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'wavfile' not in request.files or 'target' not in request.form:
        logging.error('No file or target text provided')
        return jsonify({'error': 'No file or target text provided'}), 400

    audio_file = request.files['wavfile']
    target_text = request.form['target']

    # Save the audio file to disk
    save_path = os.path.join('uploads', 'recording.wav')
    audio_file.save(save_path)
    logging.info('Audio file saved to %s', save_path)

    # Transcribe the audio file
    result = model.transcribe(save_path)

    # Clean up the saved audio file
    os.remove(save_path)
    logging.info('Audio file removed from %s', save_path)

    # Get the transcribed text
    transcribed_text = result["text"]
    logging.info('Transcription result: %s', transcribed_text)

    # Compare the transcribed text with the target text using Google Generative AI
    response = genai_model.generate_content(f"Here are two sentences indicated by [], Target and Prediction. Prediction is the transcribed text obtained from a child speaking the Target. You must respond with a single word 'Pass' if the Target is somewhat close to the Prediction in meaning and grammar, else 'Fail'. Target: [{target_text}] , Prediction: [{transcribed_text}] ")
    comparison_result = response.text.strip()
    logging.info('Comparison result: %s', comparison_result)

    # Log metrics
    metrics_logger.info('Target: %s, Prediction: %s, Comparison Result: %s', target_text, transcribed_text, comparison_result)

    return jsonify({'text': transcribed_text, 'comparison': comparison_result}), 200

if __name__ == '__main__':
    app.run(debug=True)
