import google.generativeai as genai
import os

genai.configure(api_key="AIzaSyAbnXHMGE5DaZlpMa9i4ReriBSGgQq5cUE")

model = genai.GenerativeModel('gemini-1.5-flash')

response = model.generate_content("Here are two sentences indicated by {}, Target and Prediction, Prediction is the transcribed text obtained from a child speaking the Target, you must respond with a single word 'Pass' if the Target is somewhat close to the Prediction in meaning and grammar, else 'Fail'. Target: {The quick brown fox jumps over the lazy dog} , Prediction: {The quick born forks jumps over the dazy bog} '")
print(response.text)