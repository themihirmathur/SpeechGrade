import whisper

model = whisper.load_model("tiny.en")
result = model.transcribe("English-Warren-002.wav")
print(result["text"])